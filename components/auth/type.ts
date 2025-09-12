import { ReactNode } from "react";

//auth-container
export interface IAuthContainer {
  isAbsolute?: boolean;
  children: ReactNode;
}

//auth-description
export interface IProps {
  type: "sign-up" | "sign-in";
}

//elevated-view
export interface IElevatedView {
  children: ReactNode;
}

//sign-in-form
export interface ISignInForm {
  onSubmit: (values: Record<string, unknown>) => void;
  translate: Record<string, string>;
}
//sign-up-form
export interface SignUpFormInstance {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

//verify-phone-form
export interface PhoneVerifyForm {
  countryCode: string;
  phoneNumber: string;
}
export interface IVerifierModal {
  open: boolean;
  handleFieldValue: (name: string, value: string) => void;
  handleOnClose: () => void;
}

//otp-verify-form
export interface IOtpVerify {
  otp: string;
}
