import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
  ViewToken,
} from "react-native";
import CreditCard from "./CreditCard";
import styled from "styled-components/native";
import { useCardData } from "@/store/mycard/useCardData";
import { creditCardArray } from "@/data/mycard";
import { CarouselProperty } from "./types";
import { CARD_WIDTH, viewableConfig } from "./utils";
import React from "react";

const CarouselPagination = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

export default function CreditCardList() {
  const { activeIndex, setActiveIndex } = useCardData();

  const windowDimensions = Dimensions.get("window");
  const screenDimensions = Dimensions.get("screen");

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(
      contentOffsetX / (CARD_WIDTH(windowDimensions.width) - 20)
    );
    setActiveIndex({ ...activeIndex, web: newIndex });
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0]) {
      setActiveIndex({
        ...activeIndex,
        mobile: parseInt(viewableItems[0].index?.toString() || "0"),
      });
    }
  };

  const properties = {
    web: {
      width: CARD_WIDTH(windowDimensions.width),
      activeIndex: activeIndex.web,
      onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => handleScroll(e),
    },
    mobile: {
      width: dimensions.screen.width,
      paddingHorizontal: 15,
      activeIndex: activeIndex.mobile,
      onViewableItemsChanged: onViewableItemsChanged,
      viewableConfig: viewableConfig,
    },
  };

  const renderCarousel = (props: CarouselProperty) => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={creditCardArray}
          renderItem={({ item }) => (
            <View
              style={{
                width: props.width,
                padding: 15,
                paddingHorizontal: props.paddingHorizontal,
              }}
            >
              <CreditCard creditCard={item} />
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={props?.onScroll}
          onViewableItemsChanged={props.onViewableItemsChanged}
          viewabilityConfig={props.viewableConfig}
        />
        <CarouselPagination>
          {creditCardArray.map((_, index) => (
            <PaginationDot key={index} active={index === props.activeIndex} />
          ))}
        </CarouselPagination>
      </View>
    );
  };

  const PaginationDot = ({ active }: { active: boolean }) => {
    const Dot = styled(View)({
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
      backgroundColor: active ? "#2196F3" : "#BDBDBD",
      width: active ? 20 : 8,
    });
    return <Dot />;
  };

  return Platform.OS === "web"
    ? renderCarousel(properties.web)
    : renderCarousel(properties.mobile);
}
