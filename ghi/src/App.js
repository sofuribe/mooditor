// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import Nav from './Nav';
import SignupForm from "./SignupForm.js";
import LoginForm from "./LoginForm.js";
import GoalForm from "./GoalForm";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`}
      >
        <Nav />
        <Routes>
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="goal" element={<GoalForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
