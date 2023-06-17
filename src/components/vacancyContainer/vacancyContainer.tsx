import { useEffect, useState } from "react";
import { StarIcon } from "../index";
import { IVacancy } from "../../models";
import { useFavoriteVacanciesContext } from "../../context/context";
import styles from "./vacancyContainer.module.scss";

interface VacancyContainerProps {
  children: React.ReactNode;
  data: IVacancy;
  dataElemStarBtn: string;
}

export const VacancyContainer: React.FC<VacancyContainerProps> = ({
  children,
  data,
  dataElemStarBtn
}) => {
  const { favoriteVacancies, setFavoriteVacancies } =
    useFavoriteVacanciesContext();

  const isFavoriteInitialValue = favoriteVacancies.some((el) => el === data.id);

  const [isFavorite, setIsFavorite] = useState(isFavoriteInitialValue);

  useEffect(() => {
    if (isFavorite) {
      setFavoriteVacancies((prev) =>
        prev.some((el) => el === data.id) ? prev : [...prev, data.id]
      );
    } else {
      setFavoriteVacancies((prev) => prev.filter((el) => el !== data.id));
    }
  }, [isFavorite]);

  return (
    <div className={styles.vacancyContainer}>
      <div
        className={styles.starImg}
        onClick={(e) => {
          e.preventDefault();
          setIsFavorite((prev) => !prev);
        }}
        data-elem={dataElemStarBtn}
      >
        <StarIcon saveVacancy={isFavorite} />
      </div>
      {children}
    </div>
  );
};