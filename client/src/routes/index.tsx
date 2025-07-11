import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Pages
import Home from "../pages/Home";
import Dashbaord from "../pages/Dashbaord";
import Announcement from "../pages/Announcement";
// Layout
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
// ProtectedAuth
import requireAuth from "../hoc/requireAuth";
import Quiz from "../pages/Quiz";

const ProtectedDashboard = requireAuth(Dashbaord);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<ProtectedDashboard />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="announcement" element={<Announcement />} />
      </Route>
      {/* Not Found */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </>
  )
);
