import styles from "./vacancyDetails.module.scss";

interface VacancyDetailsProps {
  vacancyDetails: string;
}

const VacancyDetails: React.FC<VacancyDetailsProps> = ({ vacancyDetails }) => {
  return (
    <div className={styles.vacancyDetailsContainer}>
      <div
        className={styles.vacancyDetails}
        dangerouslySetInnerHTML={{ __html: vacancyDetails }}
      ></div>
    </div>
  );
};

export default VacancyDetails;
