import { Link, Outlet } from "react-router-dom";
import logo from "../../img/logo.svg";
import navBtn from "../../img/navBtn.svg";
import styles from "./layout.module.scss";
import Navigation from "../navigation/navigation";
import NavModal from "../navModal/navModal";
import { useState } from "react";

const Layout: React.FC = () => {
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
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
        <img src={navBtn} alt="navBtn" className={styles.navBtn} onClick={() => setIsNavModalOpen(true)}></img>
        <NavModal active={isNavModalOpen} setActive={setIsNavModalOpen}>
            <div className={styles.x} onClick={() => setIsNavModalOpen(false)}>
              <span>+</span>
            </div>
            <Navigation setActiveModal={setIsNavModalOpen}/>
        </NavModal>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export { Layout };
