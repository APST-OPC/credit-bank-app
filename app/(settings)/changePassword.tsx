import ParallaxScrollView from "@/components/ParralaxView";
import React, { ReactElement } from "react";
import { Form } from "@/components/common/form/Form";
import { changePasswordInitialValues } from "@/components/settings/utils";
import ChangePassForm from "@/components/settings/change-password-form/ChangePassForm";

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
