import { useEffect, useState } from "react";
import SearchInput from "../../components/searchInput/searchInput";
import VacanciesContainer from "../../components/vacanciesContainer/vacanciesContainer";
import VacanciesSearchFilter from "../../components/vacanciesSearchFilter/vacanciesSearchFilter";
import { useVacancies } from "../../hooks/useVacancies";
import IVacanciesFilter from "../../models/vacanciesFilterModel";
import styles from "./homePage.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import filterIcon from "../../img/filter.svg";

const ITEMS_PER_PAGE = 4;

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

const getPageFromSearchParams = (searchParams: URLSearchParams) => {
  const page = searchParams.get("page");
  return page ? Number(page) - 1 : 0;
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
  const [page, setPage] = useState(getPageFromSearchParams(searchParams));
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (page) {
      queryParams.set("page", (page + 1).toString());
    }

    navigate(`/vacancies?${queryParams}`);
  }, [filter, keyword, page]);

  const { loading, response, error } = useVacancies(
    filter,
    keyword,
    ITEMS_PER_PAGE,
    page
  );

  let total = response?.total ?? 0;

  if (total > 500) {
    total = 500;
  }

  const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

  if (response && page + 1 > pageCount) {
    navigate("/404");
  }

  useEffect(() => {
    if (response?.objects.length === 0) {
      navigate("/404");
    }
  }, [response?.objects]);

  const resetAllSearchParams = () => {
    setFilter({});
    setKeyword("");
    setPage(0);
  };

  const handleKeywordChange = (newKeyword: string) => {
    setKeyword(newKeyword);

    if (keyword !== newKeyword) {
      setPage(0);
    }
  };

  const handleFilterChange = (newFilter: IVacanciesFilter) => {
    setFilter(newFilter);

    if (
      filter.industryKey !== newFilter.industryKey ||
      filter.paymentFrom !== newFilter.paymentFrom ||
      filter.paymentTo !== newFilter.paymentTo
    ) {
      setPage(0);
    }
  };

  return (
    <section className={styles.vacanciesSection}>
      <div className={styles.filterContainer}>
        <VacanciesSearchFilter
          filter={filter}
          setFilter={handleFilterChange}
          handleResetAll={resetAllSearchParams}
        />
      </div>
      <div className={styles.vacanciesContainer}>
        <div className={styles.searchOptions}>
          <div className={styles.optionsBtn}>
            <img
              src={filterIcon}
              alt="filter"
              onClick={() => setIsModalOpen(true)}
            ></img>
          </div>
          <SearchInput keyword={keyword} setKeyword={handleKeywordChange} />
        </div>
        <div className={styles.wrapper}>
          {loading && <Loader />}
          {error && <div>Error!</div>}
          {!loading && !error && response && (
            <VacanciesContainer
              vacancies={response.objects}
              itemsPerPage={ITEMS_PER_PAGE}
              pageCount={pageCount}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </div>
      <Modal
        active={isModalOpen}
        setActive={setIsModalOpen}
        wrapperElementId="modal-root"
        modalOverlayClass={styles.filterModalOverlay}
        modalActiveClass={styles.activeModal}
      >
        <VacanciesSearchFilter
          filter={filter}
          setFilter={handleFilterChange}
          handleResetAll={resetAllSearchParams}
          setActiveModal={setIsModalOpen}
        />
      </Modal>
    </section>
  );
};

export { HomePage };
