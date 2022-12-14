import "./App.css";
import UnauthenticatedRoutes from "@components/routes/UnauthenticatedRoutes";
import { useEffect, useLayoutEffect, useState } from "react";
import ProtectedRoutes from "@components/routes/ProtectedRoutes";
import useAuth from "@store/auth/useAuth";
import { useLocation } from "react-router-dom";
import PATH from "@utils/routes/PATH";
import CommonTopNav from "@components/common/CommonTopNav";

function App() {
  const auth = useAuth();
  const location = useLocation();

  const { isAuthenticated } = auth;

  const [RoutesComponent, setRoutesComponent] =
    useState<React.ReactElement | null>(null);
  const [hasNav, setHasNav] = useState<boolean>(false);

  useEffect(() => {
    isAuthenticated && setRoutesComponent(<ProtectedRoutes />);
    !isAuthenticated && setRoutesComponent(<UnauthenticatedRoutes />);
  }, [isAuthenticated]);

  useLayoutEffect(() => {
    const pathname = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;

    const OWNING_NAV_PATHNAME_LIST = [PATH.HOME, PATH.CAMERA_TEST, "/ui"].map(
      (path) => (path.endsWith("/") ? path.slice(0, -1) : path)
    );

    const hasNav = OWNING_NAV_PATHNAME_LIST.includes(pathname);
    setHasNav(hasNav);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <header>{hasNav && <CommonTopNav />}</header>
      {RoutesComponent}
    </div>
  );
}

export default App;
