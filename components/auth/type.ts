import { ReactNode } from "react";

//auth-container
export interface IAuthContainer {
  isAbsolute?: boolean;
  children: ReactNode;
  type?: "sign-up" | "sign-in";
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
  signUp: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: "checked" | "unchecked";
  };
  documentUpload: {
    document: string;
    idType: string;
    idNumber: string;
    nameOnId: string;
  };
}