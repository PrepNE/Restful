import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { AuthProvider } from "./hooks/useAuth";
import useAuth from "./hooks/useAuth";
import PageLoader from "./components/shared/PageLoader";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/404";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Overview from "./pages/dashboard/Overview";
import Elections from "./pages/dashboard/Elections";
import Home from "./pages/Home";




function AppRoutes() {
  const { user, initialLoading } = useAuth();

  const isAuthenticated = !!user;

  if (initialLoading) {
    return <PageLoader />
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="election" element={<Elections />} />
      </Route>


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
