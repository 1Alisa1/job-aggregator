import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextProps {
  children: React.ReactNode;
}

interface IAuthenticationResponse {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
}

const loginUser = async (): Promise<IAuthenticationResponse> => {

  const API_URL = process.env.REACT_APP_API_URL;
  const AUTH_LOGIN = process.env.REACT_APP_API_AUTH_LOGIN;
  const AUTH_PASSWORD = process.env.REACT_APP_API_AUTH_PASSWORD;
  const AUTH_CLIENT_ID = process.env.REACT_APP_API_AUTH_CLIENT_ID;
  const AUTH_CLIENT_SECRET = process.env.REACT_APP_API_AUTH_CLIENT_SECRET;
  const AUTH_HR = process.env.REACT_APP_API_AUTH_HR;

  return axios
    .get(`${API_URL}/oauth2/password/`, {
      params: {
        login: AUTH_LOGIN,
        password: AUTH_PASSWORD,
        client_id: AUTH_CLIENT_ID,
        client_secret: AUTH_CLIENT_SECRET,
        hr: AUTH_HR,
      },
      headers: {
        'X-Api-App-Id': AUTH_CLIENT_SECRET,
      },
    })
    .then((response) => response.data);
};

const AuthContext = createContext<string | null>(null);

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {

    loginUser()
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error(error));

  });

  return <AuthContext.Provider value={accessToken}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
