import { useState } from "react";
import { SalaryFilterInput } from "../index";
import { SearchCategory } from "../index";
import { IndustryFilterInput } from "../index";
import { Categories } from "../index";
import { useCategories } from "../../hooks";
import { IVacanciesFilter } from "../../models";
import styles from "./vacanciesSearchFilter.module.scss";

interface VacanciesSearchFilterProps {
  filter: IVacanciesFilter;
  setFilter: (value: IVacanciesFilter) => void;
  handleResetAll: () => void;
  setActiveModal?: (value: React.SetStateAction<boolean>) => void;
}

export const VacanciesSearchFilter: React.FC<VacanciesSearchFilterProps> = ({
  filter,
  setFilter,
  handleResetAll,
  setActiveModal,
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
    if (setActiveModal) {
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
          <div className={styles.input}>
            <IndustryFilterInput
              value={industryValue?.title ?? ""}
              setActive={setActive}
              active={active}
              dataElem="industry-select"
            />
          </div>
          <Categories
            active={active}
            setActive={setActive}
            loading={loading}
            error={error}
            categories={response}
            setIndustryValue={setIndustryValue}
          />
        </SearchCategory>
        <SearchCategory name="Оклад">
          <div className={styles.input}>
            <SalaryFilterInput
              placeholder="От"
              value={paymentFrom}
              setValue={setPaymentFrom}
              dataElem="salary-from-input"
            />
          </div>
          <div className={styles.input}>
            <SalaryFilterInput
              placeholder="До"
              value={paymentTo}
              setValue={setPaymentTo}
              dataElem="salary-to-input"
            />
          </div>
        </SearchCategory>
        <button
          className={styles.btnApply}
          onClick={handleApplyButtonClick}
          data-elem="search-button"
        >
          Применить
        </button>
      </div>
    </div>
  );
};