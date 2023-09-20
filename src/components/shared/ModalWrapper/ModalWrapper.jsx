import './ModalWrapper.scss';

import { useEffect } from 'react';

export const ModalWrapper = ({ children, ...props }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <div className="modal-wrapper">
                <div {...props}>{children}</div>
            </div>
            <div className="modal-overlay"></div>
        </>
    );
};
