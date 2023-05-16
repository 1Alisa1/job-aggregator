import VacanciesContainer from "../../components/vacanciesContainer/vacanciesContainer";
import VacancySearchFilter from "../../components/vacancySearchFilter/vacancySearchFilter";
import { useVacancies } from "../../hooks/useVacancies";
import styles from "./homePage.module.scss";

const HomePage: React.FC = () => {
  const data = useVacancies();

  return (
    <section className={styles.vacanciesSection}>
      <div className={styles.filterContainer}>
        <VacancySearchFilter />
      </div>
      <div className={styles.vacanciesContainer}>
        <VacanciesContainer vacancies={data}/>
      </div>
    </section>
  );
};

export { HomePage };
