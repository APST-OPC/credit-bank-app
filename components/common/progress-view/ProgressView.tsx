import useStepperStore from "@/store/useStepper";
import React, { ReactElement } from "react";
import { Dimensions, Platform, View, ViewProps } from "react-native";
import styled from "styled-components/native";
import SubmitButton from "@/components/common/submit-button/SubmitButton";
import { Text } from "react-native-paper";
import * as Progress from "react-native-progress";

interface IProgressViewProps extends ViewProps {
  activeStep: number;
  items: { label: string; component: ReactElement }[];
  handleLast: () => void;
  handleSecond: () => void;
  viewHeight?: number;
}

const NavigationView = styled(View)({
  gap: 5,
  paddingHorizontal: 30,
  display: "flex",
  flexDirection: "row",
  padding: 10,
});

const HeaderText = styled(Text)({
  textAlign: "center",
  fontWeight: "bold",
});

const ProgressView = (props: IProgressViewProps): ReactElement => {
  const mobileH = Dimensions.get("screen").height * 0.83;
  const webH = Dimensions.get("window").height * 0.86;
  const {
    items,
    activeStep,
    viewHeight = Platform.OS === "web" ? webH : mobileH,
    handleSecond,
    handleLast,
    ...rest
  } = props;
  const progress = (activeStep + 1) / items.length;
  const next = useStepperStore((state) => state.actions.nextStep);
  const previous = useStepperStore((state) => state.actions.previousStep);

  const renderNavigationButtons = () => {
    return (
      <NavigationView>
        {activeStep < items.length - 1 && (
          <SubmitButton
            children="PREVIOUS"
            style={{ width: "50%" }}
            onPress={previous}
            disabled={activeStep === 0}
          />
        )}
        {activeStep === items.length - 1 && (
          <SubmitButton
            children="SIGN IN"
            style={{ width: "100%" }}
            onPress={handleLast}
          />
        )}
        {activeStep === items.length - 2 && (
          <SubmitButton
            children="SUBMIT"
            style={{ width: "50%" }}
            onPress={handleSecond}
          />
        )}
        {activeStep === items.length - 3 && (
          <SubmitButton
            children="NEXT"
            style={{ width: "50%" }}
            onPress={next}
          />
        )}
      </NavigationView>
    );
  };
  return (
    <View>
      <Progress.Bar
        progress={progress}
        width={null}
        color="#004068"
        style={{ marginBottom: 20 }}
        borderColor="transparent"
        borderRadius={0}
      />
      <View
        style={{
          height: viewHeight,
          display: "flex",
          overflowY: Platform.OS === "web" ? "auto" : "scroll",
        }}
        {...rest}
      >
        <HeaderText variant="titleLarge">{items[activeStep].label}</HeaderText>
        {items[activeStep].component}
      </View>
      {renderNavigationButtons()}
    </View>
  );
};
export default ProgressView;
