import { useCallback, useState } from "react";
import SimpleModal from "../components/SimpleModal";

type OnClose = (() => void) | null;

export function useModal() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [onCloseRef, setOnCloseRef] = useState<OnClose>(null);

    const openModal = useCallback(
        (t: string, m: string, onClose: OnClose = null) => {
            setTitle(t);
            setMessage(m);
            setOnCloseRef(() => onClose);
            setOpen(true);
        },
        []
    );

    const closeModal = useCallback(() => {
        setOpen(false);
        const cb = onCloseRef;
        setOnCloseRef(null);
        if (cb) cb();
    }, [onCloseRef]);

    const Modal = useCallback(() => {
        return (
            <SimpleModal
                show={open}
                title={title}
                message={message}
                onClose={closeModal}
            />
        );
    }, [open, title, message, closeModal]);

    return { openModal, closeModal, Modal } as const;
}
