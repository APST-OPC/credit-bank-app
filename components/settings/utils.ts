import { IChangePassForm, IChangeProfileForm } from "./type";

export const stringFormat = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
};

export const changePasswordInitialValues: IChangePassForm = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

export const profileChangeInitialValues: IChangeProfileForm = {
  name: "",
  email: "",
  phoneNumber: "",
};
