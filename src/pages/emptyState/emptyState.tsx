import { useNavigate } from "react-router-dom";
import notFoundImg from "../../img/notFoundImg.svg";
import styles from "./emptyState.module.scss";

export const EmptyState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
  <section className={styles.NotFoundSection}>
    <div className={styles.img}>
      <img src={notFoundImg} alt="NotFound"></img>
    </div>
    <div className={styles.text}>Упс, здесь еще ничего&nbsp;нет!</div>
    <button onClick={() => navigate("/vacancies")}>Поиск вакансий</button>
  </section>
  );
}