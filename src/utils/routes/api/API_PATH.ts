import APIMethod from "../../../models/common/api/APIMethod";

// This is just an example
const API_PATH = {
  OTP_REQ: "/auth/otp",
  LOGIN: "/auth/login",
};

const API_METHOD: { [key in APIAlias]: APIMethod } = {
  OTP_REQ: "GET",
  LOGIN: "POST",
};

export type APIAlias = keyof typeof API_PATH;

export { API_METHOD };

export default API_PATH;
