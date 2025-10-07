import type { ReactElement } from "react";
import type { IAddNewCardForm } from "@/components/mycard/type";

import React from "react";
import { useFormik, useFormikContext } from "formik";

import FormContainer from "@/components/common/app-form/form-container/FormContainer";

import { initialValues, inputRestrict } from "@/components/mycard/utils";
import { StyledLowerFormView } from "@/components/mycard/styled";
import ParallaxScrollView from "@/components/ParralaxView";
import SubmitButton from "@/components/common/SubmitButton";
import Form from "@/components/common/app-form/Form";
import { ControlledTextField } from "@/components/common/app-form/controlled";

const AddNewCardForm = () => {
  const { values, setFieldValue } = useFormikContext<IAddNewCardForm>();
  return (
    <>
      <ControlledTextField
        name="cardType"
        label="Card Type"
        value={values.cardType}
        editable={false}
      />
      <ControlledTextField
        name="cardHolderName"
        label="Card Holder Name"
        placeholder="John Doe"
      />
      <ControlledTextField
        name="cardNumber"
        label="Card Number"
        placeholder="XXXX XXXX XXXX XXXX"
        keyboardType="numeric"
        value={values.cardNumber}
        maxLength={16}
        onChangeText={(e: string) =>
          setFieldValue("cardNumber", inputRestrict(e, false))
        }
      />
      <StyledLowerFormView>
        <ControlledTextField
          width={"48.5%"}
          name="expiry"
          label="Expiry"
          placeholder="MM/YY"
          onChangeText={(e: string) =>
            setFieldValue("expiry", inputRestrict(e))
          }
        />
        <ControlledTextField
          width={"48.5%"}
          name="cvv"
          label="CVV"
          placeholder="XXX"
          maxLength={3}
        />
      </StyledLowerFormView>
      <SubmitButton mode="contained">Add Card</SubmitButton>
    </>
  );
};

const AddNewCard = (): ReactElement => {
  const formValue = useFormik<IAddNewCardForm>({
    initialValues: initialValues,
    onSubmit: (values) => console.log(values),
  });
  return (
    <ParallaxScrollView>
      <Form instance={formValue}>
        <FormContainer>
          <AddNewCardForm />
        </FormContainer>
      </Form>
    </ParallaxScrollView>
  );
};

export default AddNewCard;
