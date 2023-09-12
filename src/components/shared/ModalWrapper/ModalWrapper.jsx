import './ModalWrapper.scss';

export const ModalWrapper = ({ children, ...props }) => {
    return (
        <>
            <div className="modal-wrapper">
                <div {...props}>{children}</div>
            </div>
            <div className="modal-overlay"></div>
        </>
    );
};
