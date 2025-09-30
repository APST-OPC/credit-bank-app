import useStepperStore from "@/store/useStepper";
import React, { ReactElement } from "react";
import { Dimensions, Platform, View, ViewProps } from "react-native";
import styled from "styled-components/native";
import SubmitButton from "@/components/common/submit-button/SubmitButton";
import { ProgressBar, Text } from "react-native-paper";

interface IProgressViewProps extends ViewProps {
  activeStep: number;
  items: { label: string; component: ReactElement }[];
  handleLast: () => void;
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
  const { height } = Dimensions.get(
    Platform.OS === "web" ? "window" : "screen"
  );
  const {
    items,
    activeStep,
    viewHeight = height * 0.85,
    handleLast,
    ...rest
  } = props;
  const progress = (activeStep + 1) / items.length;
  const lastStep = activeStep === items.length - 1;
  const next = useStepperStore((state) => state.actions.nextStep);
  const previous = useStepperStore((state) => state.actions.previousStep);

  const renderNavigationButtons = () => {
    return (
      <NavigationView>
        <SubmitButton
          style={{ width: "50%" }}
          onPress={previous}
          disabled={activeStep === 0}
        >
          PREVIOUS
        </SubmitButton>
        <SubmitButton
          style={{ width: "50%" }}
          onPress={lastStep ? handleLast : next}
        >
          {lastStep ? "SUBMIT" : "NEXT"}
        </SubmitButton>
      </NavigationView>
    );
  };
  return (
    <View>
      <View style={{ height: viewHeight }} {...rest}>
        <ProgressBar
          progress={progress}
          color="#004068"
          style={{ marginBottom: 20 }}
        />
        <HeaderText variant="titleLarge">{items[activeStep].label}</HeaderText>
        {items[activeStep].component}
      </View>
      <View>{renderNavigationButtons()}</View>
    </View>
  );
};
export default ProgressView;
