import { View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import React, { useState, useRef, ReactElement } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { FormView } from "@/components/auth/styled";
import { ControlledTextField } from "../app-form/controlled";
import { stringFormat } from "@/utils/helpers";
import SubmitButton from "../submit-button/SubmitButton";
import { useFormikContext } from "formik";
import { ISignUpFormFields } from "@/components/auth/type";
import { documentUploadInitValues } from "@/components/auth/utils";

const CameraBox = styled(View)({
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  paddingBottom: 40,
  backgroundColor: "transparent",
});
const CloseBox = styled(View)({
  display: "flex",
  width: "100%",
  height: 60,
  alignItems: "flex-end",
});
const CameraWidget = styled(View)({
  flexDirection: "row",
  gap: 30,
  position: "absolute",
  bottom: 20,
});
const CameraButton = styled(TouchableOpacity)({
  border: "3px solid white",
  borderRadius: 100,
  padding: 14,
  opacity: 0.5,
});
const CloseCameraButton = styled(TouchableOpacity)({
  top: 10,
  right: 10,
  opacity: 0.5,
  zIndex: 1,
});

const Uploader = styled(View)({
  flex: 1,
  padding: 20,
});
const UploaderBox = styled(View)({
  height: 300,
  width: "100%",
  borderRadius: 5,
  backgroundColor: "white",
  gap: 10,
});
const UploadImage = styled(Image)({
  width: "100%",
  height: "100%",
  borderRadius: 5,
  objectFit: "cover",
  objectPosition: "center",
  position: "relative",
});
const UploadPlaceholder = styled(View)({
  height: 300,
  width: "100%",
  backgroundColor: "black",
  borderRadius: 5,
  position: "relative",
});
const UploaderButton = styled(TouchableOpacity)({
  display: "flex",
  flexShrink: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 100,
  boxShadow: "0 0px 15px rgba(255, 255, 255, 0.5)",
});

const DocumentScanner = (): ReactElement => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const { setFieldValue } = useFormikContext<ISignUpFormFields>();

  const handleChangePhoto = async (): Promise<void> => {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) {
        return;
      }
    }

    setIsCameraOpen(true);
  };

  const capturePhoto = async (): Promise<void> => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        if (photoData?.uri) {
          setPhoto(photoData.uri);
          setIsCameraOpen(false);
          setFieldValue("document", photoData.uri);
        } else {
          console.error("Failed to capture photo, no URI found.");
        }
      } catch (error) {
        console.error("Error capturing photo: ", error);
      }
    }
  };

  const openGallery = async (): Promise<void> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } else {
      console.error("Permission to access gallery was denied");
    }
  };

  const openCamera = (): ReactElement => {
    return (
      <CameraView style={{ flex: 1 }} facing={"back"} ref={cameraRef}>
        <CloseBox>
          <CloseCameraButton onPress={() => setIsCameraOpen(false)}>
            <Ionicons name="close-circle-outline" color="#FFFFFF" size={50} />
          </CloseCameraButton>
        </CloseBox>
        <CameraBox>
          <CameraWidget>
            <CameraButton onPress={capturePhoto}>
              <Ionicons name="camera-sharp" size={50} color="#FFFFFF" />
            </CameraButton>
          </CameraWidget>
        </CameraBox>
      </CameraView>
    );
  };

  return isCameraOpen ? (
    openCamera()
  ) : (
    <Uploader>
      <UploaderBox>
        <View>
          {photo ? (
            <UploadImage source={{ uri: photo }} />
          ) : (
            <UploadPlaceholder />
          )}
          <UploaderButton
            style={{
              opacity: photo ? 0.5 : 1,
              transform: [{ translateX: -50 }, { translateY: -50 }],
            }}
            onPress={handleChangePhoto}
          >
            <Ionicons name="scan-circle" size={100} color="white" />
          </UploaderButton>
        </View>

        <FormView>
          {Object.keys(documentUploadInitValues)
            .slice(1, 4)
            .map((data, index) => (
              <ControlledTextField
                key={index}
                name={data}
                label={stringFormat(data)}
              />
            ))}
          <SubmitButton
            style={{ backgroundColor: "green" }}
            onPress={openGallery}
          >
            UPLOAD DOCUMENTS
          </SubmitButton>
        </FormView>
      </UploaderBox>
    </Uploader>
  );
};

{
  /* <StyledView>
        <AvatarFrame>
          <Avatar.Image
            size={120}
            source={{
              uri:
                photo ||
                "https://images7.alphacoders.com/489/thumb-1920-489447.jpg",
            }}
          />
          <OverlayButton onPress={handleChangePhoto}>
            <MaterialIcons name="camera-alt" size={24} color="white" />
          </OverlayButton>
        </AvatarFrame>
        <StyledButtonChangePhoto onPress={openGallery}>
          <StyledButtonTitle>Change Photo</StyledButtonTitle>
        </StyledButtonChangePhoto>
      </StyledView> */
}

export default DocumentScanner;
