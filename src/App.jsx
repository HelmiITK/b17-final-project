import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarComponent/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import NotifPage from "./pages/AccountPage/NotifPage";
import UserPage from "./pages/AccountPage/UserPage";
import CoursePage from "./pages/CoursePage/CoursePage";
import NotFound from "./pages/NotfoundPage/NotFound";
import MyCoursePage from "./pages/MyCoursePage/MyCoursePage";
import VideoPage from "./pages/VideoPage/VideoPage";
import ChangePasswordPage from "./pages/AccountPage/ChangePasswordPage";
import HistoryPayment from "./pages/AccountPage/HistoryPayment";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/mycourse" element={<MyCoursePage />} />
          <Route path="/notif" element={<NotifPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/changepassword" element={<ChangePasswordPage />} />
          <Route path="/historypayment" element={<HistoryPayment />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
