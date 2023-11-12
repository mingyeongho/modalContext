import useModal from "@/hooks/useModal";

export default function Home() {
  const { onOpen } = useModal();
  return (
    <main>
      <button
        onClick={() =>
          onOpen({
            name: "onemodal",
            props: { label: "인텔리센스가 안되네;;;;" },
          })
        }
      >
        모달 1 열기
      </button>
    </main>
  );
}
