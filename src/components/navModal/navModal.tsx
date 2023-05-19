import Portal from '../portal/portal';
import styles from './navModal.module.scss';

interface NavModalProps {
  active: boolean;
  setActive: (value: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
}

const NavModal: React.FC<NavModalProps> = ({ active, setActive, children }) => {
  return (
    <Portal wrapperElementId="nav-modal-root">
      <div
        className={`${styles.navModalOverlay} ${(active ? styles.active : '')}`}
        onClick={() => setActive(false)}
      >
        <div
          className={`${styles.navModalContent} ${(active ? styles.active : '')}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default NavModal;