import LoginStepName from "@models/auth/routes/LoginStepName";
import LoginForm from "@components/auth/outlet/widgets/LoginForm";
import OTPForm from "@components/auth/outlet/widgets/OTPForm";

const LoginOutletComponents = {
  auth: <LoginForm />,
  otp: <OTPForm />,
};

export const loginStep = ["auth", "otp"] as LoginStepName[];

export default LoginOutletComponents;
