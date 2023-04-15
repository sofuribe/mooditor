import React, {useEffect, useState} from 'react';

function GoalForm () {
    const [goals, setGoals] = useState([])

    const [goal, setGoal] = useState('')

    const handleGoalChange = (event) => {
        const value = event.targe.value;
        setGoal(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}

        data.goal = goal

        const goalUrl = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/goals`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(goalUrl, fetchConfig);
        if (response.ok) {
            const newGoal = await response.json();

            setGoal('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>New Goal</h1>
                    <form onSubmit={handleSubmit} id="create-goal-form">
                    <div className="form-floating mb-3">
                        <textarea onChange={handleGoalChange} value={goal} placeholder="Goal" required type="text" name="goal" id="goal" className="form-control"></textarea>
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