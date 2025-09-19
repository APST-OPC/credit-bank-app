import React, { ReactElement } from "react";

import { Form } from "@/components/common/form/Form";
import {
  signInPlaceholders,
  signUpFormInstance,
  signUpObj,
} from "@/components/auth/utils";
import { ElevatedView, FormView, Title } from "@/components/auth/styled";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { SignUpFormInstance } from "@/components/auth/type";
import { stringFormat } from "@/utils/helpers";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";

const SignUpForm = () => {
  const { Button, Checkbox, ControlledTextInput } = Form;
  const router = useRouter();
  const { values } = useFormikContext<SignUpFormInstance>();

  return (
    <FormView>
      {signUpObj.map((data, index) => (
        <ControlledTextInput
          key={index}
          name={data}
          label={stringFormat(data)}
          placeholder={signInPlaceholders[index]}
          type={index >= 2 ? "password" : undefined}
        />
      ))}
      <Checkbox name="termsAccepted" label="I understood the terms & policy" />
      <Button
        submitFn={() => router.navigate("/(auth)/verifyphone")}
        disabled={values.termsAccepted === false}
      >
        SIGN UP
      </Button>
    </FormView>
  );
};

const SignUpScreen = (): ReactElement => {
  return (
    <AuthContainer>
      <ElevatedView>
        <Title>Create your account</Title>
        <Form
          instance={{
            ...signUpFormInstance,
            onSubmit: (values) => console.log("sign-up", values),
          }}
        >
          <SignUpForm />
        </Form>
        <AuthDescription type="sign-up" />
      </ElevatedView>
    </AuthContainer>
  );
};

export default SignUpScreen;
