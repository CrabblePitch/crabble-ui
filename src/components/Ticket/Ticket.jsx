import './Ticket.scss';

export const Ticket = ({ data }) => {
    console.log({ data })
    return (
        <div className="ticket">
            <div className="ticket-image">IMG</div>
            <div className="ticket-info">
                <p className="title">{data.utilityTitle}</p>
                <p className="description">
                    {Number(data.minRentingDurationUnits)} to {Number(data.maxRentingDurationUnits)} {data.rentingDurationUnit}(s), $
                    {Number(data.rentalFeePerUnitAmount.value)} per {data.rentingDurationUnit}
                </p>
                <p className="description">${Number(data.collateralAmount.value)} Collateral</p>
            </div>
        </div>
    );
};
