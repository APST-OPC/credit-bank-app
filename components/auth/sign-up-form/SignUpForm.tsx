import React from "react";
import { Form } from "@/components/common/form/Form";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { SignUpFormInstance } from "../type";
import { View } from "react-native";
import { signUpFormInstance } from "../utils";
import { stringFormat } from "@/components/settings/utils";

const SignUpForm = () => {
  const { Button, Checkbox, ControlledTextInput } = Form;
  const router = useRouter();
  const { values } = useFormikContext<SignUpFormInstance>();
  const placeHolders = [
    "ex: Jon Smith",
    "ex: jon.smith@email.com",
    "******",
    "******",
  ];
  const signUpObj = Object.keys(signUpFormInstance.initialValues);
  return (
    <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      {signUpObj.slice(0, 4).map((data, index) => (
        <ControlledTextInput
          name={data}
          label={stringFormat(data)}
          placeholder={placeHolders[index]}
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
    </View>
  );
};

export default SignUpForm;
