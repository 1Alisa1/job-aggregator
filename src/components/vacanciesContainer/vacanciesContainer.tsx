import { Link } from "react-router-dom";
import { IVacancy } from "../../models/vacancyModel";
import BriefJobDescription from "../briefJobDescription/briefJobDescription";
import VacancyContainer from "../vacancyContainer/vacancyContainer";
import styles from "./vacanciesContainer.module.scss";
import ReactPaginate from "react-paginate";
import up from "../../img/up.svg";
import down from "../../img/down.svg";
import ArrowIcon from "../arrowIcon/arrowIcon";

interface VacanciesContainerProps {
  vacancies: IVacancy[];
  itemsPerPage: number;
  pageCount: number;
  page: number;
  setPage(value: number): void;
}

const VacanciesContainer: React.FC<VacanciesContainerProps> = ({
  vacancies,
  itemsPerPage,
  pageCount,
  page,
  setPage,
}) => {
  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected);
  };

  return (
    <>
      <div className={styles.vacanciesContainer}>
        {vacancies.map((el) => (
          <Link
            to={`/vacancies/${el.id}`}
            state={el}
            key={el.id}
            data-elem={`vacancy-${el.id}`}
          >
            <VacancyContainer
              data={el}
              dataElemStarBtn={`vacancy-${el.id}-shortlist-button`}
            >
              <BriefJobDescription
                title={el.profession}
                payment_from={el.payment_from}
                payment_to={el.payment_to}
                schedule={el.type_of_work.title}
                town={el.town.title}
                currency={el.currency}
                isDetail={false}
              />
            </VacancyContainer>
          </Link>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowIcon deg={270} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={<ArrowIcon deg={90} />}
        renderOnZeroPageCount={null}
        forcePage={page}
        containerClassName={styles.pagination}
        pageClassName={styles.pageNum}
        previousClassName={styles.pageNum + (" " + styles.arrow)}
        nextClassName={styles.pageNum + (" " + styles.arrow)}
        disabledClassName={styles.disabled}
        activeClassName={styles.active}
      />
    </>
  );
};

export default VacanciesContainer;
