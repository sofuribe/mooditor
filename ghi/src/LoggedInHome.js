import {useEffect, useState} from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import Calendar from './CalendarUI';
import { Link } from "react-router-dom";

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
            console.log(data)
        }
    };

        fetchUserData();
    }, [token]);

    if (token){
        return (
            <>
            <div className=' h-20 mt-12 bg-orange-200 rounded-md text-black max-w-screen-lg mx-auto px-8 text-3xl flex justify-center items-center'>
                welcome, {user.username}
            </div>
            <div className= "text-3xl flex justify-center items-center pt-8 pb-6">
                How are you feeling today?
            </div>
                <div className= "my-6">
                    <div className="text-xl flex justify-center items-center">
                        Complete your daily form
                    </div>
                    <div className="flex justify-center items-center pt-4">
                        <Link to="signup">
                            <button className="bg-orange-400 hover:bg-orange-500 text-black py-2 px-4 rounded-full">Daily Entry Form</button>
                        </Link>
                    </div>
                </div>
            <div className="">
                <div className="text-3xl flex justify-center items-center pt-8 ">Calendar</div>
                <div>
                    <Calendar />
                </div>
            </div>
        </>
        )
    }
}
export default LoggedInHome;

{/* <div className="border-2 border-teal-700 rounded-lg mx-96"> */}
