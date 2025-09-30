import React, { ReactElement } from "react";
import {
  signInPlaceholders,
  signUpFormInstance,
  signUpObj,
} from "@/components/auth/utils";
import { FormView } from "@/components/auth/styled";
import { useFormik, useFormikContext } from "formik";
import { ISignUpForm, ISignUpFormFields } from "@/components/auth/type";
import { stringFormat } from "@/utils/helpers";
import Form from "@/components/common/app-form/Form";
import {
  ControlledCheckbox,
  ControlledTextField,
} from "@/components/common/app-form/controlled";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import ParallaxScrollView from "@/components/ParralaxView";
import DocumentScanner from "@/components/common/document-scanner/DocumentScanner";
import useStepperStore from "@/store/useStepper";
import ProgressView from "@/components/common/progress-view/ProgressView";

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
      </FormView>
    </SignUpView>
  );
};

const SignUpScreen = (): ReactElement => {
  const activeStep = useStepperStore((state) => state.activeStep);
  const router = useRouter();
  const handleSubmit = (values: ISignUpFormFields) => {
    console.log(values);
    router.push("/verifyphone");
  };
  const formValue = useFormik<ISignUpFormFields>({
    initialValues: signUpFormInstance.initialValues,
    // validationSchema: signUpFormInstance.validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const stepperItems = [
    { label: "Sign Up", component: <SignUpForm /> },
    {
      label: "Upload Document",
      component: <DocumentScanner />,
    },
    {
      label: "Review",
      component: (
        <View>
          <Text>REVIEW INPUTS</Text>
        </View>
      ),
    },
  ];
  return (
    <ParallaxScrollView>
      <Form<ISignUpFormFields> instance={formValue}>
        <ProgressView
          activeStep={activeStep}
          items={stepperItems}
          handleLast={() => formValue.handleSubmit()}
        />
      </Form>
    </ParallaxScrollView>
  );
};

export default SignUpScreen;
