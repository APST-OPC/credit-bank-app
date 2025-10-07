import theme from "@/theme";
import { useRouter, RelativePathString } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, Pressable, Image } from "react-native";
import { Surface, Text } from "react-native-paper";
import { tabsLocalKey } from "@/i18n/key/modules/tabs";

const Menu = () => {
  const { width } = Dimensions.get(Platform.OS === "web" ? "window" : "screen");
  const webWidth = width < 480 ? width : 480;
  const { push } = useRouter();
  const { t } = useTranslation();

  const menuList = [
    {
      label: t(tabsLocalKey.home.addCard),
      image: require("@/assets/images/add-card.png"),
      route: "/(mycard)/addNewCard",
    },
    {
      label: t(tabsLocalKey.home.activateCard),
      image: require("@/assets/images/activate-card.png"),
      route: "/(home)/activate-card",
    },
    {
      label: t(tabsLocalKey.home.promosAndDiscount),
      image: require("@/assets/images/promo.png"),
      route: "/(home)/promos",
    },
  ];
  return menuList.map((item, ids) => (
    <Pressable key={ids} onPress={() => push(item.route as RelativePathString)}>
      <Surface
        style={{
          backgroundColor: theme.colors.background,
          borderRadius: 16,
          paddingHorizontal: 16,
          alignItems: "center",
          flexBasis: "auto",
          width: Platform.OS === "web" ? (webWidth - 60) / 3 : (width - 60) / 3,
          maxWidth: 480,
          height: 125,
          justifyContent: "center",
        }}
      >
        <Image source={item.image} style={{ width: 70, height: 70 }} />
        <Text
          variant="labelMedium"
          style={{
            textAlign: "center",
            fontFamily: "PoppinsSemiBold",
            fontSize: 12,
          }}
        >
          {item.label}
        </Text>
      </Surface>
    </Pressable>
  ));
};

export default Menu;
