import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/NavbarComponent/Navbar";
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
import ChangePasswordPage from "./pages/AccountPage/ChangePasswordPage";
import UserPage from "./pages/AccountPage/UserPage";
import HistoryPayment from "./pages/AccountPage/HistoryPayment";
import BuyPage from "./pages/BuyPage/BuyPage";
import Footer from "./components/FooterComponent/Footer";
import CourseDetail from "./pages/CourseDetailPage/CourseDetail";
import NoAccessToken from "./security/NoAccessToken";
import Protected from "./security/Protected";
import SendEmail from "./pages/ResetPassword/SendEmail";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course-detail/:courseId" element={<CourseDetail />} />
          <Route path="/course" element={<CoursePage />} />
          <Route
            path="/mycourse"
            element={
              <Protected>
                <MyCoursePage />
              </Protected>
            }
          />
          <Route
            path="/notif"
            element={
              <Protected>
                <NotificationPage />
              </Protected>
            }
          />
          <Route
            path="/user"
            element={
              <Protected>
                <UserPage />
              </Protected>
            }
          />
          <Route
            path="/changepassword"
            element={
              <Protected>
                <ChangePasswordPage />
              </Protected>
            }
          />
          <Route
            path="/historypayment"
            element={
              <Protected>
                <HistoryPayment />
              </Protected>
            }
          />
          <Route
            path="/course-detail/:courseId/video/:materialId"
            element={
              <Protected>
                <VideoPage />
              </Protected>
            }
          />
          <Route
            path="/login"
            element={
              <NoAccessToken>
                <LoginPage />
              </NoAccessToken>
            }
          />
          <Route
            path="/register"
            element={
              <NoAccessToken>
                <RegisterPage />
              </NoAccessToken>
            }
          />
          <Route
            path="/otp"
            element={
              <NoAccessToken>
                <OTPPage />
              </NoAccessToken>
            }
          />
          <Route
            path="/verify-email"
            element={
              // <Protected>
              <SendEmail />
              //</Protected>
            }
          />
          <Route
            path="/reset-password"
            element={
              // <Protected>
              <ResetPassword />
              //</Protected>
            }
          />
          <Route path="/success" element={<SuccessBuyPage />} />
          <Route path="/payment" element={<BuyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
