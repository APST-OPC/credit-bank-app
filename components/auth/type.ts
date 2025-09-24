import { ReactNode } from "react";

//auth-container
export interface IAuthContainer {
  isAbsolute?: boolean;
  children: ReactNode;
  type?: "sign-up" | "sign-in";
}

//elevated-view
export interface IElevatedView {
  children: ReactNode;
}

//sign-in-form
export interface ICredentials {
  email: string;
  password: string;
}
export interface ISignInForm {
  onSubmit: (values: ICredentials) => void;
  translate: Record<string, string>;
}

//sign-up-form
export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: "checked" | "unchecked";
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
