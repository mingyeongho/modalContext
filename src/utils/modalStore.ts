import OneModal from "@/components/Modal/OneModal/OneModal";
import TwoModal from "@/components/Modal/TwoModal/TwoModal";

export const modalStore = {
  onemodal: OneModal,
  twomodal: TwoModal,
};

export type ModalKey = keyof typeof modalStore;
export type ModalPropsType = Record<string, any>;
