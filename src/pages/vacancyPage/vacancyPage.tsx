import styles from "./vacancyPage.module.scss";
import VacancyDetails from "../../components/vacancyDetails/vacancyDetails";
import { useLocation } from "react-router-dom";
import VacancyContainer from "../../components/vacancyContainer/vacancyContainer";
import BriefJobDescription from "../../components/briefJobDescription/briefJobDescription";

const VacancyPage: React.FC = () => {
  const { state: data = {} } = useLocation();

  return (
    <section className={styles.vacancyDelailsSection}>
      <VacancyContainer
        data={data}
        dataElemStarBtn={`vacancy-${data.id}-shortlist-button`}
      >
        <BriefJobDescription
          title={data.profession}
          payment_from={data.payment_from}
          payment_to={data.payment_to}
          schedule={data.type_of_work.title}
          town={data.town.title}
          currency={data.currency}
          isDetail={true}
        />
      </VacancyContainer>
      <VacancyDetails vacancyDetails={data.vacancyRichText} />
    </section>
  );
};

export { VacancyPage };
