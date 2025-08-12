import TextInput from "@/components/form/text-input/TextInput";
import ParallaxScrollView from "@/components/ParralaxView";
import theme from "@/theme";
import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

const StyledView = styled(View)({
  paddingHorizontal: 16,
  paddingVertical: 20,
  gap: 15,
});

const StyledCardInfoContainer = styled(View)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 15,
});

type CardInfoArrayProps = {
  title: string;
  placeHolder: string;
  onChangeText: (e: string) => void;
  value: string;
  maxLength?: number;
};

const initialValues = {
  cardType: "Credit Card",
  cardHolderName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};
const AddNewCard = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const inputRestrict = (a: string, b: boolean = true) => {
    let c = a.replace(/[^0-9]/g, "");
    if (b !== true) return c;
    return (c = `${c.slice(0, 2)}${c.slice(2, 4) === "" ? "" : "/"}${c.slice(
      2,
      4
    )}`);
  };

  const cardInfoArray: CardInfoArrayProps[] = [
    {
      title: "Expiry",
      placeHolder: "MM/YY",
      onChangeText: (e) =>
        setFormValue({ ...formValue, expiry: inputRestrict(e) }),
      value: formValue.expiry,
    },
    {
      title: "CVV",
      placeHolder: "XXX",
      onChangeText: (e) =>
        setFormValue({ ...formValue, cvv: inputRestrict(e, false) }),
      value: formValue.cvv,
      maxLength: 3,
    },
  ];

  const cardDetailsArr = [
    {
      label: "Card Type",
      onChangeText: (e: string) => setFormValue({ ...formValue, cardType: e }),
      value: formValue.cardType,
      editable: false,
    },
    {
      label: "Card Holder Name",
      onChangeText: (e: string) =>
        setFormValue({ ...formValue, cardHolderName: e }),
      value: formValue.cardHolderName,
      placeHolder: "John Doe",
    },
    {
      label: "Card Number",
      onChangeText: (e: string) =>
        setFormValue({
          ...formValue,
          cardNumber: inputRestrict(e, false),
        }),
      value: formValue.cardNumber,
      placeHolder: "XXXX XXXX XXXX XXXX",
    },
  ];

  return (
    <ParallaxScrollView>
      <StyledView>
        {cardDetailsArr.map((data, index) => (
          <TextInput
            key={index}
            label={data.label}
            value={data.value}
            placeholder={data.placeHolder}
            placeholderTextColor={data.placeHolder && "#9A9A9A"}
            editable={data.editable}
            onChangeText={data.onChangeText}
            keyboardType={data.label === "Card Number" ? "numeric" : undefined}
            maxLength={data.label === "Card Number" ? 16 : undefined}
            inputMode={data.label === "Card Number" ? "numeric" : undefined}
          />
        ))}
        <StyledCardInfoContainer>
          {cardInfoArray.map(
            ({ title, placeHolder, onChangeText, value, maxLength }, index) => (
              <TextInput
                key={index}
                label={title}
                value={value}
                placeholder={placeHolder}
                onChangeText={onChangeText}
                maxLength={maxLength}
              />
            )
          )}
        </StyledCardInfoContainer>
        <Button
          mode="contained"
          labelStyle={{ fontSize: 17 }}
          buttonColor={theme.colors.primary}
          style={{ borderRadius: 10 }}
          onPress={() => {
            setFormValue(initialValues);
          }}
        >
          Add Card
        </Button>
      </StyledView>
    </ParallaxScrollView>
  );
};

export default AddNewCard;
