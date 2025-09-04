import React, { ReactElement } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Form } from "@/components/common/form/Form";
import AddNewCardForm from "@/components/mycard/add-new-card-form/AddNewCardForm";
import { initialValues } from "@/components/mycard/utils";
import ParallaxScrollView from "@/components/ParralaxView";

const StyledView = styled(View)({
  paddingHorizontal: 16,
  paddingVertical: 20,
  gap: 15,
});

const AddNewCard = (): ReactElement => {
  return (
    <ParallaxScrollView>
      <Form
        instance={{
          initialValues: initialValues,
          onSubmit: (values) => console.log(values),
        }}
      >
        <StyledView>
          <AddNewCardForm />
        </StyledView>
      </Form>
    </ParallaxScrollView>
  );
};

export default AddNewCard;
