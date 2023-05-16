import VacanciesContainer from "../../components/vacanciesContainer/vacanciesContainer";
import VacancySearchFilter from "../../components/vacancySearchFilter/vacancySearchFilter";
import styles from "./homePage.module.scss";
const HomePage: React.FC = () => {
  return (
    <section className={styles.vacanciesSection}>
      <div className={styles.filterContainer}>
        <VacancySearchFilter />
      </div>
      <div className={styles.vacanciesContainer}>
        <VacanciesContainer />
      </div>
    </section>
  );
};

export { HomePage };
