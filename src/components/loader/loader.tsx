import styles from "./loader.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};