import { ModalKey, ModalPropsType, modalStore } from "@/utils/modalStore";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type ModalType = {
  name: ModalKey;
  props: ModalPropsType;
};

export const ModalContext = createContext<null | {
  modals: ModalType[];
  onOpen: (modal: ModalType) => void;
  onClose: (name: ModalKey) => void;
}>(null);

export const ModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [modals, setModals] = useState<ModalType[]>([]);

  // 모달 열었을 때 외부 스크롤 막기
  useEffect(() => {
    const $body = document.querySelector("body");
    const $portal = document.getElementById("portal");

    if (!$body || !$portal) {
      return;
    }

    if (modals.length > 0) {
      $body.style.overflow = "hidden";
      $portal.style.display = "block";
    }

    return () => {
      $body.style.overflow = "auto";
      $portal.style.display = "none";
    };
  }, [modals.length]);

  const onOpen = useCallback((modal: ModalType) => {
    setModals((prev) => [...prev, modal]);
  }, []);

  const onClose = useCallback((name: ModalKey) => {
    setModals((prev) => prev.filter((modal) => modal.name !== name));
  }, []);

  const value = useMemo(
    () => ({ modals, onOpen, onClose }),
    [modals, onClose, onOpen]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.map((modal) => {
        const { name, props } = modal;
        const Component = modalStore[name];

        return <Component key={name} {...props} />;
      })}
    </ModalContext.Provider>
  );
};
