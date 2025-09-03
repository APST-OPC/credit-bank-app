import { Link, Stack } from "expo-router";
import React from "react";
import { Fragment } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>
          Oops! This page does not exist!{" "}
          <Link href="./index">Click here to return</Link>
        </Text>
      </View>
    </Fragment>
  );
}
