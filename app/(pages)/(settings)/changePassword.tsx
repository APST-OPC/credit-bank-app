import ParallaxScrollView from "@/components/ParralaxView";
import React, { ReactElement } from "react";
import { changePasswordInitialValues } from "@/components/settings/utils";
import FormContainer from "@/components/common/app-form/form-container/FormContainer";
import { stringFormat } from "@/utils/helpers";
import SubmitButton from "@/components/common/submit-button/SubmitButton";
import { ControlledTextField } from "@/components/common/app-form/controlled";
import { useFormik } from "formik";
import { IChangePassForm } from "@/components/settings/type";
import Form from "@/components/common/app-form/Form";

const ChangePassForm = (): ReactElement => {
  return (
    <FormContainer>
      {Object.keys(changePasswordInitialValues).map((data, index) => (
        <ControlledTextField
          key={index}
          name={data}
          label={stringFormat(data)}
          type="password"
          placeholder="********"
        />
      ))}
      <SubmitButton>SET PASSWORD</SubmitButton>
    </FormContainer>
  );
};

const ChangePassword = (): ReactElement => {
  const formValue = useFormik<IChangePassForm>({
    initialValues: changePasswordInitialValues,
    onSubmit: (values) => console.log(values),
  });
  return (
    <ParallaxScrollView>
      <Form instance={formValue}>
        <ChangePassForm />
      </Form>
    </ParallaxScrollView>
  );
};

export default ChangePassword;
