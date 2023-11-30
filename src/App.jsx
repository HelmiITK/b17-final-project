import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarComponent/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import NotificationPage from "./pages/AccountPage/NotificationPage";
import CoursePage from "./pages/CoursePage/CoursePage";
import NotFound from "./pages/NotfoundPage/NotFound";
import MyCoursePage from "./pages/MyCoursePage/MyCoursePage";
import VideoPage from "./pages/VideoPage/VideoPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import OTPPage from "./pages/OTPPage/OTPPage";
import SuccessBuyPage from "./pages/SuccessBuyPage/SuccessBuyPage";
import ChangePasswordPage from './pages/AccountPage/ChangePasswordPage'
import UserPage from "./pages/AccountPage/UserPage"
import HistoryPayment from "./pages/AccountPage/HistoryPayment"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/mycourse" element={<MyCoursePage />} />
          <Route path="/notif" element={<NotificationPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/changepassword" element={<ChangePasswordPage />} />
          <Route path="/historypayment" element={<HistoryPayment />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/success" element={<SuccessBuyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
