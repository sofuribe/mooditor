import {useEffect, useState} from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import Calendar from './CalendarUI';
import { Link } from "react-router-dom";
import GoalList from './GoalList';

function LoggedInHome(){
    const { token } = useToken();

    //to reach username
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data.account);
        }
    };

        fetchUserData();
    }, [token]);

    if (token){
        return (
            <>
            <div className='shadow-xl headers h-20 mt-12 bg-gradient-to-l from-cyan-500 to-yellow-300 rounded-md text-black max-w-screen-lg mx-auto px-8 text-4xl flex justify-center items-center'>
                Welcome, {user.username}!
            </div>

            <div className="border-4 border-yellow-100 rounded-md shadow-2xl relative mx-48 my-8">

                <div className="flex">

                {/* entry form */}
                    <div className= "md:w-1/2">
                        <div className= " text-3xl flex justify-center items-center pt-8 pb-6">
                            How are you feeling today?
                        </div>
                            <div className= "my-6">
                                <div className="text-xl flex justify-center items-center">
                                    Complete your daily entry
                                </div>
                                <div className="flex justify-center items-center pt-4">
                                    <Link to="">
                                        <button className="bg-orange-400 hover:bg-orange-500 text-black py-2 px-4 rounded-full">Daily Entry</button>
                                    </Link>
                                </div>
                            </div>
                    </div>

                    {/* goals */}
                    <div className= "md:w-1/2 pt-8 mx-4">
                        <div>
                            <GoalList />
                        </div>
                    </div>
                </div>

                {/* calendar */}
                <div className="border-4 border-r-0 border-l-0 border-b-0 border-yellow-100 m-8">
                    <div className="header text-4xl flex justify-center items-center pt-8">Your Calendar</div>
                    <div className="pb-10 mx-4">
                        <Calendar />
                    </div>
                </div>
            </div>
        </>
        )
    }
}
export default LoggedInHome;