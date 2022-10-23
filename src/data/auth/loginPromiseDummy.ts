import UserDummy from "@models/auth/UserDummy";

const getLoginPromiseDummy = (otp: string, userName: string) =>
  new Promise<{ data: UserDummy }>((resolve, reject) => {
    const userDummy = {
      userName,
      fullName: "홍길동",
      nickname: "호부호형의꿈",
    };

    const hasCorrectOTP = (() => {
      const correctOTP = (window as any).DB_DUMMY.otpMap[userName];
      const correct = otp === correctOTP;
      if (correct) {
        delete (window as any).DB_DUMMY.otpMap[userName];
      }
      return correct;
    })();

    console.debug(
      "otp >>> ",
      otp,
      "userName >>> ",
      userName,
      "has correct OTP >>> ",
      hasCorrectOTP
    );

    if (!hasCorrectOTP) {
      const error = new Error(`OTP not correct.`);
      reject(error);
      return;
    }

    const responseDummy = { data: { ...userDummy } };
    resolve(responseDummy);
  });

export default getLoginPromiseDummy;
