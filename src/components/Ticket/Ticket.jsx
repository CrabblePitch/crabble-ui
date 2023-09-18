import './Ticket.scss';

import { capitalize } from '../../utils/text-utils.js';

// TODO: Clarify: if the data shape for catalog items (see explore page) and rental/utility (see the provided mock data) is the same or not

export const Ticket = ({ data, onTicketClick, showDescription = true }) => {
    const { configuration } = data;

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
                    {configuration.utilityTitle}
                </p>
                {showDescription && (
                    <>
                        <p className="description">
                            {Number(configuration.minRentingDurationUnits)} to{' '}
                            {Number(configuration.maxRentingDurationUnits)} {configuration.rentingDurationUnit}(s), $
                            {Number(configuration.rentalFeePerUnitAmount?.value)} per{' '}
                            {configuration.rentingDurationUnit}
                        </p>
                        <p className="description">${Number(configuration.collateralAmount.value)} Collateral</p>
                    </>
                )}
                {data.phase && <p className="description">Phase: {capitalize(data.phase)}</p>}
            </div>
        </div>
    );
};
