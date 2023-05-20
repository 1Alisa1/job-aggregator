import { useNavigate } from "react-router-dom";
import VacanciesContainer from "../../components/vacanciesContainer/vacanciesContainer";
import { useFavoriteVacanciesContext } from "../../context/context";
import useFavoriteVacancies from "../../hooks/useFavoriteVacancies";
import styles from "./favoritesPage.module.scss";
import { useEffect } from "react";

const FavoritesPage: React.FC = () => {
  const { favoriteVacancies, setFavoriteVacancies } =
    useFavoriteVacanciesContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (favoriteVacancies.length === 0) {
      navigate("/404");
    }
  }, [favoriteVacancies]);

  const { loading, response, error } = useFavoriteVacancies(favoriteVacancies);
  return (
    <>
      {loading && <div>Please, stand by</div>}
      {error && <div>Error!</div>}
      {!loading && !error && response && (
        <section className={styles.favoriteVacanciesSection}>
          <VacanciesContainer vacancies={response} />
        </section>
      )}
    </>
  );
};

export { FavoritesPage };
