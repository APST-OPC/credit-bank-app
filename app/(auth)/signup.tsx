import React, { ReactElement } from "react";
import {
  signInPlaceholders,
  signUpInitValues,
  signUpObj,
  signUpSchema,
} from "@/components/auth/utils";
import { Content, FormView } from "@/components/auth/styled";
import { useFormik, useFormikContext } from "formik";
import { ISignUpForm } from "@/components/auth/type";
import { stringFormat } from "@/utils/helpers";
import Form from "@/components/common/app-form/Form";
import {
  ControlledCheckbox,
  ControlledTextField,
} from "@/components/common/app-form/controlled";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import { View } from "react-native";
import ParallaxScrollView from "@/components/ParralaxView";
import DocumentScanner from "@/components/common/document-scanner/DocumentScanner";
import useStepperStore from "@/store/useStepper";
import ProgressView from "@/components/common/progress-view/ProgressView";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

const SignUpView = styled(View)({
  diplay: "flex",
  gap: 5,
  paddingHorizontal: 20,
  justfyContent: "flex-end",
});

const SignUpForm = (): ReactElement => {
  const { values, setFieldValue } = useFormikContext<ISignUpForm>();
  return (
    <SignUpView>
      <FormView>
        {signUpObj.map((data, index) => (
          <ControlledTextField
            key={index}
            name={`signUp.${data}`}
            label={stringFormat(data)}
            placeholder={signInPlaceholders[index]}
            type={index >= 2 ? "password" : undefined}
          />
        ))}
        <ControlledCheckbox
          name="signUp.termsAccepted"
          status={values.signUp.termsAccepted}
          onPress={() =>
            setFieldValue(
              "signUp.termsAccepted",
              values.signUp.termsAccepted === "checked"
                ? "unchecked"
                : "checked"
            )
          }
          label="I understood the terms & policy"
        />
      </FormView>
    </SignUpView>
  );
};

const SignUpScreen = (): ReactElement => {
  const activeStep = useStepperStore((state) => state.activeStep);
  const next = useStepperStore((state) => state.actions.nextStep);
  const reset = useStepperStore((state) => state.actions.onReset);
  const router = useRouter();

  const signUpForm = useFormik<ISignUpForm>({
    initialValues: signUpInitValues,
    validationSchema: signUpSchema,

    onSubmit: (values) => {
      console.log(values);
      next();
    },
  });
  const handleSignIn = async () => {
    router.push("/(auth)");
    setTimeout(() => reset(), 1000);
  };
  const stepperItems = [
    {
      label: "Sign Up",
      component: <SignUpForm />,
    },
    {
      label: "Upload Document",
      component: <DocumentScanner />,
    },
    {
      label: "Success",
      component: (
        <Content>
          <Ionicons name="checkmark-circle-sharp" size={200} color="green" />
          <Text variant="headlineLarge">Success!</Text>
          <Text variant="bodyLarge">
            Your account has been created successfully.
          </Text>
        </Content>
      ),
    },
  ];
  return (
    <ParallaxScrollView>
      <Form<ISignUpForm> instance={signUpForm}>
        <ProgressView
          activeStep={activeStep}
          items={stepperItems}
          handleSecond={signUpForm.handleSubmit}
          handleLast={handleSignIn}
        />
      </Form>
    </ParallaxScrollView>
  );
};

export default SignUpScreen;
