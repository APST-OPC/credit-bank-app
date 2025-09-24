import { ActiveIndexType } from "@/store/mycard/useCardData";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from "react-native";
import { SharedValue } from "react-native-reanimated";

export interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  key: number;
}

export interface CreditCarousel {
  cards?: CreditCardProps;
  index?: number;
  scrollX?: SharedValue<number>;
}

export interface PaginationProps {
  cards: CreditCardProps[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
}

export interface ViewableItemsChangeProps {
  viewableItems: { viewableItems: ViewToken[] };
  setActiveIndex: (activeIndex: ActiveIndexType) => void;
  activeIndex: ActiveIndexType;
}

export interface CarouselProperty {
  width: number;
  paddingHorizontal?: number;
  activeIndex: number;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onViewableItemsChanged?: ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => void;
  viewableConfig?: { itemVisiblePercentThreshold: number };
}

export type OffNumber = "cn" | "cvv" | "exp";
export interface CardProperty {
  creditCard?: CreditCardProps;
}
