import styles from "./vacancySearchFilter.module.scss";
import { useState } from "react";
import SalaryFilterInput from "../salaryFilterInput/salaryFilterInput";
import SearchCategory from "../searchCategory/searchCategory";
import IndustryFilterInput from "../industryFilterInput/industryFilterInput";
import { useCategories } from "../../hooks/useCategories";
const VacancySearchFilter: React.FC = () => {
  const { loading, response, error } = useCategories();

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
            {loading && <div>Please, stand by</div>}
            {error && <div>Error!</div>}
            {!loading &&
              !error &&
              response &&
              response.map((el) => (
                <div
                  key={el.key}
                  className={styles.option}
                  onClick={() => {
                    setIndustryValue(el.title);
                    setActive(false);
                  }}
                >
                  <span>{el.title}</span>
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
