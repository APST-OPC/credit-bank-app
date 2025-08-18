export interface SignUpFormInstance {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface PhoneVerifyForm {
  countryCode: string;
  phoneNumber: string;
}
