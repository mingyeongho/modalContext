import useModal from "@/hooks/useModal";
import ModalLayout from "../layout";
import { TwoModalProps } from "../TwoModal/TwoModal";

export type OneModalProps = {
  label: string;
};

const OneModal = ({ label }: OneModalProps) => {
  const { onOpen } = useModal();

  return (
    <ModalLayout name="onemodal">
      {label}
      <button
        onClick={() =>
          onOpen<TwoModalProps>({
            name: "twomodal",
            props: { label: "되냐..ㅁㄴㅇㅁㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ?" },
          })
        }
      >
        모달 2 열기
      </button>
    </ModalLayout>
  );
};

export default OneModal;
