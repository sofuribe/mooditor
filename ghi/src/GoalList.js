import React, { useEffect, useState } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { ToastContainer, toast } from 'react-toastify';

function GoalList() {
    const { token } = useToken();

    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goals`;
                const fetchConfig = {
                    method: "get",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await fetch(goalUrl, fetchConfig);

                if (response.ok) {
                    const data = await response.json();
                    setGoals(data);
                }
            }
        }
        fetchData();
    }, [token]);

    const handleDelete = async (id) => {
        const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(goalUrl, fetchConfig);

        if (response.ok) {

            setGoals(goals.filter(goal => goal.id !== id));
            toast("Goal Deleted!")
        } else {
            console.error("Could not delete goal");
        }
    };

    const handleCheckboxChange = async (event, id) => {
        const isCompleted = event.target.checked ? true : false;
        const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;

        // GET the goal with matching id
        const response = await fetch (goalUrl, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Could not retrieve goal");
            return;
        }

        const goal = await response.json();

        // UPDATE the is_completed
        const updateUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify({ goal: goal.goal, is_completed: isCompleted}),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const updateResponse = await fetch(updateUrl, fetchConfig);

        if (updateResponse.ok) {
            const updateData = await updateResponse.json();
            setGoals(goals.map((goal) => {
                if(goal.id === id) {
                    return { ...goal, is_completed: updateData.is_completed};
                } else {
                    return goal;
                }

            }));
            toast("Congrats! Goal Completed.")
        } else {
            console.error("Could not update goal")
        }
    };


    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>My Daily Goals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals.map(goal => {
                            return (
                                <tr key={goal.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={goal.isCompleted}
                                            onChange={(event) => handleCheckboxChange(event, goal.id)}
                                        />

                                    </td>
                                    <td className={goal.isCompleted ? 'completed' : ''}>{goal.goal}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(goal.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default GoalList;