import React from "react";
import AuthContext from "./authContext";
import useStatesAndActions from "./useStatesAndAction";

interface ContextProps {
  children: React.ReactNode;
}
const AuthProvider = ({children}: ContextProps) => (
  <AuthContext.Provider value={useStatesAndActions() as any}>
    {children}
  </AuthContext.Provider>
);
export default AuthProvider;
