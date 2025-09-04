import React, { ReactElement } from "react";
import { useNotificationStore } from "@/store/home/useNotification";
import { Stack } from "expo-router";
import { Fragment } from "react";
import Animated from "react-native-reanimated";

import { Text } from "react-native-paper";

const GetNotification = (): ReactElement => {
  const selectedNotification = useNotificationStore(
    (state) => state.selectedNotification
  );

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: selectedNotification?.title || "Notification",
          headerTitleAlign: "center",
        }}
      />
      <Animated.View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
        {selectedNotification ? (
          <Animated.View>
            <Text variant="bodyLarge" style={{ fontWeight: "600" }}>
              {selectedNotification.title}
            </Text>
            <Text variant="bodyMedium">{selectedNotification.description}</Text>
            <Text variant="bodyMedium" style={{ color: "#A0A0A0" }}>
              {selectedNotification.timespan}
            </Text>
          </Animated.View>
        ) : (
          <Text variant="bodyMedium">No notification found.</Text>
        )}
      </Animated.View>
    </Fragment>
  );
};

export default GetNotification;
