import { IVacanciesResponse, IVacancy } from "../models";
import { useApi } from "./useApi";

export const useFavoriteVacancies = (
  ids: IVacancy["id"][],
  itemsPerPage: number,
  page: number
) => {
  const idsList = ids.map((id, i) => `ids[${i}]=${id}`).join("&");

  const queryParams = new URLSearchParams();

  queryParams.set("page", page.toString());
  queryParams.set("count", itemsPerPage.toString());

  const { loading, response, error } = useApi<IVacanciesResponse>(
    `vacancies?${idsList}&${queryParams}`
  );

  let vacancies: IVacanciesResponse | null = null;

  if (!error && !loading && response) {
    vacancies = response;
  }

  return { loading, response: vacancies, error };
}