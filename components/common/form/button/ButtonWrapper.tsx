import { IButton } from "../type";
import React from "react";
import { useFormikContext } from "formik";
import { ReactNode } from "react";
import { Button as RNButton } from "react-native-paper";

const ButtonWrapper = <T extends object>(props: IButton): ReactNode => {
  const { children, submitFn, ...rest } = props;
  const { handleSubmit, validateForm } = useFormikContext<T>();

  const onSubmit = async () => {
    const errors = await validateForm();
    handleSubmit();
    if (Object.keys(errors).length === 0) {
      submitFn?.();
    }
  };

  return (
    <RNButton onPress={() => onSubmit()} {...rest}>
      {children}
    </RNButton>
  );
};

export default ButtonWrapper;
