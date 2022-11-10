import { CommonDivProps } from "@utils/common/props";
import { FunctionComponent as FC, useLayoutEffect } from "react";
import create from "zustand";

interface ModalState {
  isOpen: boolean; //
  // Only one modal allowed
  modal: React.ReactNode;

  setOpen: (isOpen: boolean) => void;
  setModal: (modal: React.ReactNode) => void;
}

const useModalStore = create<ModalState>((set, get) => {
  return {
    isOpen: false,
    modal: <div>Empty Modal</div>,
    setOpen: (isOpen) => set({ isOpen }),
    setModal: (modal) => set({ modal }),
  };
});

interface ModalProps extends CommonDivProps {
  isOpen: boolean;
}

const Modal: FC<ModalProps> = (props) => {
  const { isOpen, children, className } = props;
  const { setOpen, setModal } = useModalStore();

  useLayoutEffect(() => {
    setOpen(!!isOpen);
    isOpen &&
      setModal(
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border shadow-md bg-white ${className}`}
        >
          {children}
        </div>
      );
  }, [isOpen, children]);

  return <></>;
};

export default Modal;

interface ModalProviderProps {
  children?: React.ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children: app }) => {
  const { isOpen, modal } = useModalStore();

  return (
    <div className="relative z-0 min-h-screen">
      {isOpen && (
        <aside className="absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-50 z-10" />
      )}
      <div className="z-0">{app}</div>
      {isOpen && (
        <aside className="absolute left-0 right-0 top-0 bottom-0 z-20">
          {modal}
        </aside>
      )}
    </div>
  );
};
