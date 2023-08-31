import { AmountMath } from "@agoric/ertp";
import useStore from "./store/store.js";
import { getBrand, getPurseFromSmartWallet } from "./components/AddProtocolModal/helpers.js";

const CreateRentalKeplr = () => {
    const walletConnection = useStore(state => state.wallet);
    const crabbleInstance = useStore(state => state.crabbleInstance);
    const utilityBrand = getBrand('Utility');
    const collateralBrand = getBrand('Collateral');
    const rentalFeeBrand = getBrand('RentalFee');

    const buildAmount = () => {
        if (!utilityBrand || !rentalFeeBrand || !collateralBrand) return;

        const utilityPurse = getPurseFromSmartWallet(utilityBrand);
        console.log({utilityPurse})
        const utilityAmount = AmountMath.make(utilityBrand, harden([utilityPurse.value[0]]));
        const collateralAmount = AmountMath.make(collateralBrand, 100n);
        const rentalFeePerUnitAmount = AmountMath.make(rentalFeeBrand, 10n);

        return {
            utilityAmount,
            collateralAmount,
            rentalFeePerUnitAmount,
        };
    }

    const createRentalKeplr = () => {
        const amounts = buildAmount();
        console.log({
            amounts,
            crabbleInstance,
        })
        const {
            utilityAmount,
            collateralAmount,
            rentalFeePerUnitAmount,
        } = amounts;

        void walletConnection.makeOffer(
            {
                source: 'contract',
                instance: crabbleInstance,
                publicInvitationMaker: 'makeRentalInvitation'
            },
            {
                give: { Utility: utilityAmount },
            },
            {
                rentalConfig: {
                    utilityAmount,
                    collateralAmount,
                    rentalFeePerUnitAmount,
                    rentingTier: 'Ad-Hoc',
                    rentingDurationUnit: 'hour',
                    minRentingDurationUnits: 2n,
                    maxRentingDurationUnits: 20n,
                    gracePeriodDuration: 2n,
                }
            },
            ({ status, data }) => {
                if (status === 'error') {
                    console.error('Offer error', data);
                }
                if (status === 'seated') {
                    console.log('Transaction submitted:', data.txn);
                    console.log('Offer id:', data.offerId);
                }
                if (status === 'refunded') {
                    console.log('Offer refunded');
                }
                if (status === 'accepted') {
                    console.log('Offer accepted');
                }
            },
            'createRentalKeplr'
        );
    };

    return (
        <div className="card">
            <button className="button" onClick={createRentalKeplr}>
                Create Rental With Keplr
            </button>
        </div>
    );
};

export default CreateRentalKeplr;