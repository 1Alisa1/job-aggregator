import useVacancy from "../../hooks/useVacancy";
import BriefJobDescription from "../briefJobDescription/briefJobDescription";
import VacancyContainer from "../vacancyContainer/vacancyContainer";
import styles from "./vacanciesContainer.module.scss";

const VacanciesContainer: React.FC = () => {
  const data = useVacancy();
  return (
    <div className={styles.vacanciesContainer}>
      {data.objects.map((el) => (
        <VacancyContainer key={el.id}>
          <BriefJobDescription
            title={el.profession}
            payment_from={el.payment_from}
            payment_to={el.payment_to}
            schedule={el.type_of_work.title}
            town={el.town.title}
            currency={el.currency}
          />
        </VacancyContainer>
      ))}
    </div>
  );
};

export default VacanciesContainer;
