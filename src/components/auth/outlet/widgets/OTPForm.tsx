import LoginOutletContext from "@models/auth/routes/LoginOutletContext";
import useRefEffect from "@utils/common/useRefEffect";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const OTPForm = () => {
  const { otpRef } = useOutletContext<LoginOutletContext>();

  useEffect(() => {
    otpRef.current?.focus();
  }, [otpRef.current]);

  useRefEffect(() => {}, [otpRef.current]);

  return (
    <div className="flex flex-col gap-4">
      <span>Input OTP in 3 min.</span>
      <fieldset className="grid grid-cols-4">
        <span>OTP</span>
        <input
          name="otp"
          ref={otpRef}
          onChange={(event) => {
            if (!otpRef.current) {
              return;
            }

            otpRef.current.value = event.target.value.replaceAll(/[^0-9]/g, "");
          }}
          autoComplete="off"
          maxLength={6}
          className="col-span-3 border-b border-b-gray-300 focus:border-b-dark duration-150 outline-none"
        />
      </fieldset>
    </div>
  );
};

export default OTPForm;
