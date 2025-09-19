import { IChangePassForm, IChangeProfileForm, ILanguage } from "./type";

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

export const languageSetting: ILanguage[] = [
  {
    label: "English",
    code: "en",
  },
  {
    label: "Traditional Chinese",
    code: "zhTW",
  },
  {
    label: "Simplified Chinese",
    code: "zhCN",
  },
];
