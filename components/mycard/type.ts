import { CardDataProps } from "@/store/mycard/useCardData";
import { Router } from "expo-router";

export interface IAddNewCardForm {
  cardType: string;
  cardHolderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface ICardDetails {
  data: CardDataProps[];
  reroute: Router;
  key: number;
}
