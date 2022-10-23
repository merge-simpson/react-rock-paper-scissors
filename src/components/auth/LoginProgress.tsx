import AuthInfo from "@models/auth/dto/AuthInfo";
import LoginOutletContext from "@models/auth/routes/LoginOutletContext";
import LoginOutletParams from "@models/auth/routes/LoginOutletParams";
import LoginStepName from "@models/auth/routes/LoginStepName";
import useRefEffect from "@utils/common/useRefEffect";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Outlet, useParams } from "react-router-dom";
import { loginStep } from "@utils/auth/routes/LoginOutletComponents";
import LoginButtonGroup from "./button/LoginButtonGroup";
import useLoginNavigate from "@utils/auth/routes/useLoginNavigate";
import useAuth from "@store/common/useAuth";
import ContextCallbackOption from "@models/common/api/ContextCallbackOption";
import useToast from "@store/common/useToast";

const LoginProgress = () => {
  const params = useParams() as LoginOutletParams;
  const auth = useAuth();
  const loginNavigate = useLoginNavigate();
  const toast = useToast();

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const otpRef = useRef<HTMLInputElement | null>(null);

  const { authInfo, setAuthInfo, otp, setOTP } = auth;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLastStep, setIfLastStep] = useState<boolean>(false);

  // Just mount or unmount
  useEffect(() => {
    if (!!authInfo.userName && !!userNameRef.current) {
      userNameRef.current.value = authInfo.userName;
    }
    if (!!authInfo.password && !!passwordRef.current) {
      passwordRef.current.value = authInfo.password;
    }
    userNameRef.current?.focus();
  }, [userNameRef.current]);

  // tracks if value changed
  useRefEffect(() => {
    setAuthInfo({
      userName: userNameRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
    });
  }, [userNameRef.current, passwordRef.current]);

  useRefEffect(() => {
    setOTP(otpRef.current?.value ?? "");
  }, [otpRef.current]);

  // parse params
  useLayoutEffect(() => {
    let currentStep = loginStep.indexOf(params.stepName as LoginStepName);
    if (authInfo.userName === "" && currentStep > 0) {
      toast.open("아이디를 입력하세요.");
      loginNavigate(0);
    }

    currentStep = currentStep < 0 ? 0 : currentStep;
    const isLastStep = currentStep + 1 === loginStep.length;
    setCurrentStep(currentStep);
    setIfLastStep(isLastStep);
  }, [params]);

  // on next button
  const proceedByStepName = useCallback(() => {
    const stepName = params.stepName as LoginStepName | "";
    if (!stepName) {
      return;
    }

    const next = () => {
      if (!isLastStep) {
        loginNavigate(currentStep + 1);
        return;
      }
    };

    const option: ContextCallbackOption = {
      success: next,
    };

    if (stepName === "auth") {
      auth.sendOTPRequest({
        success: (data) => {
          // 임시로 여기 띄움
          const displayOTPDummy = () =>
            toast.open(
              (window as any).DB_DUMMY.otpMap[authInfo.userName],
              5_000
            );

          displayOTPDummy();
          option.success!();
        },
      });
    } else if (stepName === "otp") {
      auth.login(option);
    }
  }, [params, authInfo.userName, currentStep, isLastStep]);

  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      <header>
        <h1 className="text-3xl font-bold">Login</h1>
      </header>
      <main className="p-8 w-full max-w-lg border shadow-md rounded-md">
        <form
          className="flex flex-col gap-8"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Outlet
            context={{ userNameRef, passwordRef, otpRef } as LoginOutletContext}
          />
          <div className="flex justify-end">
            <LoginButtonGroup
              isLast={isLastStep}
              hasCancel={currentStep > 0}
              proceed={proceedByStepName}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginProgress;
