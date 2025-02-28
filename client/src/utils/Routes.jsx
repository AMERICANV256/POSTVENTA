import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../components/usuario/Login";
import Estadistica from "../components/Estadistica";
import PrivateRoute from "../components/PrivateRoute";

import { AuthProvider } from "../context/AuthProvider";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/estadistica" element={<Estadistica />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
