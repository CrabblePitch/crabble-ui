import './Ticket.scss';

import { capitalize } from '../../utils/text-utils.js';

// TODO: Clarify: if the data shape for catalog items (see explore page) and rental/utility (see the provided mock data) is the same or not

export const Ticket = ({ data, onTicketClick, showDescription = true }) => {
    const ticketData = data.configuration ? data.configuration : data;

    const handleClick = () => {
        if (onTicketClick) {
            onTicketClick(data);
        }
    };

    return (
        <div className="ticket">
            <div className="ticket-image">
                <img src={ticketData.utilityAmount.value[0].imagePath}/>
            </div>
            <div className="ticket-info">
                <p className="title" onClick={handleClick}>
                    {ticketData.utilityTitle}
                </p>
                {showDescription && (
                    <>
                        <p className="description">
                            {Number(ticketData.minRentingDurationUnits)} to{' '}
                            {Number(ticketData.maxRentingDurationUnits)} {ticketData.rentingDurationUnit}(s), $
                            {Number(ticketData.rentalFeePerUnitAmount?.value)} per{' '}
                            {ticketData.rentingDurationUnit}
                        </p>
                        <p className="description">${Number(ticketData.collateralAmount.value)} Collateral</p>
                    </>
                )}
                {data.phase && <p className="description">Phase: {capitalize(data.phase)}</p>}
            </div>
        </div>
    );
};
