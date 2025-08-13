import { ErrorMessage, useFormikContext } from "formik";
import React, { ReactNode } from "react";
import { ControlledCheckboxProps } from "../type";
import { InputGroup } from "./utils";
import styled from "styled-components/native";
import { Text } from "react-native-web";
import Checkbox from "@/components/form/checkbox/Checkbox";

const ErrorText = styled(Text)({
  color: "red",
});

const ControlledCheckboxWrapper = <T, K extends keyof T>(
  props: ControlledCheckboxProps<T, K>
): ReactNode => {
  const { name, label, ...rest } = props;
  const { values, setFieldValue } = useFormikContext<T>();
  return (
    <InputGroup>
      <Checkbox
        label={label}
        status={values[name] ? "checked" : "unchecked"}
        onPress={() => setFieldValue(String(name), !values[name])}
        {...rest}
      />
      <ErrorMessage name={String(name)} component={ErrorText} />
    </InputGroup>
  );
};

export default ControlledCheckboxWrapper;
