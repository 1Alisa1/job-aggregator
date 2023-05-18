import IVacanciesResponse, { IVacancy } from "../models/vacancyModel";
import { useApi } from "./useApi";

export function useFavoriteVacancies(ids: IVacancy["id"][]) {
  const queryParams = ids.map((id, i) => `ids[${i}]=${id}`).join("&");

  const { loading, response, error } = useApi<IVacanciesResponse>(
    `vacancies?${queryParams}`
  );

  let vacancies: IVacanciesResponse | null = null;

  if (!error && !loading && response) {
    vacancies = response;
  }

  return { loading, response: vacancies, error };
}

export default useFavoriteVacancies;
