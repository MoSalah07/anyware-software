import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Pages
import Home from "../pages/Home";
import Dashbaord from "../pages/Dashbaord";
import Announcement from "../pages/Announcement";
import Quiz from "../pages/Quiz";
// Layout
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
// ProtectedAuth
import requireAuth from "../hoc/requireAuth";
import NotFoundPage from "../pages/NotFound";

const ProtectedDashboard = requireAuth(Dashbaord);
const ProtectedQuiz = requireAuth(Quiz);
const ProtectedAnnouncement = requireAuth(Announcement);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<ProtectedDashboard />} />
        <Route path="quiz" element={<ProtectedQuiz />} />
        <Route path="announcement" element={<ProtectedAnnouncement />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);
