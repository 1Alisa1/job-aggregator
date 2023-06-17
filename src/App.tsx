import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
import { FavoritesPage } from "./pages";
import { EmptyState } from "./pages";
import { Layout } from "./components";
import { VacancyPage } from "./pages";
import { FavoriteVacanciesProvider } from "./context/context";
import { AuthContextProvider } from "./context/authContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <FavoriteVacanciesProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="vacancies" element={<HomePage />} />
              <Route path="vacancies/:id" element={<VacancyPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="404" element={<EmptyState />} />
              <Route path="*" element={<Navigate to="404" />} />
            </Route>
          </Routes>
        </FavoriteVacanciesProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
