import React, { ReactElement } from "react";
import { Form } from "@/components/common/form/Form";
import AddNewCardForm from "@/components/mycard/add-new-card-form/AddNewCardForm";
import { initialValues } from "@/components/mycard/utils";
import ParallaxScrollView from "@/components/ParralaxView";
import FormContainer from "@/components/common/form/form-container/FormContainer";


const AddNewCard = (): ReactElement => {
  return (
    <ParallaxScrollView>
      <Form
        instance={{
          initialValues: initialValues,
          onSubmit: (values) => console.log(values),
        }}
      >
        <FormContainer>
          <AddNewCardForm />
        </FormContainer>
      </Form>
    </ParallaxScrollView>
  );
};

export default AddNewCard;
