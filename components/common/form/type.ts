import { FormikConfig } from "formik";
import { FC, ReactNode } from "react";
import { ITextInput } from "./text-input/TextInput";
import { ButtonProps, CheckboxProps } from "react-native-paper";

export interface IForm<T> {
  children: ReactNode;
  instance: FormikConfig<T>;
}

export interface IController extends ITextInput {
  name: string;
}

export interface IFormProps<T> {
  children: ReactNode;
  instance: FormikConfig<T>;
}
export interface IButton extends ButtonProps {
  children: ReactNode;
  submitFn?: () => void;
}

export interface ICheckbox extends CheckboxProps {
  label: string | ReactNode;
}

export type ControlledTextInputProps<T, K extends keyof T> = ITextInput & {
  name: K;
};
export type ControlledCheckboxProps<T, K extends keyof T> = Omit<
  ICheckbox,
  "status"
> & {
  name: K;
};

export type FormWithSubcomponents<T extends object> = FC<IFormProps<T>> & {
  ControlledTextInput: <K extends keyof T>(
    props: ControlledTextInputProps<T, K>
  ) => ReactNode;
  Button: (props: ButtonProps) => ReactNode;
};
