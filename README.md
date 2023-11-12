# Context api 사용해서 모달 구현

### Goals

1. 외부 라이브러리를 사용하지 않는다.
2. 모달은 다른 모달을 부를 수 있어야 한다. (모달 내에서 모달 오픈 가능)
3. 사용하기 쉬워야 한다.

### 설명

- '/components/Modal/index.tsx'

  - portal의 자식으로 모달을 띄우는 컴포넌트
  - 외부 클릭 시 close 가능
  - props로 모달의 key를 받음 (외부 클릭 시 닫힐 모달을 선택하기 위해)

- '/components/Modal/layout.tsx'

  - 흰 배경

- '/context/ModalContext'
  - Context와 Provider 선언
  - Context
    - 타입 정의
  - Provider
    - 사용할 modals변수와 onOpen, onClose 함수 선언
    - 외부 스크롤 막기 (useEffect)
    - ModalContext.Provider 사용
- '/utils/modalStore.ts'

  - 모달들을 모아놓는 변수
  - ⭐️ 이 곳에 모달의 key와 컴포넌트를 넣어놔야 'ModalKey' 값으로 사용할 수 있음. (ModalKey값은 오버레이 클릭 시 어떤 모달이 닫힐 것인지 또는 open 할 때 어떤 모달을 열 것인지 인텔리센스로 알려줌)

- '/hooks/useModal.ts'
  - useContext를 사용해서 context를 가져옴
  - context가 없다면 에러 노출
  - 실제 모달에서 사용할 때 useModal을 사용하여 다른 모달을 열거나 닫을 수 있다. (예시는 '/pages/index.tsx' 또는 '/components/Modal/OneModal/OneModal.tsx' 참고)

### 사용방법

1. '/components/Modal' 폴더에 사용할 모달을 만든다. (modalKey값은 고유해야함.)
   - ```
     <ModalLayout name="modalKey">
         어쩌구 저쩌구
       </ModalLayout>
     ```
2. '/utils/modalStore.ts'에 있는 modalStore에 modalKey: Component 방식으로 추가한다.

   - ```
       export const modalStore = {
            onemodal: OneModal,
            twomodal: TwoModal,
       };
     ```

3. 해당 모달을 여는 곳에서 useModal을 사용하여 부른다. (onOpen({name: modalKey, props: Record<string, any>}))

   - ```
        const OneModal = ({ label }: OneModalProps) => {
            const { onOpen } = useModal();

            return (
                <ModalLayout name="onemodal">
                    {label}
                    <button
                        onClick={() =>
                            onOpen({ name: "twomodal", props: { label: "ㅠㅠ인텔리센스ㅠㅠ" } })
                        } >
                        모달 2 열기
                    </button>
                </ModalLayout>
            );
        };
     ```

### 개선한 점

1. 모달을 만드는데 많은 코드를 작성할 필요가 없다.

   - 기존에 모달을 만들기 위해 showModal, visiable 등 컨텍스트에서 추가해야 하는 코드가 많았는데 이제는 modalStore에 추가만 하면 사용 가능

### 문제점

- ModalContext에서 모달에 props를 전달해줄 때 Record<string, any> 타입으로 전달해주니 인텔리센스가 props에 뜨지않음.
- ModalContext.tsx 65번째 줄에 각 컴포넌트에 필요한 props가 적용되지 않았다는 에러 발생

=> 문제점들 해결했습니다!!

- 모달 컨텍스트의 onOpen에 제네릭을 붙여서 onOpen을 사용할 때 `onOpen<Type>({name: '', props: {asdasd: asdasd}})` 이런식으로 사용하여 해결했습니다.
- modals를 선언할 때 any 타입을 주는게 좀 걸리지만 원했던 기능은 "인텔리센스에 원하는 타입이 뜨면 좋겠다"라는 것이었어서 목적은 달성한거 같습니다.
