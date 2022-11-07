import LoginProgress from "@components/auth/LoginProgress";
import LoginOutlet from "@components/auth/outlet/LoginOutlet";
import { loginStep } from "@utils/auth/routes/LoginOutletComponents";
import UIPreview from "@components/example/layouts/UIPreview";
import PATH from "@utils/routes/PATH";
import { Navigate, Route, Routes } from "react-router-dom";
import CameraTestPage from "@components/example/camera/CameraTestPage";

const UnauthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<LoginProgress />}>
        <Route path=":stepName" element={<LoginOutlet />} />
        <Route path="" element={<Navigate replace to={loginStep[0]} />} />
      </Route>
      <Route path={PATH.CAMERA_TEST} element={<CameraTestPage />} />
      <Route path="ui" element={<UIPreview />} />
      <Route path="*" element={<Navigate replace to={PATH.LOGIN} />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
