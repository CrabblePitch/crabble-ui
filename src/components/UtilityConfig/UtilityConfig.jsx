import './UtilityConfig.scss';

export const UtilityConfig = ({ config }) => {
    const prepareUtilityConfig = (config) => {
        const uiConfig = {
            'Collateral amount': config.collateralAmount.value,
            'Rental fee (per unit)': config.rentalFeePerUnitAmount.value,
            'Utility title': config.utilityTitle,
            'Utility description': config.utilityDescription,
            'Renting tier': config.rentingTier,
            'Renting duration unit': config.rentingDurationUnit,
            'Maximum renting duration': config.maxRentingDurationUnits,
            'Minimum renting duration': config.minRentingDurationUnits,
            'Grace period duration': config.gracePeriodDuration,
        };

        return Object.entries(uiConfig);
    };

    return (
        <ul>
            {prepareUtilityConfig(config).map(([title, value]) => (
                <li key={title}>
                    <strong>{title}:</strong> {value}
                </li>
            ))}
        </ul>
    );
};
