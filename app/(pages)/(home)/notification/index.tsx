import React, { ReactElement, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { Avatar, Text } from "react-native-paper";

import { useRouter } from "expo-router";

import { initialNotifications } from "@/data/home";

import {
  NotificationItem,
  useNotificationStore,
} from "@/store/home/useNotification";
import Container from "@/components/Container";

const ReadAll = styled(Text)({
  fontFamily: "Poppins",
  color: "#656565",
  paddingHorizontal: 15,
  paddingVertical: 8,
  textAlign: "right",
});

interface NotificationItemProps extends NotificationItem {
  handlePress: () => void;
}

const RenderNotificationItem = (props: NotificationItemProps): ReactElement => {
  return (
    <TouchableOpacity onPress={props.handlePress}>
      <Animated.View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: props.read ? "#FFFFFF" : "#E7F2F8",
        }}
      >
        <View style={{ flexDirection: "row", columnGap: 4 }}>
          <Avatar.Text label="XD" size={30} />
          <View>
            <Text
              variant="labelLarge"
              style={{ fontFamily: "PoppinsSemiBold" }}
            >
              {props.title}
            </Text>
            <Text
              variant="labelSmall"
              style={{ flexWrap: "wrap", fontFamily: "Poppins" }}
            >
              {`${props.description.slice(0, 40)}...`}
            </Text>
          </View>
        </View>

        <Text
          variant="labelSmall"
          style={{ color: "#A0A0A0", fontFamily: "Poppins" }}
        >
          {props.timespan}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Notification = (): ReactElement => {
  const router = useRouter();
  const {
    notifications,
    markAllAsRead,
    markAsRead,
    setNotifications,
    setSelectedNotification,
  } = useNotificationStore();

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [setNotifications]);

  const handleNavigate = (index: number, data: NotificationItem) => {
    setSelectedNotification(data);

    router.push({
      pathname: "/notification/[id]",
      params: { id: index },
    });

    markAsRead(index);
  };

  return (
    <Container>
      <Animated.View>
        <TouchableOpacity hitSlop={20} onPress={markAllAsRead}>
          <ReadAll variant="labelMedium">
            {notifications.length !== 0 && "Read All"}
          </ReadAll>
        </TouchableOpacity>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={notifications}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <RenderNotificationItem
              title={item.title}
              description={item.description}
              timespan={item.timespan}
              read={item.read}
              handlePress={() => handleNavigate(index, item)}
            />
          )}
          ListEmptyComponent={
            <Animated.View
              style={{
                paddingVertical: 16,
              }}
            >
              <Text
                variant="bodyMedium"
                style={{ textAlign: "center", color: "gray" }}
              >
                No recent transactions available
              </Text>
            </Animated.View>
          }
        />
      </Animated.View>
    </Container>
  );
};

export default Notification;
