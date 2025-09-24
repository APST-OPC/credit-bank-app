import { Platform } from "react-native";
import React, { PropsWithChildren } from "react";
import { FormikContextType, FormikProvider } from "formik";

interface IFormInstance<Data extends object> extends PropsWithChildren {
  instance: FormikContextType<Data>;
}

const Form = <Data extends object>(props: IFormInstance<Data>) => {
  const { children, instance } = props;
  return (
    <FormikProvider value={instance}>
      {Platform.OS === "web" ? <form>{children}</form> : children}
    </FormikProvider>
  );
};

export default Form;
