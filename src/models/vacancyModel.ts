interface IVacancy {
  id: number;
  payment_from: number;
  payment_to: number;
  profession: string;
  town: {
    title: string;
  };
  type_of_work: {
    title: string;
  };
  currency: string;
  vacancyRichText: string;
}

export default interface IVacanciesResponse {
  objects: IVacancy[];
  total: number;
}