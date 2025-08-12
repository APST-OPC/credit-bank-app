import React from "react";
import styled from "styled-components/native";
import { Button, Text, Checkbox } from "react-native-paper";
import { Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

import { useAppTheme } from "@/hooks/useTheme";
import TextInput from "@/components/form/text-input/TextInput";
import ElevatedView from "@/components/auth/elevated-view/ElevatedView";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .test(
      "name",
      "Name is required",
      (value) => value === undefined || value.trim() !== ""
    )
    .nullable(),
  email: Yup.string()
    .email("Invalid email")
    .test(
      "email",
      "Email is required",
      (value) => value === undefined || value.trim() !== ""
    )
    .nullable(),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .test(
      "password",
      "Password is required",
      (value) => value === undefined || value.trim() !== ""
    )
    .nullable(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .test(
      "confirmPassword",
      "Confirm your password",
      (value) => value === undefined || value.trim() !== ""
    )
    .nullable(),
  termsAccepted: Yup.boolean().oneOf([true], "Accept terms and conditions"),
});

export default function SignUpScreen() {
  const router = useRouter();
  const theme = useAppTheme();

  const areAllFieldsFilled = (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted?: boolean;
  }) => {
    return (
      values.name !== "" &&
      values.email !== "" &&
      values.password !== "" &&
      values.confirmPassword !== ""
    );
  };

  return (
    <Container>
      <BackgroundImage
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        <ElevatedView>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              termsAccepted: false,
            }}
            validationSchema={validationSchema}
            onSubmit={() => {
              router.push("/(auth)/verifyphone");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <Title>Create your account</Title>
                <TextInput
                  label="Name"
                  mode="outlined"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  placeholder="ex: Jon Smith"
                  autoCapitalize="words"
                  error={touched.name && errors.name ? true : false}
                />
                {touched.name && errors.name && (
                  <ErrorText>{errors.name}</ErrorText>
                )}
                <TextInput
                  label="Email"
                  mode="outlined"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="ex: jon.smith@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email && errors.email ? true : false}
                />
                {touched.email && errors.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}
                <TextInput
                  label="Password"
                  type="password"
                  mode="outlined"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? true
                      : false
                  }
                />
                {touched.password && errors.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
                <TextInput
                  label="Confirm Password"
                  type="password"
                  mode="outlined"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? true
                      : false
                  }
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <ErrorText>{errors.confirmPassword}</ErrorText>
                )}
                <TermsContainer>
                  <Checkbox.Android
                    status={values.termsAccepted ? "checked" : "unchecked"}
                    onPress={() =>
                      setFieldValue("termsAccepted", !values.termsAccepted)
                    }
                    color="#006d77"
                    disabled={!areAllFieldsFilled(values)}
                  />
                  <TermsText
                    style={{ opacity: areAllFieldsFilled(values) ? 1 : 0.5 }}
                  >
                    I understood the <TermsLink>terms & policy</TermsLink>
                  </TermsText>
                </TermsContainer>
                {touched.termsAccepted && errors.termsAccepted && (
                  <ErrorText>{errors.termsAccepted}</ErrorText>
                )}

                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  buttonColor={theme.colors.primary}
                  style={{ borderRadius: 10 }}
                >
                  SIGN UP
                </Button>

                <OrText>or sign up with</OrText>

                <SocialButtons>
                  <SocialButton onPress={() => {}}>
                    <SocialIcon
                      source={require("@/assets/images/google.png")}
                      resizeMode="contain"
                    />
                  </SocialButton>
                  <SocialButton onPress={() => {}}>
                    <SocialIcon
                      source={require("@/assets/images/fb.png")}
                      resizeMode="contain"
                    />
                  </SocialButton>
                  <SocialButton onPress={() => {}}>
                    <SocialIcon
                      source={require("@/assets/images/twitter.png")}
                      resizeMode="contain"
                    />
                  </SocialButton>
                </SocialButtons>

                <SignInContainer>
                  <SignInText>Have an account? </SignInText>
                  <SignInButton
                    mode="text"
                    onPress={() => router.push("/(auth)")}
                  >
                    SIGN IN
                  </SignInButton>
                </SignInContainer>
              </>
            )}
          </Formik>{" "}
        </ElevatedView>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  max-width: 480px;
  align-self: center;
`;

const BackgroundImage = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const TermsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const TermsText = styled(Text)`
  color: #666;
  font-size: 14px;
`;

const TermsLink = styled(Text)`
  color: #006d77;
  text-decoration: underline;
`;

const ErrorText = styled(Text)`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

const OrText = styled(Text)`
  text-align: center;
  margin-vertical: 15px;
  color: #666;
`;

const SocialButtons = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const SocialButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const SocialIcon = styled(Image)`
  width: 30px;
  height: 30px;
`;

const SignInContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SignInText = styled(Text)`
  color: #666;
`;

const SignInButton = styled(Button)`
  margin: 0;
  padding: 0;
  color: #006d77;
  font-weight: bold;
`;
