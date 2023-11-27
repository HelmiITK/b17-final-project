import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarComponent/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import NotifPage from "./pages/NotifPage/NotifPage";
import UserPage from "./pages/UserPage/UserPage";
import CoursePage from "./pages/CoursePage/CoursePage";
import NotFound from "./pages/NotfoundPage/NotFound";
import MyCoursePage from "./pages/MyCoursePage/MyCoursePage";
import VideoPage from "./pages/VideoPage/VideoPage";

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
          <Route path="/video" element={<VideoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
