import IVacanciesResponse from "../models/vacancyModel";
import { useApi } from "./useApi";

export function useVacancies() {
  const { loading, response, error } = useApi<IVacanciesResponse>(`vacancies/`);

  let vacancies: IVacanciesResponse | null = null;

  if (!error && !loading && response) {
    vacancies = response;
  }

  return { loading, response: vacancies, error };
}
