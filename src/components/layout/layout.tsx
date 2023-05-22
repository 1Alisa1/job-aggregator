import { Link, Outlet } from "react-router-dom";
import logo from "../../img/logo.svg";
import navBtn from "../../img/navBtn.svg";
import styles from "./layout.module.scss";
import Navigation from "../navigation/navigation";
import { useState } from "react";
import Modal from "../modal/modal";

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
        <img
          src={navBtn}
          alt="navBtn"
          className={styles.navBtn}
          onClick={() => setIsNavModalOpen(true)}
        ></img>
        <Modal
          active={isNavModalOpen}
          setActive={setIsNavModalOpen}
          wrapperElementId="nav-modal-root"
          modalOverlayClass={styles.navModalOverlay}
          modalContentClass={styles.navModalContent}
          modalActiveClass={styles.activeModal}
        >
          <Navigation setActiveModal={setIsNavModalOpen} />
        </Modal>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export { Layout };
