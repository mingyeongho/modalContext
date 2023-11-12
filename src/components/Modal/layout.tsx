import { PropsWithChildren } from "react";
import Modal, { ModalProps } from ".";

export type ModalLayout = ModalProps & {};

const ModalLayout = ({ name, children }: PropsWithChildren<ModalLayout>) => {
  return (
    <>
      <Modal name={name}>
        <div className="container">{children}</div>
      </Modal>
      <style jsx>{`
        .container {
          padding: 48px;
          background-color: #fff;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
};

export default ModalLayout;
