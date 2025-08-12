import React, { FC, ReactNode } from "react";
import { Formik } from "formik";
import { View } from "react-native";
import { ButtonProps } from "react-native-paper";
import { ControlledTextInputProps, IFormProps } from "./type";
import ButtonWrapper from "./button/ButtonWrapper";
import ControlledTextInputWrapper from "./controlled-input/ControlledTextInputWrapper";

type FormWithSubcomponents<T extends object> = FC<IFormProps<T>> & {
  ControlledTextInput: <K extends keyof T>(
    props: ControlledTextInputProps<T, K>
  ) => ReactNode;
  Button: (props: ButtonProps) => ReactNode;
};

const createForm = <T extends object>(): FormWithSubcomponents<T> => {
  const FormComponent: FC<IFormProps<T>> = ({ children, instance }) => {
    return (
      <Formik {...instance}>
        <View>{children}</View>
      </Formik>
    );
  };

  (FormComponent as FormWithSubcomponents<T>).ControlledTextInput =
    ControlledTextInputWrapper;
  (FormComponent as FormWithSubcomponents<T>).Button = ButtonWrapper;

  return FormComponent as FormWithSubcomponents<T>;
};

export const Form = createForm<Record<string, unknown>>();
