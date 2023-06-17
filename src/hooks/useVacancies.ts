import { IVacanciesFilter, IVacanciesResponse} from "../models";
import { useApi } from "./useApi";

export const useVacancies = (
  filter: IVacanciesFilter,
  keyword: string,
  itemsPerPage: number,
  page: number
) => {
  const queryParams = new URLSearchParams();

  queryParams.set("published", "1");

  if (filter.industryKey) {
    queryParams.set("catalogues", filter.industryKey.toString());
  }

  if (filter.paymentFrom) {
    queryParams.set("payment_from", filter.paymentFrom.toString());
  }

  if (filter.paymentTo) {
    queryParams.set("payment_to", filter.paymentTo.toString());
  }

  if (keyword) {
    queryParams.set("keyword", keyword);
  }

  queryParams.set("page", page.toString());
  queryParams.set("count", itemsPerPage.toString());

  const { loading, response, error } = useApi<IVacanciesResponse>(
    `vacancies?${queryParams}`
  );

  let vacancies: IVacanciesResponse | null = null;

  if (!error && !loading && response) {
    vacancies = response;
  }

  return { loading, response: vacancies, error };
}
