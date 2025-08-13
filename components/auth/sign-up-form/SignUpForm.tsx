import React from "react";
import { Form } from "@/components/form/Form";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { SignUpFormInstance } from "../type";
import { View } from "react-native";

const SignUpForm = () => {
  const { Button, Checkbox, ControlledTextInput } = Form;
  const router = useRouter();
  const { values } = useFormikContext<SignUpFormInstance>();
  return (
    <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      <ControlledTextInput
        name="name"
        label="Name"
        mode="outlined"
        placeholder="ex: Jon Smith"
        autoCapitalize="words"
      />
      <ControlledTextInput
        name="email"
        label="Email"
        mode="outlined"
        placeholder="ex: jon.smith@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <ControlledTextInput
        name="password"
        label="Password"
        type="password"
        mode="outlined"
      />
      <ControlledTextInput
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        mode="outlined"
      />
      <Checkbox name="termsAccepted" label="I understood the terms & policy" />

      <Button
        mode="contained"
        submitFn={() => router.navigate("/(auth)/otpverify")}
        disabled={values.termsAccepted === false}
      >
        SIGN UP
      </Button>
    </View>
  );
};

export default SignUpForm;
