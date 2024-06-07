import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ProtectedRoute from "./components/molecules/ProtectedRoute";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Side from "./components/SideBar";
import EventCard from "./components/EventCard";
import SearchBar from "./components/SearchBar";
import OrgPage from "./components/ViewOrg";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/Side" element={<Side />} />
        <Route path="/EventCard" element={<EventCard />} />
        <Route path="/SearchBar" element={<SearchBar />} />
        <Route path="/OrgPage" element={<OrgPage />} />
      </Routes>
    </Router>
  );
}

export default App;
