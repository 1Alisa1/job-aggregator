import { Route, Routes } from "react-router-dom";
import {HomePage} from "./pages/homePage/homePage";
import {FavoritesPage} from "./pages/favoritesPage/favoritesPage";
import {EmptyState} from "./pages/emptyState/emptyState";
import {Layout} from "./components/layout/layout";
import {VacancyPage} from "./pages/vacancyPage/vacancyPage";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="vacancies" element={<HomePage />} />
        <Route path="vacancies/:id" element={<VacancyPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<EmptyState />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
