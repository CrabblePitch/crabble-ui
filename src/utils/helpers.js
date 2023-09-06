import useStore from '../store/store.js';

const getBrand = (brandPetname) => {
    const { brands } = useStore.getState();
    if (!brands) return;

    return [...brands].find(([name]) => name === brandPetname).at(1);
};
harden(getBrand);

const getPurseFromSmartWallet = (requestedBrand) => {
    const { smartWalletPurses } = useStore.getState();
    return [...smartWalletPurses].find(({ brand }) => brand === requestedBrand).balance;
};
harden(getPurseFromSmartWallet);

export { getBrand, getPurseFromSmartWallet };
