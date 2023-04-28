import React from "react";
import { Link } from "react-router-dom";
import './fonts.css';

function MainPage() {
  return (
    <div className="min-h-screen">
      <div className="h-[700px] flex">
        <div className="md:w-1/3 h-full flex items-center">
          <img
            className="align-top hover:-translate-y-5"
            src="img/mainGif.gif"
            alt="floating head"
          />
        </div>
        <div className="md:w-2/3 h-full flex items-center">
          <div className="h-full bg-gradient-to-tr from-cyan-500 to-yellow-300 text-black items-start max-w-screen-lg mx-7">
                <h2 className="headers text-4xl md:text-5xl text-center px-32 pt-40 mt-8 font-bold">
                Empowering emotional health, one mood at a time.
                </h2>
                <p className="text-xl md:text-2xl text-center py-8 md:py-10">
                    Keep track of your daily mood, goals, and activities
                </p>
                <div className="flex justify-center items-center">
                    <Link to="account">
                        <button className="bg-yellow-200 hover:bg-yellow-300 ring-2 ring-black hover:-translate-y-2 text-black py-5 px-4 rounded-full font-bold shadow-2xl">
                        Create An Account
                        </button>
                    </Link>
                </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-1 mt-10"></div>
      <div className="bg-gradient-to-br from-cyan-500 to-yellow-300">
        <div className="headers text-center text-5xl pt-20 mb-8 font-bold">App Highlights</div>
        <div className="flex flex-col justify-center md:flex-row md:justify-center md:items-stretch text-xl">
            <div className="flex items-center flex-col md:mx-20 py-8 hover:-translate-y-5">
            <div className="w-52 h-52 bg-yellow-100 shadow-2xl rounded-full border-2 border-black relative">
                <img src="img/track.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
            </div>
            <div className="my-14 pb-6 text-center font-medium">Track How You Are Feeling</div>
            </div>
            <div className="flex items-center flex-col md:mx-20 py-8 hover:-translate-y-5 ">
            <div className="w-52 h-52 bg-yellow-100 shadow-2xl rounded-full border-2 border-black relative">
                <img src="img/goals.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
            </div>
            <div className="my-14 pb-6 text-center font-medium">Set Daily Goals</div>
            </div>
            <div className="flex items-center flex-col md:mx-20 py-8 hover:-translate-y-5">
            <div className="w-52 h-52 bg-yellow-100 shadow-2xl rounded-full border-2 border-black relative">
                <img src="img/reflect.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
            </div>
            <div className="my-14 pb-6 text-center font-medium">Reflect On Your Day</div>
            </div>
        </div>
      </div>
      <div className="bg-black h-1 mt-10"></div>
      <div className="bg-gradient-to-tr from-cyan-500 to-yellow-300 p-10">
        <div className="headers text-center md:text-5xl text-4xl pt-8 mb-3">Meet the Mindful Creators</div>
        <div className="py-6 px-10">
            <p className="text-left body border-2 border-black border-t-0 border-b-0 border-r-0 font-medium md:text-lg text-md px-0 md:px-4 py-0 md:py-2 mb-3 mx-80">
                We are a team of passionate individuals dedicated to helping
                people improve their emotional well-being by creating a platform
                that empowers individuals to take control of their emotional health.
            </p>
        </div>
            <div className="flex flex-col justify-center md:flex-row md:justify-center md:items-stretch text-xl my-5 body">
                <div className="flex items-center bg-slate-50 hover:bg-slate-200 shadow-2xl rounded-md border-2 border-yellow-200 p-8 flex-col mx-1 md:mx-4 md:my-0 my-4 hover:-translate-y-5">
                    <div className="w-40 h-40 rounded-full relative">
                        <img src="img/team/sofia.jpeg" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="mt-8 font-bold text-center">Sofia Uribe</div>
                    <div className="mt-2 pb-10 text-center text-base">Software Engineer</div>
                </div>
                <div className="flex items-center bg-slate-50 hover:bg-slate-200 shadow-2xl rounded-md border-2 border-yellow-200 p-8 flex-col mx-1 md:mx-4 md:my-0 my-4 hover:-translate-y-5">
                    <div className="w-40 h-40 rounded-full relative">
                        <img src="img/team/jackie.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="mt-8 font-bold text-center">Jackie Liu</div>
                    <div className="mt-2 pb-10 text-center text-base">Software Engineer</div>
                </div>
                <div className="flex items-center bg-slate-50 hover:bg-slate-200 shadow-2xl rounded-md border-2 border-yellow-200 p-8 flex-col mx-1 md:mx-4 md:my-0 my-4 hover:-translate-y-5">
                    <div className="w-40 h-40 rounded-full relative">
                        <img src="img/team/terence.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="mt-8 font-bold text-center">Terence Wong</div>
                    <div className="mt-2 pb-10 text-center text-base">Software Engineer</div>
                </div>
                <div className="flex items-center bg-slate-50 hover:bg-slate-200 shadow-2xl rounded-md border-2 border-yellow-200 p-8 flex-col mx-1 md:mx-4 md:my-0 my-4 hover:-translate-y-5">
                    <div className="w-40 h-40 rounded-full relative">
                        <img src="img/team/brooke.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="mt-8 font-bold text-center">Brooke Crockett</div>
                    <div className="mt-2 pb-10 text-center text-base">Software Engineer</div>
                </div>
            </div>
      </div>
    </div>
  );
}

export default MainPage;
