import React from "react";
import { Link } from "react-router-dom";

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
          <div className="h-full bg-gradient-to-tr from-cyan-500 to-yellow-200 text-black items-start max-w-screen-lg mx-8">
            <h2 className="text-4xl md:text-5xl text-center px-32 pt-40 mt-8 font-bold tracking-wide">
              Empowering emotional health, one mood at a time.
            </h2>
            <p className="text-xl md:text-2xl text-center py-8 md:py-10">
                Keep track of your daily mood, goals, and activities
            </p>
            <div className="flex justify-center items-center">
              <Link to="account">
                <button className="bg-yellow-200 ring-2 ring-black hover:-translate-y-2 text-black py-5 px-4 rounded-full font-bold">
                  Create An Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-1 mt-10"></div>
      <div className="bg-gradient-to-br from-cyan-500 to-yellow-200 mx-8">
        <div className="text-center text-4xl pt-24 mb-8 font-bold">App Highlights</div>
        <div className="flex flex-col justify-center md:flex-row md:justify-center md:items-stretch text-xl">
            <div className="flex items-center flex-col md:mx-20 py-8 hover:-translate-y-5">
            <div className="w-64 h-64 bg-yellow-100 rounded-full border-2 border-black relative">
                <img src="img/track.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
            </div>
            <div className="my-14 text-center font-medium">Track How You Are Feeling</div>
            </div>
            <div className="flex items-center flex-col md:mx-20 py-8 hover:-translate-y-5 ">
            <div className="w-64 h-64 bg-yellow-100 rounded-full border-2 border-black relative">
                <img src="img/goals.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
            </div>
            <div className="my-14 text-center font-medium">Set Daily Goals</div>
            </div>
            <div className="flex items-center flex-col md:mx-20 py-8 hover:-translate-y-5">
            <div className="w-64 h-64 bg-yellow-100 rounded-full border-2 border-black relative">
                <img src="img/reflect.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
            </div>
            <div className="my-14 text-center font-medium">Reflect On Your Day</div>
            </div>
        </div>
      </div>
      <div className="bg-black h-1 mt-10"></div>
      <div className="bg-gradient-to-tr from-cyan-500 to-yellow-200 mx-8">
        <div className="text-center md:text-4xl text-4xl pt-20 mb-5 font-bold">Mindful Creators</div>
        <div>
            <p className="text-center font-medium md:text-lg text-md px-20 py-6 md:py-8 mx-80">
                We are a team of passionate individuals dedicated to helping
                people improve their emotional well-being by creating a platform
                that empowers individuals to take control of their emotional health.
            </p>
        </div>
        <div className="bg-yellow-200 rounded-md border-2 border-black pt-10 mx-16">
            <div className="flex flex-col justify-center md:flex-row md:justify-center md:items-stretch text-xl my-5">
                <div className="flex items-center flex-col mx-4 md:mx-10 md:my-0 my-4 hover:-translate-y-5">
                    <div className="w-52 h-52 bg-yellow-100 rounded-full border-2 border-black relative">
                        <img src="img/sofia.jpeg" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="mt-10 font-bold text-center">Sofia Uribe</div>
                    <div className="mt-2 pb-20 text-center text-base">Software Engineer</div>
                </div>
                <div className="flex items-center flex-col mx-4 md:mx-10 md:my-0 my-4 hover:-translate-y-5">
                    <div className="w-52 h-52 bg-yellow-100 rounded-full border-2 border-black relative">
                        <img src="img/jackie.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="mt-10 font-bold text-center">Jackie Liu</div>
                    <div className="mt-2 pb-20 text-center text-base">Software Engineer</div>
                </div>
                <div className="flex items-center flex-col mx-4 md:mx-10 md:my-0 my-4 hover:-translate-y-5">
                    <div className="w-52 h-52 bg-yellow-100 rounded-full border-2 border-black relative">
                        <img src="img/terence.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="mt-10 font-bold text-center">Terence Wong</div>
                    <div className="mt-2 pb-20 text-center text-base">Software Engineer</div>
                </div>
                <div className="flex items-center flex-col mx-4 md:mx-10 md:my-0 my-4 hover:-translate-y-5">
                    <div className="w-52 h-52 bg-yellow-100 rounded-full border-2 border-black relative">
                        <img src="img/brooke.png" alt="track" className="absolute top-0 left-0 w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="mt-10 font-bold text-center">Brooke Crockett</div>
                    <div className="mt-2 pb-20 text-center text-base">Software Engineer</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
