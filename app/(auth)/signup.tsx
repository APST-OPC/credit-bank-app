import React, { ReactElement } from "react";
import {
  signInPlaceholders,
  signUpInitVal,
  signUpObj,
  validationSchemaSignUp,
} from "@/components/auth/utils";
import { ElevatedView, FormView, Title } from "@/components/auth/styled";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import { useFormik, useFormikContext } from "formik";
import { ISignUpForm } from "@/components/auth/type";
import { stringFormat } from "@/utils/helpers";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";
import Form from "@/components/common/app-form/Form";
import {
  ControlledCheckbox,
  ControlledTextField,
} from "@/components/common/app-form/controlled";
import SubmitButton from "@/components/common/submit-button/SubmitButton";
import { useRouter } from "expo-router";

const SignUpForm = () => {
  const { values, setFieldValue, handleSubmit } =
    useFormikContext<ISignUpForm>();

  return (
    <FormView>
      {signUpObj.map((data, index) => (
        <ControlledTextField
          key={index}
          name={data}
          label={stringFormat(data)}
          placeholder={signInPlaceholders[index]}
          type={index >= 2 ? "password" : undefined}
        />
      ))}
      <ControlledCheckbox
        name="termsAccepted"
        status={values.termsAccepted}
        onPress={() =>
          setFieldValue(
            "termsAccepted",
            values.termsAccepted === "checked" ? "unchecked" : "checked"
          )
        }
        label="I understood the terms & policy"
      />
      <SubmitButton
        onPress={() => handleSubmit()}
        disabled={values.termsAccepted === "unchecked"}
      >
        SIGN UP
      </SubmitButton>
    </FormView>
  );
};

const SignUpScreen = (): ReactElement => {
  const router = useRouter();
  const handleSubmit = (values: ISignUpForm) => {
    console.log(values);
    router.push("/verifyphone");
  };
  const formValue = useFormik<ISignUpForm>({
    initialValues: signUpInitVal,
    validationSchema: validationSchemaSignUp,
    onSubmit: (values) => handleSubmit(values),
  });
  return (
    <AuthContainer>
      <ElevatedView>
        <Title>Create your account</Title>
        <Form instance={formValue}>
          <SignUpForm />
        </Form>
        <AuthDescription type="sign-up" />
      </ElevatedView>
    </AuthContainer>
  );
};

export default SignUpScreen;
