import { useState } from 'react';
import StarIcon from '../starIcon/starIcon';
import styles from './vacancyContainer.module.scss';

interface VacancyContainerProps {
  children: React.ReactNode;
}

const VacancyContainer: React.FC<VacancyContainerProps> = ({children}) => {
  const [saveVacancy, setSaveVacancy] = useState(false);

  return (
    <div className={styles.vacancyContainer}>
      <div className={styles.starImg} onClick={() => setSaveVacancy(!saveVacancy)}>
        <StarIcon saveVacancy={saveVacancy}/>
      </div>
      {children}
    </div>
  );
}

export default VacancyContainer;