import React, {useState} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';


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
        } else {
            console.error("Could not create goal");
        }
    };

    return (
        <div className="row min-h-screen">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>New Goal</h1>
                    <form onSubmit={handleSubmit} id="create-goal-form">
                    <div className="form-floating mb-3">
                        <textarea
                            onChange={handleGoalChange}
                            value={goal}
                            placeholder="Goal"
                            required
                            type="text"
                            name="goal"
                            id="goal"
                            className="form-control"
                        />
                        <label htmlFor="goal">Goal</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GoalForm;
