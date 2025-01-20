import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../components/usuario/Login";

import { AuthProvider } from "../context/AuthProvider";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
