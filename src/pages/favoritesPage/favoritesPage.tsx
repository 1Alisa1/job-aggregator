import VacanciesContainer from "../../components/vacanciesContainer/vacanciesContainer";
import { useFavoriteVacanciesContext } from "../../context/context";
import useFavoriteVacancies from "../../hooks/useFavoriteVacancies";
import styles from "./favoritesPage.module.scss";

const FavoritesPage: React.FC = () => {
  const { favoriteVacancies, setFavoriteVacancies } =
    useFavoriteVacanciesContext();

  const vacancies = useFavoriteVacancies(favoriteVacancies);

  return (
    <section className={styles.favoriteVacanciesSection}>
      <VacanciesContainer vacancies={vacancies} />
    </section>
  );
};

export { FavoritesPage };
