import { ModalKey, ModalPropsType, modalStore } from "@/utils/modalStore";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type ModalType<T> = {
  name: ModalKey;
  props: ModalPropsType<T>;
};

export const ModalContext = createContext<null | {
  modals: ModalType<any>[];
  onOpen: <T>(modal: ModalType<T>) => void;
  onClose: (name: ModalKey) => void;
}>(null);

export const ModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [modals, setModals] = useState<ModalType<any>[]>([]);

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

  const onOpen = useCallback(<T,>({ name, props }: ModalType<T>) => {
    setModals((prev) => [...prev, { name, props }]);
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
