import { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";

import Auth from "./Auth";
// import TodoList from "./TodoList";
// import TodoForm from "./TodoForm";
import useUser from "./useUser";

import "./App.css";

function App() {
  const { token } = useContext(AuthContext);
  console.log(token)
  const user = useUser(token);
  const { logout } = useToken();

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "80%",
          margin: "auto",
        }}
      >
        {/* <NavLink to="/create-todo">new todo</NavLink> */}
        <NavLink to="my-list/">my list</NavLink>
        {token ? (
          <button onClick={logout}>sign out</button>
        ) : (
          <>
            <NavLink to="/signin">sign in</NavLink>
            <NavLink to="/signup">sign up</NavLink>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        {/* <Route path="/create-todo" element={<TodoForm />} />
        <Route path="/my-list" element={<TodoList />} /> */}
      </Routes>
    </div>
  );
}

export default App;


// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
//       console.log('fastapi url: ', url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])


//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launch_info} />
//     </div>
//   );
// }

// export default App;
