import { promos } from "@/data/home";
import theme from "@/theme";
import React, { ReactNode } from "react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  Platform,
  PanResponderInstance,
} from "react-native";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("window");

interface PromoCardType {
  promo: PromoType;
  onOpen?: () => void;
}

interface PromoType {
  promoId: number;
  promoImage: string;
  promoHeader: string;
  promoContent: PromoContentType;
}

interface PromoContentType {
  promoImageFull: string;
  promoTitle: string;
  promoDesc: string;
  promoDetail: string;
  promoDetailImage: string;
}

const BottomSheetContainer = styled(Animated.View)({
  position: Platform.OS === "web" ? "fixed" : "absolute",
  bottom: 0,
  width: "100%",
  height: height * 0.8,
  maxWidth: 480,
  backgroundColor: "white",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
});

const DragHandle = styled(View)({
  width: 40,
  height: 5,
  backgroundColor: "gray",
  borderRadius: 10,
  alignSelf: "center",
  marginVertical: 20,
});

const Overlay = styled(TouchableOpacity)({
  position: Platform.OS === "web" ? "fixed" : "absolute",
  top: 0,
  left: "50%",
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  width: 480,
  pointerEvents: "auto",
  touchAction: "none",
});

const StyledCard = styled(Card)({
  width: 350,
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "white",
  marginTop: 10,
  marginBottom: 10,
});

const StyledImage = styled(Image)({
  width: "100%",
  height: 200,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

const StyledButton = styled(TouchableOpacity)({
  marginTop: 10,
  backgroundColor: theme.colors.primary,
  width: 100,
  height: 30,
  borderRadius: 8,
  justifyContent: "center",
});
const StyledText = styled(Text)({
  fontFamily: "PoppinsSemiBold",
  textAlign: "center",
  color: "#333",
  fontSize: 15,
  marginTop: 20,
  marginBottom: 10,
});

const ImageHeader = styled(Image)({
  width: Math.min(500, width),
  height: Math.min(203, (203 / 500) * width),
});

const ImageDetail = styled(Image)({
  width: Math.min(700, width),
  height: Math.min(700, (1000 / 667) * (width * 0.95)),
});

interface CustomBotSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  sheetHeight?: number;
}

const CustomBottomSheet = (props: CustomBotSheetProps) => {
  const {
    visible,
    onClose,
    children,
    sheetHeight = Platform.OS === "web" ? height : height * 1,
  } = props;
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(height);
      Animated.spring(translateY, {
        toValue: height - sheetHeight,
        damping: 40,
        stiffness: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: height,
        damping: 40,
        stiffness: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, sheetHeight, translateY]);

  const handleClose = () => {
    Animated.spring(translateY, {
      toValue: height,
      damping: 40,
      stiffness: 300,
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

  const panResponder: PanResponderInstance = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(
            Math.min(height, height - sheetHeight + gestureState.dy)
          );
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          handleClose();
        } else {
          Animated.spring(translateY, {
            toValue: height - sheetHeight,
            damping: 40,
            stiffness: 300,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderGrant: (event) => {
        if (Platform.OS === "ios") {
          event.preventDefault();
        }
      },
    })
  ).current;

  return (
    <Fragment>
      <Overlay
        style={{
          opacity: translateY.interpolate({
            inputRange: [height - sheetHeight, height],
            outputRange: [1, 0],
            extrapolate: "clamp",
          }),
          transform: [{ translateX: -240 }],
        }}
        activeOpacity={1}
        onPress={handleClose}
      />
      <BottomSheetContainer
        sheetHeight={sheetHeight}
        style={{ transform: [{ translateY }] }}
      >
        <View style={{ width: "100%" }} {...panResponder.panHandlers}>
          <DragHandle />
        </View>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 10,
          }}
          onStartShouldSetResponder={() => true}
        >
          {children}
        </ScrollView>
      </BottomSheetContainer>
    </Fragment>
  );
};

const PromoCard = ({ promo, onOpen }: PromoCardType) => {
  return (
    <StyledCard>
      <StyledImage source={promo.promoImage} />
      <Card.Content
        style={{
          alignItems: "center",
        }}
      >
        <StyledText>{promo.promoHeader}</StyledText>
        <StyledButton onPress={onOpen}>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              textAlign: "center",
              fontWeight: "light",
            }}
          >
            Read more
          </Text>
        </StyledButton>
      </Card.Content>
    </StyledCard>
  );
};

const Promos = () => {
  const [selectedPromo, setSelectedPromo] = useState<PromoType | null>(null);
  const [isVisible, showIsVisible] = useState<boolean>(false);

  return (
    <Fragment>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        pointerEvents={isVisible ? "none" : "auto"}
      >
        {promos.map((item) => (
          <PromoCard
            key={item.promoId}
            promo={item}
            onOpen={() => {
              setSelectedPromo(item);
              showIsVisible(true);
            }}
          />
        ))}
      </ScrollView>
      {isVisible && (
        <CustomBottomSheet
          visible={isVisible}
          onClose={() => {
            showIsVisible(false);
            setSelectedPromo(null);
          }}
        >
          {selectedPromo && (
            <View style={{ alignItems: "center" }}>
              <ImageHeader source={selectedPromo.promoContent.promoImageFull} />
              <View
                style={{
                  alignItems: "center",
                  paddingBottom: 15,
                  width: "100%",
                }}
              >
                <StyledText>{selectedPromo.promoContent.promoTitle}</StyledText>
                <Text
                  style={{
                    marginTop: 15,
                    marginLeft: 10,
                    marginRight: 10,
                    paddingHorizontal: 15,
                    textAlign: "left",
                  }}
                >
                  {selectedPromo.promoContent.promoDesc}
                </Text>
                <StyledText>
                  {selectedPromo.promoContent.promoDetail}
                </StyledText>
                {selectedPromo.promoContent.promoDetailImage && (
                  <ImageDetail
                    source={selectedPromo.promoContent.promoDetailImage}
                    resizeMode="contain"
                  />
                )}
              </View>
            </View>
          )}
        </CustomBottomSheet>
      )}
    </Fragment>
  );
};

export default Promos;
