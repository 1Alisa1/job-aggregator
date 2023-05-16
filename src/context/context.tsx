import { createContext, useState, useContext, useEffect } from "react";
import { IVacancy } from "../models/vacancyModel";

interface FavoriteVacanciesContextValue {
  favoriteVacancies: IVacancy["id"][];
  setFavoriteVacancies: React.Dispatch<React.SetStateAction<IVacancy["id"][]>>;
}

const FavoriteVacanciesContext =
  createContext<FavoriteVacanciesContextValue | null>(null);

interface FavoriteVacanciesProviderProps {
  children: React.ReactNode;
}

export const FavoriteVacanciesProvider: React.FC<
  FavoriteVacanciesProviderProps
> = ({ children }) => {
  let initialValue: IVacancy["id"][] = [];

  const localStorageKey = process.env.REACT_APP_LOCALSTORAGE_KEY;

  if (!localStorageKey) {
    throw Error(`REACT_APP_LOCALSTORAGE_KEY is undefined`);
  }

  const storage = localStorage.getItem(localStorageKey);

  if (storage) {
    initialValue = JSON.parse(storage);
  }

  const [favoriteVacancies, setFavoriteVacancies] =
    useState<IVacancy["id"][]>(initialValue);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(favoriteVacancies));
  }, [favoriteVacancies]);

  return (
    <FavoriteVacanciesContext.Provider
      value={{ favoriteVacancies, setFavoriteVacancies }}
    >
      {children}
    </FavoriteVacanciesContext.Provider>
  );
};

export const useFavoriteVacanciesContext = () => {
  const context = useContext(FavoriteVacanciesContext);

  if (!context) {
    throw Error("Expected context value to be set");
  }

  return context;
};
