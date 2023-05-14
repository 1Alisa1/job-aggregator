import { Link, Outlet } from "react-router-dom";
import logo from "../../img/logo.svg";
import navBtn from "../../img/navBtn.svg";
import styles from "./layout.module.scss";
import Navigation from "../navigation/navigation";

const Layout: React.FC = () => {
  return (
    <>
      <header>
        <div className={styles.headerLogo}>
          <Link to="/vacancies">
            <img src={logo} alt="Jobored"></img>
          </Link>
        </div>
        <div className={styles.headerNav}>
          <Navigation />
        </div>
        <img src={navBtn} alt="navBtn" className={styles.navBtn}></img>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export { Layout };
