import { OneModalProps } from "@/components/Modal/OneModal/OneModal";
import useModal from "@/hooks/useModal";

export default function Home() {
  const { onOpen } = useModal();
  return (
    <main>
      <button
        onClick={() =>
          onOpen<OneModalProps>({
            name: "onemodal",
            props: { label: "된다!!!!!" },
          })
        }
      >
        모달 1 열기
      </button>
    </main>
  );
}
