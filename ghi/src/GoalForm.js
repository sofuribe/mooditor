import React, {useState} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GoalForm ({onClose}) {
  const { token } = useToken();

  const [goal, setGoal] = useState("")

  const handleGoalChange = (event) => {
    const value = event.target.value;
    setGoal(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {};

    data.goal = goal;
    data.timestamp = new Date().toISOString();

    const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goals`;
    const fetchConfig = {
      method: "post",
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
      toast("Great job, you've added a goal for today!")
      window.location.reload()
    } else {
      console.error("Could not create goal");
    }
  };

  return (
    <div className="rounded-xl">
        <div className="w-full justify-center px-2">
            <div className="close-button" onClick={onClose}>x</div>
            <h1 className="text-center headers text-2xl px-4 mb-2">New Goal</h1>
            <form onSubmit={handleSubmit} id="create-goal-form">
                <textarea className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    onChange={handleGoalChange}
                    value={goal}
                    placeholder="Set your daily goal"
                    required
                    rows="2"
                    type="text"
                    name="goal"
                    id="goal"
                />
                <div className="text-center">
                    <button className="m-2 shadow bg-orange-400 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded-2xl">Create</button>
                </div>
            </form>
        </div>
    </div>
  )
}
export default GoalForm;
