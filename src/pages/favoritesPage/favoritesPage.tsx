import { useNavigate, useSearchParams } from "react-router-dom";
import VacanciesContainer from "../../components/vacanciesContainer/vacanciesContainer";
import { useFavoriteVacanciesContext } from "../../context/context";
import useFavoriteVacancies from "../../hooks/useFavoriteVacancies";
import styles from "./favoritesPage.module.scss";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 4;

const getPageFromSearchParams = (searchParams: URLSearchParams) => {
  const page = searchParams.get("page");

  return page ? Number(page) - 1 : 0;
};

const FavoritesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { favoriteVacancies, setFavoriteVacancies } =
    useFavoriteVacanciesContext();

  const [page, setPage] = useState(getPageFromSearchParams(searchParams));

  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (page) {
      queryParams.set("page", (page + 1).toString());
    }

    navigate(`/favorites?${queryParams}`);
  }, [page]);

  useEffect(() => {
    if (favoriteVacancies.length === 0) {
      navigate("/404");
    }
  }, [favoriteVacancies]);

  const { loading, response, error } = useFavoriteVacancies(
    favoriteVacancies,
    ITEMS_PER_PAGE,
    page
  );

  let total = response?.total ?? 0;

  if (total > 500) {
    total = 500;
  }

  const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

  if (response && page + 1 > pageCount) {
    navigate("/404");
  }

  return (
    <>
      {loading && <div>Please, stand by</div>}
      {error && <div>Error!</div>}
      {!loading && !error && response && (
        <section className={styles.favoriteVacanciesSection}>
          <VacanciesContainer
            vacancies={response.objects}
            itemsPerPage={ITEMS_PER_PAGE}
            pageCount={pageCount}
            page={page}
            setPage={setPage}
          />
        </section>
      )}
    </>
  );
};

export { FavoritesPage };
