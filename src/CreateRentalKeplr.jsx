import { AmountMath } from "@agoric/ertp";
import { useEffect, useState } from "react";

const CreateRentalKeplr = ({ walletConnection, chainStorageWatcher }) => {
    const [utilityBrand, setUtilityBrand] = useState(undefined);
    const [collateralBrand, setCollateralBrand] = useState(undefined);
    const [rentalFeeBrand, setRentalFeeBrand] = useState(undefined);
    const [instance, setInstance] = useState(undefined);

    useEffect(() => {
        if (!chainStorageWatcher) return;

        const watch = chainStorageWatcher => {
            return chainStorageWatcher.watchLatest(
                ['data', 'published.agoricNames.brand'],
                value => {
                    console.log('VSTORAGE - Brand Update', { value });
                    [...value].forEach(element => {
                        if (element[0] === 'Collateral') setCollateralBrand(element[1]);
                        else if (element[0] === 'RentalFee') setRentalFeeBrand(element[1]);
                        else if (element[0] === 'Utility') setUtilityBrand(element[1]);
                    });

                    console.log({
                        collateralBrand,
                        utilityBrand,
                        rentalFeeBrand,
                    })
                },
                log => {
                    console.error('VSTORAGE - Issuer Error', log);
                }
            );
        };

        const stopWatching = watch(chainStorageWatcher);

        return () => stopWatching();
    });

    const buildAmount = () => {
        if (!utilityBrand || !rentalFeeBrand || !collateralBrand) return;

        const utilityAmount = AmountMath.make(utilityBrand, harden([
            {
                organization: 'Airbnb rental',
                address: 'Sesame Street n12345',
                accessKeyHash: 'bf34q7hiufb3',
            }
        ]))
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
        if (!amounts || !instance) {
            console.log('Not Initialized', {
                amounts,
                instance
            });
            return;
        }

        const {
            utilityAmount,
            collateralAmount,
            rentalFeePerUnitAmount,
        } = amounts;

        void walletConnection.makeOffer(
            {
                source: 'contract',
                instance,
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

    const registerInstance = () => {
        if (!chainStorageWatcher || !chainStorageWatcher.marshaller) {
            console.log('No marshaller', {
                chainStorageWatcher,
            });
            return;
        }

        let localInstance = chainStorageWatcher.marshaller.unserialize(harden({
            body: JSON.stringify({
                '@qclass': 'slot',
                'iface': 'Alleged: Instance',
                index: 0,
            }),
            slots: ['board00776']
        }));
        setInstance(localInstance);
        console.log('Instance', {
            instance
        })
    };

    return (
        <div className="card">
            <button className="button" onClick={registerInstance}>
                Register Instance
            </button>
            <button className="button" onClick={createRentalKeplr}>
                Create Rental With Keplr
            </button>
        </div>
    );
};

export default CreateRentalKeplr;