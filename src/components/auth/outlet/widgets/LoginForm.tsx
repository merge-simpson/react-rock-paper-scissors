import LoginOutletContext from "@models/auth/routes/LoginOutletContext";
import { useOutletContext } from "react-router-dom";

const LoginForm = () => {
  const { userNameRef, passwordRef } = useOutletContext() as LoginOutletContext;

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="grid grid-cols-4 gap-2">
        <span>ID</span>
        <input
          ref={userNameRef}
          name="username"
          onChange={() => {}}
          autoComplete="username"
          className="col-span-3 border-b border-b-gray-300 focus:border-b-dark duration-150 outline-none"
        />
      </fieldset>
      <fieldset className="grid grid-cols-4 gap-2">
        <span>PW</span>
        <input
          ref={passwordRef}
          name="password"
          type="password"
          autoComplete="current-password"
          className="col-span-3 border-b border-b-gray-300 focus:border-b-dark duration-150 outline-none"
        />
      </fieldset>
    </div>
  );
};

export default LoginForm;
