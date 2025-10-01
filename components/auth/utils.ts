import * as Yup from "yup";
import { ISignUpForm } from "./type";

export const signUpSchema = Yup.object().shape({
  signUp: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
    termsAccepted: Yup.string().oneOf(["checked"], "You must accept the terms"),
  }),
  documentUpload: Yup.object().shape({
    document: Yup.string().required("Document is required"),
    idType: Yup.string()
      .notOneOf(["ID Type"], "Please select a valid ID Type")
      .required("ID Type is required"),
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

export const signUpInitValues: ISignUpForm = {
  signUp: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "unchecked",
  },
  documentUpload: {
    document: "",
    idType: "ID Type",
    idNumber: "",
    nameOnId: "",
  },
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
export const signUpObj = Object.keys(signUpInitValues.signUp).slice(0, 4);

export const idTypes = [
  { item: "Postal", description: "Postal ID (issued 2015 onwards)" },
  { item: "Passport", description: "Philippine passport" },
  { item: "National", description: "National issued ID" },
  { item: "UMID", description: "SSS UMID or GSIS UMID" },
  { item: "Drivers License", description: "Land Transportation Office ID" },
  { item: "TIN", description: "Tax Identification Number" },
  { item: "Voter's ID", description: "Voter's ID issued by the (COMELEC)" },
];
