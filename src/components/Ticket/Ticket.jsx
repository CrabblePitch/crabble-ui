import './Ticket.scss';

export const Ticket = ({ data }) => {
    return (
        <div className="ticket">
            <div className="ticket-image">IMG</div>
            <div className="ticket-info">
                <p className="title">{data.name}</p>
                <p className="description">
                    {data.minRentingDurationUnits} to {data.maxRentingDurationUnits} {data.rentingDurationUnit}(s), $
                    {data.rentalFeeAmount} per {data.rentingDurationUnit}
                </p>
                <p className="description">${data.collateralAmount} Collateral</p>
            </div>
        </div>
    );
};
