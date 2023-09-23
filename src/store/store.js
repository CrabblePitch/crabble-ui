import { create } from 'zustand';
import { AgoricChainStoragePathKind, makeAgoricChainStorageWatcher } from '@agoric/rpc';
import { isBorrowOffer, isCreateOffer } from "../utils/helpers.js";
import { AmountMath } from "@agoric/ertp";

const useStore = create((set, get) => ({
    watcher: makeAgoricChainStorageWatcher('http://localhost:26657', 'agoriclocal'),
    brands: [],
    brandToKeyword: {},
    keywordToBrand: {},
    smartWalletPurses: [],
    wallet: null,
    crabbleInstance: null,
    watchedRentals: {},
    ownedRentals: {},
    borrowedRentals: {},
    notifierState: { open: false, severity: '', message: ''},
    updateBrands: (brandArray) => {
      const brandToKeyword = {};
      const keywordToBrand = {};

      [...brandArray].forEach(([keyword, brand]) => {
          brandToKeyword[brand] = keyword;
          keywordToBrand[keyword] = brand;
      });

      set(() => ({ brandToKeyword, keywordToBrand, brands: brandArray}));
    },
    registerRentals: subscriberPaths => {
        const produceWatchedRentals = state => {
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
            watchedRentals: { ...state.watchedRentals, ...produceWatchedRentals(state) }
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
    getOwnedRentals: () => {
        return [...Object.entries(get().ownedRentals)]
            .map(([id, rental]) => ({ id, ...rental }));
    },
    getBorrowedRentals: () => {
        return [...Object.entries(get().borrowedRentals)]
            .map(([id, rental]) => ({ id, ...rental }));
    },
    notifyUser: (severity, message) => {
        set( () => ({
            notifierState: { open: true, severity, message }
        }));
    },
    closeNotifier: () => {
        set( () => ({
            notifierState: { open: false, severity: '', message: ''}
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
        const { getUtilityBrands, brandToKeyword } = get();
        const utilityBrands = getUtilityBrands();

        return [...utilityBrands]
            .map(({ brand }) =>( { keyword: brandToKeyword[brand], brand}));
    },
    getKeywordFromBrand: brand => {
        const { brandToKeyword } = get();
        return brandToKeyword[brand];
    },
    getRentalBalances: () => {
        const { ownedRentals } = get();
        return [...Object.values(ownedRentals)].map(value => [...Object.entries(value.rentalBalance)]).flat()
    },
    getCollateralBalances: () => {
        const { ownedRentals } = get();
        return [...Object.values(ownedRentals)].map(value => [...Object.entries(value.collateralBalance)]).flat()
    },
}));

const stopIfPhaseMatches = (stopWatching, phaseChecker) => {
    if (phaseChecker()) {
        console.log('stopping')
        stopWatching()
    }
};

export default useStore;
