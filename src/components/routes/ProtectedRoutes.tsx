import UIPreview from "@components/example/layouts/UIPreview";
import Home from "@components/home/Home";
import PATH from "@utils/routes/PATH";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />} />
      <Route path="ui" element={<UIPreview />} />
      <Route path="*" element={<Navigate replace to={PATH.HOME} />} />
    </Routes>
  );
};

export default ProtectedRoutes;
