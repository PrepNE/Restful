import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layout/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Slots from "./pages/dashboard/Slots";
import NotFound from "./pages/404";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <h1 className="text-red-500 font-bold text-5xl items-center text-center">
            Hello World
          </h1>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="slots" element={<Slots />} />
      </Route>

      <Route path="*"  element={<NotFound />}/>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
