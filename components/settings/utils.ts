import { IChangePassForm, IChangeProfileForm } from "./type";

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
