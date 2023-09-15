import { create } from 'zustand';
import { AgoricChainStoragePathKind, makeAgoricChainStorageWatcher } from '@agoric/rpc';
import { isBorrowOffer, isCreateOffer } from "../utils/helpers.js";

const useStore = create((set, get) => ({
    watcher: makeAgoricChainStorageWatcher('http://localhost:26657', 'agoriclocal'),
    brands: [],
    smartWalletPurses: [],
    wallet: null,
    crabbleInstance: null,
    watchedRentals: {},
    ownedRentals: {},
    borrowedRentals: {},
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
    }
}));

const stopIfPhaseMatches = (stopWatching, phaseChecker) => {
    if (phaseChecker()) {
        console.log('stopping')
        stopWatching()
    }
};

export default useStore;
