import { NavLink } from "react-router-dom";
import styles from "./navigation.module.scss";

const Navigation: React.FC = () => {
  const activeLink = {
    color: "#5E96FC",
  };

  return (
    <nav>
      <div className={styles.vacancies}>
        <NavLink
          to="/vacancies"
          style={({ isActive }) => (isActive ? activeLink : undefined)}
        >
          Поиск вакансий
        </NavLink>
      </div>
      <div className={styles.favorites}>
        <NavLink
          to="/favorites"
          style={({ isActive }) => (isActive ? activeLink : undefined)}
        >
          Избранное
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
