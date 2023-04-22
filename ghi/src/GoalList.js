import React, { useEffect, useState } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import './GoalList.css';

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
        } else {
            console.error("Could not delete goal");
        }
    };

    // const handleComplete = async (id) => {
    //     const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;
    //     const response = await fetch(goalUrl,
    //         { method: 'put',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({isCompleted: true})
    //         });
    //     if (response.ok) {
    //         const copyGoals = [...goals];
    //         const filteredGoals = copyGoals.filter()
    //     }
    // }

    const handleCheckboxChange = async (event, id, goal) => {
        const isCompleted = event.target.checked;
        const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;

        let payload = { id: id, is_completed: isCompleted };
        if (!isCompleted) {
            payload.goal = goal;
        }

        const fetchConfig = {
            method: "put",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await fetch(goalUrl, fetchConfig);
            if (response.ok) {
            const data = await response.json();
            setGoals(goals.map(goal => {
                if (goal.id === id) {
                return { ...goal, is_completed: data.is_completed };
                } else {
                return goal;
                }
            }));
            } else {
            console.error("Could not update goal!");
            }
        } catch (error) {
            console.error("Failed to fetch goal update:", error);
        }

    };


    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Goals of the day</th>
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