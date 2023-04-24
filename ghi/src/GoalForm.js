import React, {useState} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GoalForm () {
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
            toast("Great job, you've add a goal for today!")
        } else {
            console.error("Could not create goal");
        }
    };

    return (
        <div className="rounded-lg">
            <div className="w-1/2 ml-auto mr-auto mt-3">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="font-bold px-4 py-2 mb-2">New Goal</h1>
                    <form onSubmit={handleSubmit} id="create-goal-form">
                    <div className="form-floating mb-3">
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleGoalChange}
                            value={goal}
                            placeholder="Set Your Daily Goal(s)"
                            required
                            type="text"
                            name="goal"
                            id="goal"
                        />
                    </div>
                    <button className="shadow bg-orange-50 hover:bg-orange-100 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded">Create</button>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                 />

        </div>

    )
}

export default GoalForm;
