import React, {useState} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateForm ({onClose, id}) {
    const { token } = useToken();

    const [goal, setGoal] = useState("");

    const handleGoalChange = (event) => {
        const value = event.target.value;
        setGoal(value);
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      const data = {};

      data.goal = goal;

      const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;
      const fetchConfig = {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(goalUrl, fetchConfig);

      if (response.ok) {
        await response.json();
        setGoal("");

        window.location.reload()
        toast("Goal Updated.")
      } else {
        console.error("Could not create goal");
      }
    };

  return (
    <div className="rounded-lg">
      <div className="w-1/2 ml-auto mr-auto mt-3">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="close-button" onClick={onClose}>x</div>
          <h1 className="font-bold px-4 py-2 mb-2">Edit Goal</h1>
          <form onSubmit={handleSubmit} id="update-goal-form">
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleGoalChange}
              value={goal}
              placeholder="Goal..."
              required
              type="text"
              name="goal"
              id="goal"
            />
            <input className="shadow bg-orange-50 hover:bg-orange-100 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded" type="submit" value="update" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateForm;