type SimpleModalProps = {
    show: boolean;
    title?: string;
    message: string;
    onClose: () => void;
};

export default function SimpleModal({
    show,
    title,
    message,
    onClose,
}: SimpleModalProps) {
    if (!show) return null;

    return (
        <div>
            <div className="modal show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title ?? "Aviso"}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={onClose}
                            />
                        </div>
                        <div className="modal-body">
                            <p>{message}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn button-primary"
                                onClick={onClose}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" />
        </div>
    );
}
