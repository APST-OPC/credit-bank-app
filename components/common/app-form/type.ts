import { ReactNode } from "react";
import { CheckboxProps, TextInputProps } from "react-native-paper";

export interface ITextInput extends TextInputProps {
  name: string;
  width?: string | number;
  isLabeled?: boolean;
  label?: string;
  type?: "password" | "text";
  iconColor?: string;
  errorFn?: boolean;
}

export interface ICheckbox extends CheckboxProps {
  name: string;
  label: string | ReactNode;
}
