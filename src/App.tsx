import "./App.css";
import UnauthenticatedRoutes from "@components/routes/UnauthenticatedRoutes";
import { useEffect, useState } from "react";
import ProtectedRoutes from "@components/routes/ProtectedRoutes";
import useAuth from "@store/auth/useAuth";

function App() {
  // const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const auth = useAuth();
  const { isAuthenticated } = auth;
  const [RoutesComponent, setRoutesComponent] =
    useState<React.ReactElement | null>(null);

  useEffect(() => {
    isAuthenticated && setRoutesComponent(<ProtectedRoutes />);
    !isAuthenticated && setRoutesComponent(<UnauthenticatedRoutes />);
  }, [isAuthenticated]);

  return <div className="min-h-screen">{RoutesComponent}</div>;
}

export default App;
