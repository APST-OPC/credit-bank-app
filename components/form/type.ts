import { FormikConfig } from "formik";
import { FC, PropsWithChildren, ReactNode } from "react";
import { ITextInput } from "./text-input/TextInput";
import { ButtonProps } from "react-native";

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
export interface IButton extends PropsWithChildren {
  children: ReactNode;
}

export type ControlledTextInputProps<T, K extends keyof T> = ITextInput & {
  name: K;
};

export type FormWithSubcomponents<T extends object> = FC<IFormProps<T>> & {
  ControlledTextInput: <K extends keyof T>(
    props: ControlledTextInputProps<T, K>
  ) => ReactNode;
  Button: (props: ButtonProps) => ReactNode;
};
