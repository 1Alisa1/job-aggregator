import Portal from "../portal/portal";
import styles from "./modal.module.scss";

interface ModalProps {
  active: boolean;
  setActive: (value: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
  wrapperElementId: string;
  modalOverlayClass?: string;
  modalContentClass?: string;
  modalActiveClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  active,
  setActive,
  children,
  wrapperElementId,
  modalOverlayClass,
  modalContentClass,
  modalActiveClass,
}) => {
  return (
    <Portal wrapperElementId={wrapperElementId}>
      <div
        className={`${styles.modalOverlay} ${modalOverlayClass} ${
          active ? modalActiveClass : ""
        }`}
        onClick={() => setActive(false)}
      >
        <div
          className={`${styles.modalContent} ${modalContentClass} ${
            active ? modalActiveClass : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.closeBtn} onClick={() => setActive(false)}>
            <span>+</span>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
