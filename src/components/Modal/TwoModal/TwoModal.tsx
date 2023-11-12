import ModalLayout from "../layout";

export type TwoModalProps = {
  label: string;
};

const TwoModal = ({ label }: TwoModalProps) => {
  return (
    <ModalLayout name="twomodal">
      {label}
      <span>Hello world!</span>
    </ModalLayout>
  );
};

export default TwoModal;
