import useModal from "@/hooks/useModal";
import ModalLayout from "../layout";

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
          onOpen({ name: "twomodal", props: { label: "ㅠㅠ인텔리센스ㅠㅠ" } })
        }
      >
        모달 2 열기
      </button>
    </ModalLayout>
  );
};

export default OneModal;
