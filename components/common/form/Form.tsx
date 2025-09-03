import React, { FC, ReactNode } from "react";
import { Formik } from "formik";
import { View } from "react-native";
import {
  ControlledCheckboxProps,
  ControlledTextInputProps,
  IButton,
  IFormProps,
} from "./type";
import ButtonWrapper from "./button/ButtonWrapper";
import ControlledTextInputWrapper from "./controlled/ControlledTextInputWrapper";
import ControlledCheckboxWrapper from "./controlled/ControlledCheckboxWrapper";

type FormWithSubcomponents<T extends object> = FC<IFormProps<T>> & {
  ControlledTextInput: <K extends keyof T>(
    props: ControlledTextInputProps<T, K>
  ) => ReactNode;
  Button: (props: IButton) => ReactNode;
  Checkbox: <K extends keyof T>(
    props: ControlledCheckboxProps<T, K>
  ) => ReactNode;
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
    ControlledTextInputWrapper as <K extends keyof T>(
      props: ControlledTextInputProps<T, K>
    ) => ReactNode;
  (FormComponent as FormWithSubcomponents<T>).Button = ButtonWrapper as (props: IButton) => ReactNode;
  (FormComponent as FormWithSubcomponents<T>).Checkbox =
    ControlledCheckboxWrapper as <K extends keyof T>(
      props: ControlledCheckboxProps<T, K>
    ) => ReactNode;

  return FormComponent as FormWithSubcomponents<T>;
};

export const Form = createForm<Record<string, unknown>>();
