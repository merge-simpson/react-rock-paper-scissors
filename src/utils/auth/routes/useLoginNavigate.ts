import PATH from "@utils/routes/PATH";
import { useNavigate } from "react-router-dom";
import { loginStep } from "./LoginOutletComponents";

const useLoginNavigate = () => {
  const navigate = useNavigate();

  return (index: number) => {
    const currentPath = location.pathname.toLocaleLowerCase();
    const destination = `${PATH.LOGIN}/${loginStep[index]}`.toLocaleLowerCase();
    currentPath !== destination && navigate(destination, { replace: true });
  };
};

export default useLoginNavigate;
