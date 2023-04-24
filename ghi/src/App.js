// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import MainPage from "./MainPage";
import Nav from "./Nav";
import Footer from "./Footer";
import GoalForm from "./GoalForm";
import Calendar from "./CalendarUI";
import EntriesList from './EntriesList';
import GoalList from "./GoalList";
import LoggedInHome from './LoggedInHome';
import LoginSignup from "./LoginSignupForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
          <Route path="entries" element={<EntriesList />} />
          <Route path="goal" element={<GoalForm />} />
          <Route path="list" element={<GoalList />} />
          <Route path="home" element={<LoggedInHome />} />
          <Route path="account" element={<LoginSignup />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
         />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
