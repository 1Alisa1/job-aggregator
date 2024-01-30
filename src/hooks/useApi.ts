import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import axios from "axios";

const getClientSecret = () => {
  const AUTH_CLIENT_SECRET = process.env.REACT_APP_API_AUTH_CLIENT_SECRET;

  if (!AUTH_CLIENT_SECRET)
    throw Error(`REACT_APP_API_AUTH_CLIENT_SECRET is undefined`);

  return AUTH_CLIENT_SECRET;
};

const getSecretKey = () => {
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

export const useApi = <T>(url: string, options?: RequestInit) => {
  
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const accessToken = useAuthContext();

  useEffect(() => {
    if (!url || !accessToken) {
      return;
    }

    const controller = new AbortController();

    axios<T>({
      url: `${getApiUrl()}/${url}`,
      method: options?.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Api-App-Id": getClientSecret(),
        "x-secret-key": getSecretKey(),
      },
      signal: controller.signal
    })
    .then(res => {
      setResponse(res.data);
      setLoading(false);
    })
    .catch(error => setError(error));

    return () => {
      controller.abort();
    };
  }, [accessToken, url]);

  return { loading, response, error };
};
