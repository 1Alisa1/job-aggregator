import { useEffect, useState } from "react";
import StarIcon from "../starIcon/starIcon";
import styles from "./vacancyContainer.module.scss";
import { IVacancy } from "../../models/vacancyModel";
import { useFavoriteVacanciesContext } from "../../context/context";

interface VacancyContainerProps {
  children: React.ReactNode;
  data: IVacancy;
}

const VacancyContainer: React.FC<VacancyContainerProps> = ({
  children,
  data,
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
      >
        <StarIcon saveVacancy={isFavorite} />
      </div>
      {children}
    </div>
  );
};

export default VacancyContainer;
