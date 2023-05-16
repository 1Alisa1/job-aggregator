import styles from "./vacancySearchFilter.module.scss";
import { useState } from "react";
import SalaryFilterInput from "../salaryFilterInput/salaryFilterInput";
import SearchCategory from "../searchCategory/searchCategory";
import IndustryFilterInput from "../industryFilterInput/industryFilterInput";

const VacancySearchFilter: React.FC = () => {
  const arr = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [active, setActive] = useState(false);
  const [industryValue, setIndustryValue] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [finalValue, setFinalValue] = useState("");

  const resetAllHandler = () => {
    setIndustryValue("");
    setInitialValue("");
    setFinalValue("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterHeader}>
        <div className={styles.title}>Фильтры</div>
        <div className={styles.reset} onClick={resetAllHandler}>
          Сбросить все
          <div className={styles.x}>
            <span>+</span>
          </div>
        </div>
      </div>
      <div className={styles.filter}>
        <SearchCategory name="Отрасль">
          <div className={styles.selector}>
            <IndustryFilterInput
              value={industryValue}
              setActive={setActive}
              active={active}
            />
          </div>
          <div
            className={
              active ? `${styles.options} ${styles.show}` : styles.options
            }
          >
            {arr.map((el) => (
              <div
                key={el}
                className={styles.option}
                onClick={() => {
                  setIndustryValue(el);
                  setActive(false);
                }}
              >
                <span>вариант {el}</span>
              </div>
            ))}
          </div>
        </SearchCategory>
        <SearchCategory name="Оклад">
          <div className={styles.selector}>
            <SalaryFilterInput
              placeholder="От"
              value={initialValue}
              setValue={setInitialValue}
            />
          </div>
          <div className={styles.selector}>
            <SalaryFilterInput
              placeholder="До"
              value={finalValue}
              setValue={setFinalValue}
            />
          </div>
        </SearchCategory>
        <button className={styles.btnApply}>Применить</button>
      </div>
    </div>
  );
};

export default VacancySearchFilter;
