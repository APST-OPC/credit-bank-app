import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/context/authContext";

const PageLayout = () => {
  const { session } = useAuth();
  return !session ? <Redirect href={"/(auth)"} /> : <Slot />;
};

export default PageLayout;
