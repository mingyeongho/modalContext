import useModal from "@/hooks/useModal";
import { ModalKey } from "@/utils/modalStore";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  name: ModalKey;
};

const Modal = ({ name, children }: PropsWithChildren<ModalProps>) => {
  const $portal =
    typeof window !== undefined && document.getElementById("portal");
  const { onClose } = useModal();

  return $portal && children
    ? createPortal(
        <>
          <div className="container" onClick={() => onClose(name)}>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </div>
          <style jsx>{`
            .container {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.6);
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}</style>
        </>,
        $portal
      )
    : null;
};

export default Modal;
