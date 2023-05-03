import {useEffect, useState} from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Calendar from './CalendarUI';
import { Link } from "react-router-dom";
import GoalList from './GoalList';
import './fonts.css';

function LoggedInHome(){
    const { token } = useAuthContext();

    const [user, setUser] = useState()

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
        if (token){
            fetchUserData();
        }
    }, [token]);

    if (token && user){
        return (
            <>
                <div className='shadow-xl tracking-wide poppins font-bold h-20 mt-12 rounded-2xl text-black max-w-screen-lg mx-auto px-8 text-4xl flex justify-center items-center bg-cover' style={{backgroundImage: `url('img/bg.png')`}}>
                    Welcome, {user.username}!
                </div>
                <div className="entry-form border-4 border-yellow-100 rounded-xl shadow-lg relative mx-48 my-8">
                    <div className= "tracking-wide poppins font-bold text-3xl flex justify-center items-center pt-8 pb-2">
                        How are you feeling today?
                    </div>
                        <div className= "my-2">
                            <div className=" text-xl flex justify-center items-center">
                                Complete your daily entry
                            </div>
                            <div className="flex justify-center items-center py-4">
                                <Link to="/entry">
                                    <button className="bg-orange-400 hover:bg-orange-500 text-black py-2 px-4 rounded-full">Daily Entry</button>
                                </Link>
                            </div>
                        </div>
                </div>
                <div className= "goals-list headers border-4 border-yellow-100 rounded-2xl shadow-lg relative mx-48 my-8">
                    <div className="pt-8 pb-2">
                       <div className="tracking-wide poppins font-bold text-3xl flex justify-center items-center pb-2">Daily Goals</div>
                        <GoalList />
                    </div>
                </div>
                <div className="calendar border-4 border-yellow-100 rounded-2xl shadow-2xl mx-48 my-8 md:mb-24">
                    <div className="m-7">
                        <div className="tracking-wide poppins font-bold text-3xl flex justify-center items-center pt-4">Your Calendar</div>
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
