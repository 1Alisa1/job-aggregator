import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useFetch } from "./useFetch";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [innerUrl, setInnerUrl] = useState("");

  const authData = useAuthContext();
  const authLoading = authData.loading;
  const authError = authData.error;
  const accessToken = authData.accessToken;

  const fetchData = useFetch<T>(innerUrl, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Api-App-Id": getClientSecret(),
      "x-secret-key": getSecretKey(),
    },
  });

  const fetchLoading = fetchData.loading;
  const fetchError = fetchData.error;
  const response = fetchData.response;

  useEffect(() => {
    if (!authLoading && !authError && accessToken) {
      setInnerUrl(url && `${getApiUrl()}/${url}`);
    }
  }, [authLoading, authError, accessToken, url]);

  useEffect(() => {
    setLoading(authLoading || fetchLoading);
  }, [authLoading, fetchLoading]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    } else if (fetchError) {
      setError(fetchError);
    } else {
      setError(null);
    }
  }, [authError, fetchError]);

  return { loading, response, error };
};
