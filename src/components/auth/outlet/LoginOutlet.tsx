import LoginOutletParams from "@models/auth/routes/LoginOutletParams";
import LoginStepName from "@models/auth/routes/LoginStepName";
import PATH from "@utils/routes/PATH";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoginOutletComponents, {
  loginStep,
} from "@utils/auth/routes/LoginOutletComponents";

const LoginOutlet = () => {
  const params = useParams() as LoginOutletParams;
  const stepName = params.stepName as LoginStepName;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStep.includes(stepName)) {
      navigate(`${PATH.LOGIN}/${loginStep[0]}`, { replace: true });
    }
  }, [stepName]);

  return <main>{LoginOutletComponents[stepName]}</main>;
};

export default LoginOutlet;
