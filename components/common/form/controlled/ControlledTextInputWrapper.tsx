import { Field, useFormikContext } from "formik";
import React, { ReactNode } from "react";
import { ControlledTextInputProps } from "../type";
import TextInput from "@/components/common/form/text-input/TextInput";
import { InputGroup } from "./utils";

const ControlledTextInputWrapper = <T, K extends keyof T>(
  props: ControlledTextInputProps<T, K>
): ReactNode => {
  const { name, label, placeholder, style, ...rest } = props;
  const { handleBlur, handleChange, values, errors, touched } =
    useFormikContext<T>();
  const validator = Boolean(touched[name] && errors[name]);
  return (
    <InputGroup style={style}>
      <Field
        as={TextInput}
        nativeID={String(name)}
        name={name}
        errorFn={validator}
        label={label}
        value={values[name] as string}
        placeholder={
          validator
            ? `* ${errors[name]?.toString().toLowerCase()}`
            : placeholder
        }
        placeholderTextColor={validator ? "red" : undefined}
        onChangeText={handleChange(String(name))}
        onBlur={handleBlur(String(name))}
        {...rest}
      />
    </InputGroup>
  );
};

export default ControlledTextInputWrapper;
