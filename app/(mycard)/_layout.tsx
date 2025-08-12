import StackLayout from "@/components/StackLayout";
import { Stack } from "expo-router";
import React from "react";
const MyCardsLayout = () => {
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
