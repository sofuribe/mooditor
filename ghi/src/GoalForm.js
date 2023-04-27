import React, {useState} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GoalForm ({onClose}) {
    const { token } = useToken();

    const [goal, setGoal] = useState("");
    const [formState, setFormState] = useState("");

    const handleClick = () => {
        setFormState(formState === "create" ? "edit" : "create");
    };

    const handleSubmit = (event, id) => {
        event.preventDefault();
        if (formState === "create") {
            handleCreate(event);
        } else {
            handleUpdate(event, id);
        }
    }

    const handleGoalChange = (event) => {
        const value = event.target.value;
        setGoal(value);
    }

    const handleCreate = async (event) => {
        event.preventDefault()

        const data = {};

        data.goal = goal;
        data.timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });



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
        } else {
            console.error("Could not create goal");
        }
    };

    const handleUpdate = async (event, id) => {
        event.preventDefault()

        const data = {};

        data.goal = goal;
        data.timestamp = new Date().toISOString();

        const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const updateResponse = await fetch(goalUrl, fetchConfig);

        if (updateResponse.ok) {
            await updateResponse.json();
            setGoal("")
            toast("Goal Updated.")
            onClose();
        } else {
            console.error("Could not update goal");
        }
    };

    return (

        <div className="rounded border-yellow-100">
            <div className="w-1/2 ml-auto mr-auto mt-3">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="close-button" onClick={onClose}>x</div>
                    <div className="title">
                        <h1 className="font-bold px-4 py-2 mb-2">
                            {formState === "create" ? "New Goal" : "Edit Goal"}
                        </h1>
                    </div>

                    <form onSubmit={(event, id) => handleSubmit(event, id)} id="create-goal-form">
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
                    <button className="shadow bg-orange-50 hover:bg-orange-100 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded" onClick={handleClick}>
                        {formState === "create" ? "Create" : "Update"}
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GoalForm;
