import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/login";
import LandingPage from "./pages/public/landingPage";
import { useAuth } from "./contexts/authContext";
import ProtectedRoutes from "./pages/protected/protectedRoutes";
import HomePage from "./pages/protected/homePage";

const App = () => {
  const { user, token } = useAuth();
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="home"
        element={
          <ProtectedRoutes token={token} redirectPath="/login">
            <HomePage user={user} />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default App;
