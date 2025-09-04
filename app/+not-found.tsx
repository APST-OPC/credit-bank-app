import { Link, Stack } from "expo-router";
import React, { ReactElement } from "react";
import { Fragment } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const NotFoundScreen = (): ReactElement => {
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
};

export default NotFoundScreen;
