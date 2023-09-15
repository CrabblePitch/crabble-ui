import './Ticket.scss';

// INFO: If thw ticket component is used for both catalogs and utility rental, then the data shape should be identical.
// TODO: Clarify data shape for catalogs
export const Ticket = ({ data, onTicketClick, showDescription = true }) => {
    const handleClick = () => {
        if (onTicketClick) {
            onTicketClick(data);
        }
    };

    return (
        <div className="ticket">
            <div className="ticket-image">IMG</div>
            <div className="ticket-info">
                <p className="title" onClick={handleClick}>
                    {data.utilityTitle}
                </p>
                {showDescription && (
                    <p className="description">
                        {Number(data.minRentingDurationUnits)} to {Number(data.maxRentingDurationUnits)}{' '}
                        {data.rentingDurationUnit}(s), ${Number(data.rentalFeePerUnitAmount?.value)} per{' '}
                        {data.rentingDurationUnit}
                    </p>
                )}
                <p className="description">${Number(data.collateralAmount.value)} Collateral</p>
            </div>
        </div>
    );
};
