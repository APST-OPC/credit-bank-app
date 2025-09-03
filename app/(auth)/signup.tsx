import React from "react";
import ElevatedView from "@/components/auth/elevated-view/ElevatedView";
import { Form } from "@/components/common/form/Form";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";
import { signUpFormInstance } from "@/components/auth/utils";
import { Title } from "@/components/auth/styled";
import SignUpForm from "@/components/auth/sign-up-form/SignUpForm";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";

export default function SignUpScreen() {
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
}
