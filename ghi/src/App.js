// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import MainPage from "./MainPage";
import Nav from "./Nav";
import SignupForm from "./SignupForm.js";
import LoginForm from "./LoginForm.js";
import Footer from "./Footer";
import GoalForm from "./GoalForm";
import Calendar from "./CalendarUI";
import EntriesList from './EntriesList';
import LoggedInHome from './LoggedInHome';
import LoginSignup from "./LoginSignupForm";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`}
      >
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="entries" element={<EntriesList />} />
          <Route path="goal" element={<GoalForm />} />
          <Route path="home" element={<LoggedInHome />} />
          <Route path="account" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
