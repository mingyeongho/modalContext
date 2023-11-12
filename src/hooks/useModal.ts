import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";

const useModal = () => {
  const modalValues = useContext(ModalContext);

  if (!modalValues) {
    throw new Error("Not Found ModalContext");
  }

  return modalValues;
};

export default useModal;
