import VacancySearchFilter from "../../components/vacancySearchFilter/vacancySearchFilter";
import styles from "./homePage.module.scss";
const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
    <VacancySearchFilter />
    </div>
  );
}

export {HomePage};