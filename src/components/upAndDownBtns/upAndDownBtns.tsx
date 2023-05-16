import { useEffect } from "react";
import styles from "./upAndDownBtns.module.scss";

interface UpAndDownBtnsProps {
  value: string;
  setValue(value: string): void;
}

const UpAndDownBtns: React.FC<UpAndDownBtnsProps> = ({value, setValue}) => {
  useEffect(() => {
    if (Number(value) <= 0) {
    setValue('');
  } 
  }, [setValue, value]);
  
  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={() => setValue((Number(value) + 1).toString())}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6667 10L8.52071 6.44626C8.22112 6.18946 7.77904 6.18946 7.47945 6.44626L3.33341 10"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={styles.btn} onClick={() => setValue((Number(value) - 1).toString())}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33325 6L7.47929 9.55374C7.77888 9.81054 8.22096 9.81054 8.52055 9.55374L12.6666 6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default UpAndDownBtns;
