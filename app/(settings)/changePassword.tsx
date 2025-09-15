import ParallaxScrollView from "@/components/ParralaxView";
import React, { ReactElement } from "react";
import { Form } from "@/components/common/form/Form";
import { changePasswordInitialValues } from "@/components/settings/utils";
import FormContainer from "@/components/common/form/form-container/FormContainer";
import { stringFormat } from "@/utils/helpers";

const ChangePassForm = (): ReactElement => {
  return (
    <FormContainer>
      {Object.keys(changePasswordInitialValues).map((data, index) => (
        <Form.ControlledTextInput
          key={index}
          name={data}
          label={stringFormat(data)}
          type="password"
          placeholder="********"
        />
      ))}
      <Form.Button>SET PASSWORD</Form.Button>
    </FormContainer>
  );
};

const ChangePassword = (): ReactElement => {
  return (
    <ParallaxScrollView>
      <Form
        instance={{
          initialValues: { ...changePasswordInitialValues },
          onSubmit: (values) => console.log(values),
        }}
      >
        <ChangePassForm />
      </Form>
    </ParallaxScrollView>
  );
};

export default ChangePassword;
