import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { ReactNode } from "react";
import { ControlledTextInputProps } from "../type";
import TextInput from "@/components/form/text-input/TextInput";
import { InputGroup } from "./utils";
import styled from "styled-components/native";
import { Text } from "react-native-web";

const ErrorText = styled(Text)({
  color: "red",
});

const ControlledTextInputWrapper = <T, K extends keyof T>(
  props: ControlledTextInputProps<T, K>
): ReactNode => {
  const { name, label, ...rest } = props;
  const { handleBlur, handleChange, values } = useFormikContext<T>();
  return (
    <InputGroup>
      <Field
        as={TextInput}
        nativeID={String(name)}
        label={label}
        value={values[name] as string}
        onChangeText={handleChange(String(name))}
        onBlur={handleBlur(String(name))}
        {...rest}
      />
      <ErrorMessage name={String(name)} component={ErrorText} />
    </InputGroup>
  );
};

export default ControlledTextInputWrapper;
