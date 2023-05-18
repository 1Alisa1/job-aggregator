import styles from "./briefJobDescription.module.scss";
import location from "../../img/location.svg";

interface BriefJobDescriptionProps {
  title: string;
  payment_from: number;
  payment_to: number;
  schedule: string;
  town: string;
  currency: string;
  isDetail: boolean;
}

const BriefJobDescription: React.FC<BriefJobDescriptionProps> = ({
  title,
  payment_from,
  payment_to,
  schedule,
  town,
  currency,
  isDetail
}) => {
  let salary = "";

  if (payment_to === 0 && payment_from) {
    salary = `от ${payment_from} ${currency}`;
  } else if (payment_from === 0 && payment_to) {
    salary = `до ${payment_to} ${currency}`;
  } else if (payment_from && payment_to) {
    salary = `${payment_from} - ${payment_to} ${currency}`;
  } else if (payment_from === 0 && payment_to === 0) {
    salary = "не указана";
  }

  return (
    <div className={styles.shortDescription + (isDetail ? " " + styles.shortDescriptionDetail: '')}>
      <div className={styles.title + (isDetail ? " " + styles.titleDetail : '')}>{title}</div>
      <div className={styles.salaryAndSchedule}>
        <div className={styles.salary + (isDetail ? " " + styles.salaryDetail : '')}>з/п {salary}</div>
        <div className={styles.dot}>•</div>
        <div className={styles.schedule + (isDetail ? " " + styles.sheduleDetail : '')}>{schedule}</div>
      </div>
      <div className={styles.town}>
        <img src={location} alt="location"></img>
        <span>{town}</span>
      </div>
    </div>
  );
};

export default BriefJobDescription;
