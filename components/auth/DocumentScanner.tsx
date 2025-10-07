import type { ReactElement } from "react";

import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Image, Modal } from "react-native";
import { List, TextInput } from "react-native-paper";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";

import { ISignInForm } from "@/components/auth/type";
import { FormView } from "@/components/auth/styled";
import { ControlledTextField } from "@/components/common/app-form/controlled";
import { idTypes } from "@/components/auth/utils";
import SubmitButton from "@/components/common/SubmitButton";

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
  width: "100%",
  borderRadius: 5,
  backgroundColor: "white",
  gap: 10,
});
const UploadImage = styled(Image)({
  borderRadius: 5,
  height: 300,
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
});
const ModalContainer = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  alignSelf: "center",
  width: 480,
});
const ModalContent = styled(View)({
  backgroundColor: "white",
  padding: 20,
  borderRadius: 25,
  width: "70%",
});

const DropDown = (): ReactElement => {
  const [visible, setVisible] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext<ISignInForm>();
  const pickOption = (value: string) => {
    setFieldValue("documentUpload.idType", value);
    setVisible(false);
  };
  return (
    <>
      <ControlledTextField
        name="documentUpload.idType"
        label="Id Type"
        right={
          <TextInput.Icon
            icon="chevron-down"
            size={30}
            onPress={() => setVisible(true)}
          />
        }
        editable={false}
      />
      <Modal animationType="fade" visible={visible} transparent>
        <ModalContainer>
          <ModalContent>
            {idTypes.map(({ item, description }, index) => (
              <List.Item
                key={index}
                title={item}
                description={description}
                onPress={() => pickOption(item)}
              />
            ))}
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

const DocumentScanner = (): ReactElement => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const { setFieldValue } = useFormikContext<ISignInForm>();

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
          setFieldValue("documentUpload.document", photoData.uri);
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
  const placeHolders = ["", "ex: P123C*******", "ex: John Smith Barreta"];
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
          <DropDown />
          <ControlledTextField
            name="documentUpload.idNumber"
            label="ID Number"
            placeholder={placeHolders[1]}
          />
          <ControlledTextField
            name="documentUpload.nameOnId"
            label="Name on ID"
            placeholder={placeHolders[2]}
          />
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

export default DocumentScanner;
