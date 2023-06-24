import styles from "./briefJobDescription.module.scss";
import location from "../../img/location.svg";

const showSalary = (
  payment_from: number,
  payment_to: number,
  currency: string
) => {
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

  return salary;
};

interface BriefJobDescriptionProps {
  title: string;
  payment_from: number;
  payment_to: number;
  schedule: string;
  town: string;
  currency: string;
  isDetail: boolean;
}

export const BriefJobDescription: React.FC<BriefJobDescriptionProps> = ({
  title,
  payment_from,
  payment_to,
  schedule,
  town,
  currency,
  isDetail,
}) => {
  return (
    <div
      className={
        isDetail
          ? `${styles.shortDescription} ${styles.shortDescriptionDetail}`
          : styles.shortDescription
      }
    >
      <div
        className={
          isDetail ? `${styles.title} ${styles.titleDetail}` : styles.title
        }
      >
        {title}
      </div>
      <div className={styles.salaryAndSchedule}>
        <div
          className={
            isDetail ? `${styles.salary} ${styles.salaryDetail}` : styles.salary
          }
        >
          з/п {showSalary(payment_from, payment_to, currency)}
        </div>
        <div className={styles.dot}>•</div>
        <div
          className={
            isDetail
              ? `${styles.schedule} ${styles.sheduleDetail}`
              : styles.schedule
          }
        >
          {schedule}
        </div>
      </div>
      <div className={styles.town}>
        <img src={location} alt="location"></img>
        <span>{town}</span>
      </div>
    </div>
  );
};
