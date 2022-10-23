import MainButton, { LightButton } from "@styles/button";
import { loginStep } from "@utils/auth/routes/LoginOutletComponents";
import PATH from "@utils/routes/PATH";
import React, { FunctionComponent as FC } from "react";
import { useNavigate } from "react-router-dom";
import ProceedButtonContent from "./widgets/ProceedButtonContent";

export type ProceedState = "NEXT" | "LOGIN";

export interface LoginButtonGroupProps {
  hasCancel?: boolean;
  isLast?: boolean;
  proceed: React.MouseEventHandler<HTMLButtonElement>;
}

const LoginButtonGroup: FC<LoginButtonGroupProps> = (props) => {
  const navigate = useNavigate();

  const { isLast = false, hasCancel = false, proceed } = props;

  return (
    <div className="flex gap-4 p-4">
      {hasCancel && (
        <LightButton
          onClick={(event) => {
            const url = `${PATH.LOGIN}/${loginStep[0]}`;
            navigate(url, { replace: true });
          }}
        >
          Cancel
        </LightButton>
      )}
      <MainButton
        type="submit"
        className="flex gap-2 w-20 justify-center"
        onClick={proceed}
      >
        <ProceedButtonContent state={isLast ? "LOGIN" : "NEXT"} />
      </MainButton>
    </div>
  );
};

export default LoginButtonGroup;
