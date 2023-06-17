import { createContext, useContext } from "react";
import { useAuthentication } from "../hooks";

interface IAuthContextValue {
  loading: boolean;
  error: Error | null;
  accessToken: string;
}

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextValue>({
  loading: true,
  error: null,
  accessToken: "",
});

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const data: IAuthContextValue = useAuthentication();

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("Expected context value to be set");
  }

  return context;
};

export { AuthContextProvider, useAuthContext };
