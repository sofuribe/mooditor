import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import * as Components from "./Styles";
import { toast } from "react-toastify";

function LoginSignup() {
  const { login } = useToken();
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.username = username;
    data.email = email;
    data.password = password;
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/users`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      setUsername("");
      setEmail("");
      setPassword("");
      toast("Account created, please login!");
    } else {
      console.error("Could not create user");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    toast("Good to see you back!");
    navigate("/home");
  };

  return (
    <div>
      <div className="modal-dialog modal-lg pt-5" style={{ maxWidth: "900px" }}>
        <div
          className="modal-content mt-5"
          style={{ borderRadius: "25px", height: "800px" }}
        >
          <Components.Container className="modal-body mx-auto p-5">
            <Components.SignUpContainer signinIn={signIn}>
              <Components.Form className="pt-1" onSubmit={handleSignupSubmit}>
                <Components.Title>Sign Up!</Components.Title>
                <Components.Input
                  type="text"
                  placeholder="Username"
                  onChange={handleUsernameChange}
                  value={username}
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <Components.Input
                  type="email"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  value={email}
                />
                <Components.Button
                  className="mt-2"
                  data-bs-dismiss="modal"
                  type="submit"
                >
                  Create Account
                </Components.Button>
                <p className="text-center mt-3 text-muted"></p>
              </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
              <Components.Form onSubmit={handleLoginSubmit}>
                <Components.Title>Login!</Components.Title>
                <Components.Input
                  type="text"
                  placeholder="Username"
                  onChange={handleUsernameChange}
                  value={username}
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <Components.Anchor href="#">
                  Forgot your password?
                </Components.Anchor>
                <Components.Button data-bs-dismiss="modal" type="submit">
                  Login
                </Components.Button>
              </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
              <Components.Overlay signinIn={signIn}>
                <Components.LeftOverlayPanel signinIn={signIn}>
                  <Components.OtherTitle>
                    Already have an account?
                  </Components.OtherTitle>
                  <Components.OtherParagraph>
                    Login here
                  </Components.OtherParagraph>
                  <Components.OtherGhostButton onClick={() => toggle(true)}>
                    Login
                  </Components.OtherGhostButton>
                </Components.LeftOverlayPanel>

                <Components.RightOverlayPanel signinIn={signIn}>
                  <Components.Title>Come Join Us!</Components.Title>
                  <Components.Paragraph>
                    Create an account today!
                  </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(false)}>
                    Sign Up
                  </Components.GhostButton>
                </Components.RightOverlayPanel>
              </Components.Overlay>
            </Components.OverlayContainer>
          </Components.Container>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
