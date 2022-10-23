export default interface LoginOutletContext {
  userNameRef: React.MutableRefObject<HTMLInputElement | null>;
  passwordRef: React.MutableRefObject<HTMLInputElement | null>;
  otpRef: React.MutableRefObject<HTMLInputElement | null>;
}
