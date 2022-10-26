import create from "zustand";

interface ToastState {
  isOpen: boolean;
  children: React.ReactNode;
  currentTimeout: NodeJS.Timeout | null;
  open: (children: React.ReactNode, duration?: number) => void;
}

const useToast = create<ToastState>((set, get) => ({
  isOpen: false,
  children: "This is test",
  currentTimeout: null,
  open: (children, duration) => {
    const state = get();
    if (!!state.currentTimeout) {
      clearTimeout(state.currentTimeout);
    }

    if (duration == null) {
      duration = 1000;
    }

    // (코드 이해를 위해 반환객체 합하지 않고 순서대로 배치함.)
    // [1] 툴팁 open, 내용(children) 배치
    set({ children, isOpen: true });

    // [2] duration 동안 내용 뛰워주기
    const currentTimeout = setTimeout(() => {
      set({ children: "", isOpen: false });
    }, duration);

    // [3] 타임아웃 객체 보존(다음 번 토스트가 오픈될 때 영향을 주지 않게 함.)
    set({ currentTimeout });
  },
  // EOF
}));

export default useToast;
