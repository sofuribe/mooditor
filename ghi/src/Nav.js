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
      <nav className="px-1 text-2xl bg-yellow-200 border-black border-b-4 sticky top-0 z-20">
        <div className="flex justify-between items-center h-16 mx-auto">
          <h1 >
            <Link to="/" className="w-48 p-2 pl-4 text-3xl tracking-wide poppins font-bold">
              mooditor
            </Link>
          </h1>
          <ul className="flex text-xlg body">
            <li className="p-2 hover:text-emerald-800">
              <Link to="/">main page</Link>
            </li>
            <li className="p-2 hover:text-emerald-800">
              <Link to="resources">resources</Link>
            </li>
            <li className="p-2 pr-4 hover:text-emerald-800">
              <Link to="account">login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="px-1 text-2xl bg-yellow-200 border-black border-b-4 sticky top-0 z-20">
        <div className="flex justify-between items-center h-16 mx-auto ">
          <h1>
            <Link to="/home" className="w-48 p-2 pl-4 text-3xl tracking-wide poppins font-bold">
              mooditor
            </Link>
          </h1>
          <ul className="flex text-xlg body">
            <li className="p-2 hover:text-emerald-800">
              <Link to="home">home</Link>
            </li>
            <li className="p-2 hover:text-emerald-800">
              <Link to="entries">all entries</Link>
            </li>
            <li className="p-2 hover:text-emerald-800">
              <Link to="resources">resources</Link>
            </li>
            <li className="p-2 pr-4 hover:text-emerald-800">
              <button onClick={handleLogout}>logout</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
