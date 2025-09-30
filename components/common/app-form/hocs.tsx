import { ComponentType, ReactElement } from "react";
import { Field, FormikValues, getIn, useFormikContext } from "formik";
import React from "react";

type WithInputController<Type extends object> = (props: Type) => ReactElement;

const withHocs = <Type extends FormikValues>(
  WrappedComponent: ComponentType<Type>
): WithInputController<Type> => {
  const FieldWrapper = (props: Type) => {
    const { name, placeholder, containerStyle, ...rest } = props;

    const form = useFormikContext<Type>();

    const fieldValue = form.values[name] || getIn(form.values, name);
    const validate = Boolean(form.errors[name] && form.touched[name]);
    return (
      <Field
        component={WrappedComponent}
        placeholder={validate ? form.errors[name] : placeholder}
        errorFn={validate}
        name={name}
        errorMsg={form.errors[name]}
        onChangeText={form.handleChange(name)}
        value={fieldValue}
        {...rest}
      />
    );
  };
  return FieldWrapper;
};

export default withHocs;
