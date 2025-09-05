import React, { ReactElement } from "react";
import { Form } from "@/components/common/form/Form";
import {
  changePasswordInitialValues,
  stringFormat,
} from "@/components/settings/utils";
import FormContainer from "@/components/common/form/form-container/FormContainer";

const ChangePassForm = (): ReactElement => {
  return (
    <FormContainer>
      {Object.keys(changePasswordInitialValues).map((data, index) => (
        <Form.ControlledTextInput
          key={index}
          name={data}
          label={stringFormat(data)}
          type="password"
          placeholder='********'
        />
      ))}
      <Form.Button>SET PASSWORD</Form.Button>
    </FormContainer>
  );
};

export default ChangePassForm;
