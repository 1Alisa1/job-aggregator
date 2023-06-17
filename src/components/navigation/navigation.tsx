import { NavLink } from "react-router-dom";
import styles from "./navigation.module.scss";

interface NavigationProps {
  setActiveModal?: (value: React.SetStateAction<boolean>) => void;
}

export const Navigation: React.FC<NavigationProps> = ({setActiveModal}) => {
  const activeLink = {
    color: "#5E96FC",
  };

  const handleClick = () => {
    if (setActiveModal) {
      setActiveModal(false);
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.vacancies}>
        <NavLink
          to="/vacancies"
          style={({ isActive }) => (isActive ? activeLink : undefined)}
          onClick={handleClick}
        >
          Поиск вакансий
        </NavLink>
      </div>
      <div className={styles.favorites}>
        <NavLink
          to="/favorites"
          style={({ isActive }) => (isActive ? activeLink : undefined)}
          onClick={handleClick}
        >
          Избранное
        </NavLink>
      </div>
    </nav>
  );
};