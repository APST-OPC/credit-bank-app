import * as Yup from "yup";
import { IDocumentScannerForm, ISignUpForm } from "./type";

const validationSchemaSignUp = Yup.object().shape({
  signUp: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
    termsAccepted: Yup.string().optional(),
  }),
  documentUpload: Yup.object().shape({
    document: Yup.string().required("Document is required"),
    idType: Yup.string().required("ID Type is required"),
    idNumber: Yup.string().required("ID Number is required"),
    nameOnId: Yup.string().required("Name on ID is required"),
  }),
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

const documentUploadInitValues: IDocumentScannerForm = {
  document: "",
  idType: "",
  idNumber: "",
  nameOnId: "",
};
const signUpInitValues: ISignUpForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: "unchecked",
};
export const signUpFormInstance = {
  initialValues: {
    signUp: signUpInitValues,
    documentUpload: documentUploadInitValues,

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

export const signInPlaceholders = [
  "ex: Jon Smith",
  "ex: jon.smith@email.com",
  "******",
  "******",
];
export const signUpObj = Object.keys(
  signUpFormInstance.initialValues.signUp
).slice(0, 4);
