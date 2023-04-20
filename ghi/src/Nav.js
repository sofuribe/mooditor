import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const { token } = useToken();
  const { logout } = useToken();

  const navigate = useNavigate();
  const handleLogout = async (event) => {
    event.preventDefault();
    await logout();
    navigate("/");
  };

  if (!token) {
    return (
      <nav className="px-1 py- text-2xl bg-orange-200 sticky top-0">
        <div className="flex justify-between items-center h-16 mx-auto ">
          <h1>
            <Link to="/">
              <img className="w-48 pl-4" src="img/mooditor.png" alt="logo" />
            </Link>
          </h1>
          <ul className="flex text-xlg">
            <li className="p-2 hover:text-emerald-800 hover:underline">
              <Link to="/">main page</Link>
            </li>
            <li className="p-2 hover:text-emerald-800 hover:underline">
              <Link to="account">login</Link>
            </li>
            {/* <li className="p-2 pr-4 hover:text-emerald-800 hover:underline">
              <Link to="signup">sign up</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="px-4 py-4 text-2xl">
        <div className="rounded-full border-2 border-black flex justify-between items-center h-16 mx-auto bg-stone-50 ">
          <h1>
            <img className="w-32 p-2 pl-4" src="img/mooditor.png" alt="logo" />
          </h1>
          <ul className="flex text-xlg">
            <li className="p-2 hover:text-blue-900">home</li>
            <li className="p-2 hover:text-blue-900">
              <Link to="entries">all entries</Link>
            </li>
            <li className="p-2 pr-4 hover:text-blue-900">
              <button onClick={handleLogout}>logout</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
