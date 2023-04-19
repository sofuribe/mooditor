import React, { useEffect, useState } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

function GoalList() {
    const { token } = useToken();

    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goals`;
            const fetchConfig = {
                method: "put",
                header: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const response = await fetch(goalUrl);

            if (response.ok) {
                const data = await response.json();
                setGoals(data.goals)
            }
    }
    })



    async function deleteGoal(goal) {
        const cancelUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/`
    }

    return (
        <>

        </>
    )
}

export default GoalList;