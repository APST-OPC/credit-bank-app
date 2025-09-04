import StackLayout from "@/components/StackLayout";
import { Stack } from "expo-router";
import React, { ReactElement } from "react";
const MyCardsLayout = (): ReactElement => {
  return (
    <StackLayout>
      <Stack.Screen
        name="addNewCard"
        options={{
          title: "Add New Card",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="recentTransactions"
        options={{
          title: "Recent Transactions",
          headerTitleAlign: "center",
        }}
      />
    </StackLayout>
  );
};

export default MyCardsLayout;
