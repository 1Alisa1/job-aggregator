import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export {Layout};
