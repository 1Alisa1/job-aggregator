import { useEffect, useState } from "react";
import SearchInput from "../../components/searchInput/searchInput";
import VacanciesContainer from "../../components/vacanciesContainer/vacanciesContainer";
import VacancySearchFilter from "../../components/vacancySearchFilter/vacancySearchFilter";
import { useVacancies } from "../../hooks/useVacancies";
import IVacanciesFilter from "../../models/vacanciesFilterModel";
import styles from "./homePage.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

const getFilterFromSearchParams = (
  searchParams: URLSearchParams
): IVacanciesFilter => {
  const industryKey = searchParams.get("industryKey");
  const paymentFrom = searchParams.get("paymentFrom");
  const paymentTo = searchParams.get("paymentTo");

  return {
    industryKey: industryKey ? Number(industryKey) : undefined,
    paymentFrom: paymentFrom ? Number(paymentFrom) : undefined,
    paymentTo: paymentTo ? Number(paymentTo) : undefined,
  };
};

const getKeywordFromSearchParams = (searchParams: URLSearchParams) => {
  return searchParams.get("keyword") ?? "";
};

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(
    getKeywordFromSearchParams(searchParams)
  );

  const [filter, setFilter] = useState<IVacanciesFilter>(
    getFilterFromSearchParams(searchParams)
  );

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filter.industryKey) {
      queryParams.set("industryKey", filter.industryKey.toString());
    }

    if (filter.paymentFrom) {
      queryParams.set("paymentFrom", filter.paymentFrom.toString());
    }

    if (filter.paymentTo) {
      queryParams.set("paymentTo", filter.paymentTo.toString());
    }

    if (keyword) {
      queryParams.set("keyword", keyword);
    }

    navigate(`/vacancies?${queryParams}`);
  }, [filter, keyword]);

  const { loading, response, error } = useVacancies(filter, keyword);

  useEffect(() => {
    if (response?.objects.length === 0) {
      navigate("/404");
    }
  }, [response?.objects]);

  const resetAllSearchParams = () => {
    setFilter({});
    setKeyword("");
  };

  return (
    <section className={styles.vacanciesSection}>
      <div className={styles.filterContainer}>
        <VacancySearchFilter
          filter={filter}
          setFilter={setFilter}
          handleResetAll={resetAllSearchParams}
        />
      </div>
      <div className={styles.vacanciesContainer}>
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
        {loading && <div>Please, stand by</div>}
        {error && <div>Error!</div>}
        {!loading && !error && response && (
          <VacanciesContainer vacancies={response} />
        )}
      </div>
    </section>
  );
};

export { HomePage };
