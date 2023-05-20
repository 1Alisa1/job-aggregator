import SearchInput from "../../components/searchInput/searchInput";
import VacanciesContainer from "../../components/vacanciesContainer/vacanciesContainer";
import VacancySearchFilter from "../../components/vacancySearchFilter/vacancySearchFilter";
import { useVacancies } from "../../hooks/useVacancies";
import styles from "./homePage.module.scss";

const HomePage: React.FC = () => {
  const { loading, response, error } = useVacancies();

  return (
    <section className={styles.vacanciesSection}>
      <div className={styles.filterContainer}>
        <VacancySearchFilter />
      </div>
      <div className={styles.vacanciesContainer}>
        <SearchInput />
        {loading && <div>Please, stand by</div>}
        {error && <div>Error!</div>}
        {!loading && !error && response && (
          <VacanciesContainer vacancies={response} />
        )}
      </div>
    </section>
  );
};

export { HomePage };
