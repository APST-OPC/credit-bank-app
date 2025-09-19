import { PropsWithChildren } from "react";

export interface IChangePassForm {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IChangeProfileForm {
  name: string;
  email: string;
  phoneNumber: string;
}
export interface ISettingsModal extends PropsWithChildren {
  open: boolean;
  title: string;
}
export interface ILanguage {
  label: string;
  code: string;
}
