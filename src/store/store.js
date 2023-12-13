/* eslint-disable */
import { create } from 'zustand';
import { AgoricChainStoragePathKind, makeAgoricChainStorageWatcher } from '@agoric/rpc';
import { isBorrowOffer, isCreateOffer } from "../utils/helpers.js";
import { RentalPhase } from "../utils/constants.js";

const useStore = create((set, get) => ({
    watcher: null,
    brands: [],
    boardAuxChildren: [],
    crabbleOffers: [],
    catalog: {},
    brandToKeyword: {},
    keywordToBrand: {},
    brandToDisplayInfo: {},
    smartWalletPurses: [],
    vbankPurses: [],
    wallet: null,
    crabbleInstance: null,
    watchedRentals: {},
    ownedRentals: {},
    borrowedRentals: {},
    notifierState: { open: false, severity: '', message: '' },
    setWatcher: (rpcAddr, chainId) => {
        const watcher = makeAgoricChainStorageWatcher(rpcAddr, chainId);
        set(() => ({ watcher }));
    },
    updateBrands: (brandArray) => {
        const brandToKeyword = {};
        const keywordToBrand = {};

        [...brandArray].forEach(([keyword, brand]) => {
            brandToKeyword[brand] = keyword;
            keywordToBrand[keyword] = brand;
        });

        set(() => ({ brandToKeyword, keywordToBrand, brands: brandArray }));
    },
    updateVBank: vbankPurses => {
        if (!vbankPurses) return;
        const brandToDisplayInfo = {};
        [...vbankPurses].forEach(({ brand, displayInfo }) => brandToDisplayInfo[brand] = displayInfo);

        set(() => ({ vbankPurses }));
    },
    updateBrandToDisplayInfo: async boardAuxChildren => {
        const { watcher, keywordToBrand } = get();
        const brandToDisplayInfo = {};
        try {
            const queries = [...boardAuxChildren].map(id => watcher.queryOnce([
                AgoricChainStoragePathKind.Data,
                `published.boardAux.${id}`,
            ]));
            const results = await Promise.all(queries);
            [...results].forEach(({ allegedName, displayInfo }) => {
                const brand = keywordToBrand[allegedName];
                brandToDisplayInfo[brand] = displayInfo;
            });
            console.log('Results', { results });
            set(() => ({ brandToDisplayInfo }))
        } catch (e) {
            console.log('Error fetching boardAux', e);
        }
    },
    registerRentals: paths => {
        const produceWatchedRentals = state => {
            const newWatchedRentals = {};
            // We filter out the paths we already registered along with the special 'governance' path
            [...paths].filter(path => path !== 'governance' && !state.watchedRentals.hasOwnProperty(path))
                .forEach(path => {
                    const stopWatching = state.watcher.watchLatest(
                        [AgoricChainStoragePathKind.Data, `published.crabble.rentals.${path}`],
                        rental => state.updateRental(rental, path),
                        error => {
                            console.error(`Error when fetching ${path}: `, error);
                        }
                    );
                    newWatchedRentals[path] = stopWatching;
                    console.log('PATHS', path);
                    console.log('Stop', stopWatching);
                });
            console.log('NEW_WATCHED_RENTALS', { newWatchedRentals })
            return newWatchedRentals;
        };

        set(state => ({ watchedRentals: { ...state.watchedRentals, ...produceWatchedRentals(state) } }));
    },
    /**
     * Stop watching if removed
     * Update catalog for other cases
     * Update owned rentals if rental is owned
     * Update borrowed rentals if rental is borrowed
     */
    updateRental: (rental, path) => {
        const { watchedRentals } = get();
        stopIfPhaseMatches(watchedRentals[path], () => rental.phase === 'removed');
        console.log('Watched Rentals', watchedRentals);
        set(state => ({ catalog: { ...state.catalog, [path]: rental } }));
    },
    registerRentalsLeg: subscriberPaths => {
        const produceWatchedRentalsLeg = state => {
            let newWatchedRentals = {};
            [...subscriberPaths].filter(
                ([id]) => !state.watchedRentals.hasOwnProperty(id)
                    && (isCreateOffer(id) || isBorrowOffer(id))
            )
                .forEach(([id, { rental }]) => {
                    const updateFunction = isCreateOffer(id) ?
                        state.updateOwnedRentals : state.updateBorrowedRentals;

                    const stopWatching = state.watcher.watchLatest(
                        [AgoricChainStoragePathKind.Data, rental],
                        rental => updateFunction(id, rental),
                        error => console.log('ERROR', { id, error })
                    );
                    newWatchedRentals[id] = stopWatching;
                });

            return newWatchedRentals;
        }

        set(state => ({
            watchedRentals: { ...state.watchedRentals, ...produceWatchedRentalsLeg(state) }
        }));
    },
    updateOwnedRentals: (id, rental) => {
        stopIfPhaseMatches(get().watchedRentals[id],
            () => rental.phase === 'removed');
        set(state => ({
            ownedRentals: { ...state.ownedRentals, [id]: rental }
        }))
    },
    updateBorrowedRentals: (id, rental) => {
        stopIfPhaseMatches(get().watchedRentals[id],
            () => rental.phase === 'available' || rental.phase === 'liquidation');
        set(state => ({
            borrowedRentals: { ...state.borrowedRentals, [id]: rental }
        }));
    },
    updateSmartWallet: smartWalletData => {
        const { crabbleInstance } = get();
        console.log('Crabble Instance', crabbleInstance);
        const { purses, offerToUsedInvitation, offerToPublicSubscriberPaths } = smartWalletData;
        const pathEntries = Object.fromEntries(offerToPublicSubscriberPaths);

        const crabbleOffers = [...offerToUsedInvitation].filter(([,invitation]) => {
           const { value: [{
               instance
           }]} = invitation;

           return instance === crabbleInstance;
        }).map(([id]) => {
            return [pathEntries[id].rental, { id, type: isCreateOffer(id) ? 'owned' : (isBorrowOffer(id) ? 'borrowed' : 'error') }]
        });

        console.log('Crabble Offers', { crabbleOffers });
        set(() => ({ crabbleOffers, smartWalletPurses: purses }));
    },
    getCatalog: () => {
        const { catalog } = get();
        return [...Object.entries(catalog)].map(([_, rental]) => rental);
    },
    getOwnedRentals: () => {
        const { crabbleOffers, catalog } = get();
        return getUserRentalByType(crabbleOffers, catalog, 'owned');
    },
    getBorrowedRentals: () => {
        const { crabbleOffers, catalog } = get();
        return getUserRentalByType(crabbleOffers, catalog, 'borrowed');
    },
    getActiveBorrows: () => {
        const { crabbleOffers, catalog } = get();
        return getUserRentalByType(crabbleOffers, catalog, 'borrowed')
            .filter(({ phase }) => phase === RentalPhase.RENTED || phase === RentalPhase.GRACE_PERIOD);
    },
    notifyUser: (severity, message) => {
        set(() => ({
            notifierState: { open: true, severity, message }
        }));
    },
    closeNotifier: () => {
        set(() => ({
            notifierState: { open: false, severity: '', message: '' }
        }));
    },
    getUtilityBrands: () => {
        const { smartWalletPurses } = get();
        return [...smartWalletPurses].filter(({ balance, brand }) => {
            if (balance.value.length <= 0) {
                return false;
            }
            const value = balance.value[0];
            return value && typeof value !== 'bigint';
        });
    },
    getDisplayableUtilityBrands: () => {
        const { vbankPurses } = get();

        return [...vbankPurses]
            .filter(({
                         displayInfo,
                         brandPetname
                     }) => displayInfo.assetKind === 'set' && brandPetname !== 'Invitation');
    },
    getKeywordFromBrand: brand => {
        const { brandToKeyword } = get();
        return brandToKeyword[brand];
    },
    getRentalBalances: () => {
        const { getOwnedRentals } = get();
        const ownedRentals = getOwnedRentals();
        return [...Object.values(ownedRentals)].map(value => [...Object.entries(value.rentalBalance)]).flat()
    },
    getCollateralBalances: () => {
        const { getOwnedRentals } = get();
        const ownedRentals = getOwnedRentals();
        return [...Object.values(ownedRentals)].map(value => [...Object.entries(value.collateralBalance)]).flat()
    },
    getDisplayInfo: brand => {
        const { brandToDisplayInfo } = get();
        return brandToDisplayInfo[brand];
    },
    getFungibleBrands: () => {
        const { vbankPurses } = get();
        if (!vbankPurses) return [];
        return vbankPurses.filter(({ displayInfo }) => displayInfo.assetKind === 'nat');
    }
}));

const stopIfPhaseMatches = (stopWatching, phaseChecker) => {
    if (phaseChecker()) {
        console.log('stopping')
        stopWatching()
    }
};

const getUserRentalByType = (crabbleOffers, catalog, wantedType) => {
    return [...crabbleOffers]
        .filter(([path, { type }]) => type === wantedType && catalog[path.split('.').pop()])
        .map(([path, { id }]) => ({ id, ...catalog[path.split('.').pop()] }));
};

export default useStore;
