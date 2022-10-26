import getLoginPromiseDummy from "@data/auth/loginPromiseDummy";
import getOTPPromiseDummy from "@data/auth/otpPromiseDummy";
import AuthInfo from "@models/auth/dto/AuthInfo";
import UserDummy from "@models/auth/UserDummy";
import ContextCallbackOption from "@models/common/api/ContextCallbackOption";
import storageManager from "@utils/common/web/storage";
import STORAGE_KEY from "@utils/common/web/storage-key";
import create from "zustand";

interface AuthState {
  isAuthenticated: boolean;

  authInfo: AuthInfo;
  otp: string;

  setAuthInfo: (authInfo: AuthInfo) => void;
  setOTP: (otp: string) => void;

  sendOTPRequest: (option?: ContextCallbackOption) => void;
  login: (option?: ContextCallbackOption) => void;
  logout: (option?: ContextCallbackOption) => void;
}

const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: true, // No auth required for this project

  authInfo: {
    userName: "",
    password: "",
  },
  otp: "",

  setAuthInfo: (authInfo) => set({ authInfo }),
  setOTP: (otp) => set({ otp }),

  sendOTPRequest: (option) => {
    const state = get();
    const otpPromise = getOTPPromiseDummy(state.authInfo.userName);

    otpPromise
      .then(({ data }) => data)
      .then((ok) => {
        option?.success && option.success();
      });
  },

  login: (option) => {
    const state = get();
    const loginPromise = getLoginPromiseDummy(
      state.otp,
      state.authInfo.userName
    );

    loginPromise
      .then(({ data }) => data)
      .then((user: UserDummy) => {
        console.log(user);
        storageManager.setItem(STORAGE_KEY.AUTH_USER, JSON.stringify(user));
        set({ isAuthenticated: true });
        option?.success && option.success(user);
      })
      .catch(option?.onCatch ? option.onCatch : console.error);
  },

  logout: (option) => {
    // 기기/브라우저 종속적 데이터가 있다면 STICKY하게 보존하고 다른 것만 지우면 됨.
    storageManager.clearAllUnsticky();
    set({ isAuthenticated: false });
    option?.success && option.success(true);
  },

  // EOF
}));

export default useAuth;
