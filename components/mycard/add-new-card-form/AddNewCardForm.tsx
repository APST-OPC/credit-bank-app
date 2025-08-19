import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import { Form } from "@/components/form/Form";
import { IAddNewCardForm } from "@/components/mycard/type";
import { StyledTextInput } from "@/components/mycard/styled";
import { inputRestrict } from "@/components/mycard/utils";

const AddNewCardForm = () => {
  const { values, setFieldValue } = useFormikContext<IAddNewCardForm>();
  const { ControlledTextInput, Button } = Form;
  return (
    <>
      <ControlledTextInput
        name="cardType"
        label="Card Type"
        value={values.cardType}
        editable={false}
      />
      <ControlledTextInput
        name="cardHolderName"
        label="Card Holder Name"
        placeholder="John Doe"
      />
      <ControlledTextInput
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
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <StyledTextInput
          name="expiry"
          label="Expiry"
          placeholder="MM/YY"
          onChangeText={(e: string) =>
            setFieldValue("expiry", inputRestrict(e))
          }
        />
        <StyledTextInput name="cvv" label="CVV" placeholder="XXX" />
      </View>
      <Button mode="contained">Add Card</Button>
    </>
  );
};

export default AddNewCardForm;
