import { Form } from "@/components/common/form/Form";
import React, { ReactElement } from "react";
import { profileChangeInitialValues } from "../utils";
import FormContainer from "@/components/common/form/form-container/FormContainer";
import { stringFormat } from "@/utils/helpers";
const ProfileChangeForm = (): ReactElement => {
  const placeHolderStrings = ["John Doe", "doe@gmail.com", "12313"];
  return (
    <FormContainer>
      {Object.keys(profileChangeInitialValues).map((data, index) => (
        <Form.ControlledTextInput
          key={index}
          name={data}
          label={stringFormat(data)}
          placeholder={placeHolderStrings[index]}
        />
      ))}
      <Form.Button>Save Profile</Form.Button>
    </FormContainer>
  );
};

export default ProfileChangeForm;
