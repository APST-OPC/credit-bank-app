import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";
import { ICredentials } from "@/components/auth/type";

interface IAuthContext {
  session: boolean;
  login: (props: ICredentials) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (session === true) {
      router.push("/home");
    }
  }, [router, session]);

  const login = async (props: ICredentials) => {
    const { email, password } = props;
    if (email && password) {
      setSession(true);
    }
  };
  const logout = () => {
    setSession(false);
  };

  const contextData = { session, login, logout };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
