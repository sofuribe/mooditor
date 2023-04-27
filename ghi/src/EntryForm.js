import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import {
  faBookOpen,
  faPersonRunning,
  faDumbbell,
  faPersonWalking,
  faGamepad,
  faPersonSnowboarding,
  faPersonBiking,
  faPersonSwimming,
  faPersonHiking,
  faPersonSkiing,
  faKitchenSet,
  faBed,
  faFaceLaughBeam,
  faFaceSmileBeam,
  faFaceMeh,
  faFaceTired,
} from "@fortawesome/free-solid-svg-icons";

const activities = [
  { name: "Reading", icon: faBookOpen },
  { name: "Running", icon: faPersonRunning },
  { name: "Gym", icon: faDumbbell },
  { name: "Walking", icon: faPersonWalking },
  { name: "Snowboarding", icon: faPersonSnowboarding },
  { name: "Biking", icon: faPersonBiking },
  { name: "Swimming", icon: faPersonSwimming },
  { name: "Hiking", icon: faPersonHiking },
  { name: "Skiing", icon: faPersonSkiing },
  { name: "Cooking", icon: faKitchenSet },
  { name: "Sleeping", icon: faBed },
  { name: "Games", icon: faGamepad },
];

function EntryForm() {
  const { token } = useToken();

  const [mood, setMood] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [journal, setJournal] = useState("");

  const handleActivityChange = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };
  const isActivity = (activity) => selectedActivities.includes(activity);

  const handleJournalChange = (event) => {
    const value = event.target.value;
    setJournal(value);
  };

  const handleMoodButtonClick = (mood) => {
    setMood(mood);
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};

    data.mood = mood;
    data.activity_name = selectedActivities;
    data.journal = journal;

    const entryUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/entries`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(entryUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setMood("");
      setSelectedActivities([]);
      setJournal("");
      navigate("/home");
      toast("You completed today's entry!");
    } else {
      console.error("Could not create entry");
    }
  };

  return (
    <>
      <div className="headers text-4xl text-center mt-10 my-2">
        Reflect on your day
      </div>
      <div className="border-4 border-yellow-100 rounded-2xl shadow-xl relative mx-48 my-8">
        <div className="text-center p-4 mt-4">
          <h1 className="headers text-3xl mb-10">What's your mood today?</h1>
          <form onSubmit={handleSubmit} id="create-mood-form">
            <div
              className="flex items-center justify-center mt-2 mb-2"
              style={{
                display: "flex",
                gap: "2rem",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              {/* MOODS................................................................................................. */}
              <button
                type="button"
                className={`border-4 rounded-full p-2 hover:bg-red-500 border-red-500 focus:outline-none ${
                  mood === "awful" ? "shadow-2xl bg-red-500" : ""
                }`}
                onClick={() => {
                  handleMoodButtonClick("awful");
                }}
              >
                <FontAwesomeIcon icon={faFaceTired} value="awful" size="4x" />
              </button>
              <button
                type="button"
                className={`border-4 rounded-full p-2 hover:bg-yellow-500 border-yellow-500 focus:outline-none ${
                  mood === "okay" ? "shadow-2xl border-2 bg-yellow-500" : ""
                }`}
                onClick={() => {
                  handleMoodButtonClick("okay");
                }}
              >
                <FontAwesomeIcon icon={faFaceMeh} value="okay" size="4x" />
              </button>
              <button
                type="button"
                className={`border-4 shadow-xl rounded-full p-2 hover:bg-green-600 border-green-600 focus:outline-none ${
                  mood === "good" ? "shadow-2xl bg-green-600" : ""
                }`}
                onClick={() => {
                  handleMoodButtonClick("good");
                }}
              >
                <FontAwesomeIcon
                  icon={faFaceSmileBeam}
                  value="good"
                  size="4x"
                />
              </button>
              <button
                type="button"
                className={`border-4 shadow-xl rounded-full p-2 hover:bg-green-700 border-green-700 focus:outline-none ${
                  mood === "great" ? "shadow-2xl  bg-green-700" : ""
                }`}
                onClick={() => {
                  handleMoodButtonClick("great");
                }}
              >
                <FontAwesomeIcon
                  icon={faFaceLaughBeam}
                  value="great"
                  size="4x"
                />
              </button>
            </div>

            {/* ACTIVITIES.............................................................................................. */}
            {/* <div className="border-2 rounded-2xl border-black m-20"> */}
            <h1 className="headers text-3xl mt-10">Activities</h1>
            <div className="activity-grid">
              <div className="activity-row my-10">
                {activities.slice(0, 4).map((activity) => (
                  <div key={activity.name} className="relative inline-block">
                    <button
                      key={activity.name}
                      type="button"
                      className={`mx-8 mb-3 shadow-xl rounded-full h-20 w-20 hover:bg-gradient-to-r from-cyan-500 to-yellow-300 ${
                        isActivity(activity.name)
                          ? "bg-gradient-to-r from-cyan-500 to-yellow-300"
                          : "border-gray-800"
                      }`}
                      onClick={() => handleActivityChange(activity.name)}
                    >
                      <FontAwesomeIcon icon={activity.icon} size="2x" />
                    </button>
                    <span className="body absolute top-full left-1/2 transform -translate-x-1/2">
                      {activity.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="activity-row my-10">
                {activities.slice(4, 8).map((activity) => (
                  <div key={activity.name} className="relative inline-block">
                    <button
                      key={activity.name}
                      type="button"
                      className={`mx-8 mb-3 shadow-xl rounded-full h-20 w-20 hover:bg-gradient-to-r from-cyan-500 to-yellow-300 ${
                        isActivity(activity.name)
                          ? "bg-gradient-to-r from-cyan-500 to-yellow-300"
                          : "border-gray-800"
                      }`}
                      onClick={() => handleActivityChange(activity.name)}
                    >
                      <FontAwesomeIcon icon={activity.icon} size="2x" />
                    </button>
                    <span className="body absolute top-full left-1/2 transform -translate-x-1/2">
                      {activity.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="activity-row my-10">
                {activities.slice(8, 12).map((activity) => (
                  <div key={activity.name} className="relative inline-block">
                    <button
                      key={activity.name}
                      type="button"
                      className={`mx-8 mb-3 shadow-xl rounded-full h-20 w-20 hover:bg-gradient-to-r from-cyan-500 to-yellow-300 ${
                        isActivity(activity.name)
                          ? "bg-gradient-to-r from-cyan-500 to-yellow-300"
                          : "border-gray-800"
                      }`}
                      onClick={() => handleActivityChange(activity.name)}
                    >
                      <FontAwesomeIcon icon={activity.icon} size="2x" />
                    </button>
                    <span className="body absolute top-full left-1/2 transform -translate-x-1/2">
                      {activity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* </div> */}

            {/* JOURNAL.............................................................................................. */}
            <div className="border-2 shadow-2xl rounded-2xl border-black m-20">
              <h1 className="mt-6 mb-6 headers text-2xl">Daily Journal</h1>
              <div className="flex flex-col">
                <textarea
                  onChange={handleJournalChange}
                  value={journal}
                  id="journal"
                  name="journal"
                  className="border rounded-2xl p-5 mx-20 text-gray-700 leading-tight focus:outline-none focus:border-black resize-none"
                  rows="10"
                  placeholder="Write about your day here..."
                />
              </div>
              <div className="m-5">
                <button className="body text-lg bg-orange-400 hover:bg-orange-500 text-black py-2 px-4 rounded-full">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EntryForm;
