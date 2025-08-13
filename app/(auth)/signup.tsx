import React from "react";
import ElevatedView from "@/components/auth/elevated-view/ElevatedView";
import { Form } from "@/components/form/Form";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";
import { signUpFormInstance } from "@/components/auth/utils";
import { BackgroundImage, Container, Title } from "@/components/auth/styled";
import SignUpForm from "@/components/auth/sign-up-form/SignUpForm";

export default function SignUpScreen() {
  return (
    <Container>
      <BackgroundImage
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
      />

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
    </Container>
  );
}
