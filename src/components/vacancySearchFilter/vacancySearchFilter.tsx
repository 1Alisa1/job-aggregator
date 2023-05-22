import styles from "./vacancySearchFilter.module.scss";
import { useState } from "react";
import SalaryFilterInput from "../salaryFilterInput/salaryFilterInput";
import SearchCategory from "../searchCategory/searchCategory";
import IndustryFilterInput from "../industryFilterInput/industryFilterInput";
import { useCategories } from "../../hooks/useCategories";
import IVacanciesFilter from "../../models/vacanciesFilterModel";
import Loader from "../loader/loader";

interface VacancySearchFilterProps {
  filter: IVacanciesFilter;
  setFilter: (value: IVacanciesFilter) => void;
  handleResetAll: () => void;
  setActiveModal?: (value: React.SetStateAction<boolean>) => void;
}

const VacancySearchFilter: React.FC<VacancySearchFilterProps> = ({
  filter,
  setFilter,
  handleResetAll,
  setActiveModal
}) => {
  const { loading, response, error } = useCategories();

  const category = response
    ? response?.find((el) => el.key === filter.industryKey)
    : undefined;

  const [active, setActive] = useState(false);

  const [industryValue, setIndustryValue] = useState(category);
  const [paymentFrom, setPaymentFrom] = useState(
    filter.paymentFrom?.toString() ?? ""
  );
  const [paymentTo, setPaymentTo] = useState(
    filter.paymentTo?.toString() ?? ""
  );

  const resetAllHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIndustryValue(undefined);
    setPaymentFrom("");
    setPaymentTo("");
    handleResetAll();
  };

  const handleApplyButtonClick = () => {
    setFilter({
      industryKey: industryValue ? Number(industryValue.key) : undefined,
      paymentFrom: paymentFrom ? Number(paymentFrom) : undefined,
      paymentTo: paymentTo ? Number(paymentTo) : undefined,
    });
    if(setActiveModal) {
      setActiveModal(false);
    }
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
              value={industryValue?.title ?? ""}
              setActive={setActive}
              active={active}
            />
          </div>
          <div
            className={
              active ? `${styles.options} ${styles.show}` : styles.options
            }
          >
            {loading && <Loader />}
            {error && <div>Error!</div>}
            {!loading &&
              !error &&
              response &&
              response.map((el) => (
                <div
                  key={el.key}
                  className={styles.option}
                  onClick={() => {
                    setIndustryValue(el);
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
              value={paymentFrom}
              setValue={setPaymentFrom}
            />
          </div>
          <div className={styles.selector}>
            <SalaryFilterInput
              placeholder="До"
              value={paymentTo}
              setValue={setPaymentTo}
            />
          </div>
        </SearchCategory>
        <button className={styles.btnApply} onClick={handleApplyButtonClick}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default VacancySearchFilter;
