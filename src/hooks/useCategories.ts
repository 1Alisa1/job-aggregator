import ICategory from "../models/categoryModel";
import { useApi } from "./useApi";

export function useCategories() {
  const { loading, response, error } = useApi<ICategory[]>(`catalogues/`);

  let categories: ICategory[] | null = null;

  if (!error && !loading && response) {
    categories = response;
  }

  return { loading, response: categories, error };
}
