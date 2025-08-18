import * as Yup from "yup";

export const validationSchemaSignUp = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  termsAccepted: Yup.boolean().notRequired(),
});
export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export const socialBtn = [
  require("@/assets/images/google.png"),
  require("@/assets/images/fb.png"),
  require("@/assets/images/twitter.png"),
];

export const signUpFormInstance = {
  initialValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  },
  validationSchema: validationSchemaSignUp,
};

export const signInFormInstance = {
  initialValues: { email: "", password: "" },
  validationSchema: validationSchemaSignIn,
};

export const countryCodes = [
  { label: "Philippines (+63)", value: "+63" },
  { label: "United States (+1)", value: "+1" },
  { label: "United Kingdom (+44)", value: "+44" },
  { label: "Australia (+61)", value: "+61" },
  { label: "China (+86)", value: "+86" },
];

