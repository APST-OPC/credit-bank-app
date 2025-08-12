import { useFormikContext } from "formik";
import React, { ReactNode } from "react";
import { ControlledTextInputProps } from "../type";
import TextInput from "../text-input/TextInput";

const ControlledTextInputWrapper = <T, K extends keyof T>(
  props: ControlledTextInputProps<T, K>
): ReactNode => {
  const { name, label, ...rest } = props;
  const { handleBlur, handleChange, values } = useFormikContext<T>();
  return (
    <TextInput
      nativeID={String(name)}
      label={label}
      value={values[name] as string}
      onChangeText={handleChange(String(name))}
      onBlur={handleBlur(String(name))}
      {...rest}
    />
  );
};

export default ControlledTextInputWrapper;
