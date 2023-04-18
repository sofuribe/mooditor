import React, { useEffect, useState } from 'react';

function GoalList() {
    const [goals, setGoals] = useState([]);

    const fetchData = async () => {
        const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goals`;
        const response = await fetch(goalUrl);

        if (response.ok) {
            const data = await response.json();
            setGoals(data.goals)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
}