import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop ({children}: {children: React.ReactNode}) {
  const location = useLocation();
  const el = document.getElementById("root");

  useEffect(() => {
    if (el) {
      el.scrollTo(0, 0);
    }
  }, [location, el]);

  return <>{children}</>;
}