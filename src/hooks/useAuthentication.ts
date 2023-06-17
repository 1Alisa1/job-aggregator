import { useFetch } from "./useFetch";

interface IAuthenticationResponse {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
}

const getUrlParams = () => {
  const AUTH_LOGIN = process.env.REACT_APP_API_AUTH_LOGIN;
  const AUTH_PASSWORD = process.env.REACT_APP_API_AUTH_PASSWORD;
  const AUTH_CLIENT_ID = process.env.REACT_APP_API_AUTH_CLIENT_ID;
  const AUTH_CLIENT_SECRET = process.env.REACT_APP_API_AUTH_CLIENT_SECRET;
  const AUTH_HR = process.env.REACT_APP_API_AUTH_HR;

  if (!AUTH_LOGIN) throw Error(`REACT_APP_API_AUTH_LOGIN is undefined`);
  if (!AUTH_PASSWORD) throw Error(`REACT_APP_API_AUTH_PASSWORD is undefined`);
  if (!AUTH_CLIENT_ID) throw Error(`REACT_APP_API_AUTH_CLIENT_ID is undefined`);
  if (!AUTH_CLIENT_SECRET)
    throw Error(`REACT_APP_API_AUTH_CLIENT_SECRET is undefined`);
  if (!AUTH_HR) throw Error(`REACT_APP_API_AUTH_HR is undefined`);

  return new URLSearchParams({
    login: AUTH_LOGIN,
    password: AUTH_PASSWORD,
    client_id: AUTH_CLIENT_ID,
    client_secret: AUTH_CLIENT_SECRET,
    hr: AUTH_HR,
  });
};

const getClientSecret = () => {
  const AUTH_X_SECRET_KEY = process.env.REACT_APP_API_AUTH_X_SECRET_KEY;
  if (!AUTH_X_SECRET_KEY)
    throw Error(`REACT_APP_API_AUTH_X_SECRET_KEY is undefined`);
  return AUTH_X_SECRET_KEY;
};

const getApiUrl = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) throw Error(`REACT_APP_API_URL is undefined`);

  return API_URL;
};

const getAuthByPassUrl = () =>
  `${getApiUrl()}/oauth2/password?${getUrlParams()}`;

export const useAuthentication = () => {
  const { loading, response, error } = useFetch<IAuthenticationResponse>(
    getAuthByPassUrl(),
    {
      method: "GET",
      headers: {
        "x-secret-key": getClientSecret(),
      },
    }
  );

  let accessToken = "";
  if (!loading && !error && response) {
    accessToken = response.access_token;
  }

  return { loading, accessToken, error };
};