import { IVacancy } from "../../models/vacancyModel";
import BriefJobDescription from "../briefJobDescription/briefJobDescription";
import VacancyContainer from "../vacancyContainer/vacancyContainer";
import styles from "./vacanciesContainer.module.scss";

interface VacanciesContainerProps {
  vacancies: IVacancy[];
}

const VacanciesContainer: React.FC<VacanciesContainerProps> = ({vacancies}) => {
  
  return (
    <div className={styles.vacanciesContainer}>
      {vacancies.map((el) => (
        <VacancyContainer key={el.id} data={el}>
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
