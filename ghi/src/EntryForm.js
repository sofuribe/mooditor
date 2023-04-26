import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    } else {
      console.error("Could not create entry");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>What's Your Mood Today?</h1>
          <form onSubmit={handleSubmit} id="create-mood-form">
            <div className="form-floating mb-3">
              <div
                className="btn-group mb-3"
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <button
                  className={`border-2 border-gray-300 rounded-full p-2 hover:border-green-500 focus:outline-none ${
                    mood === "great" ? "border-blue-500" : ""
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
                <button
                  className={`border-2 border-gray-300 rounded-full p-2 hover:border-green-500 focus:outline-none ${
                    mood === "good" ? "border-blue-500" : ""
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
                  className={`border-2 border-gray-300 rounded-full p-2 hover:border-green-500 focus:outline-none ${
                    mood === "okay" ? "border-blue-500" : ""
                  }`}
                  onClick={() => {
                    handleMoodButtonClick("okay");
                  }}
                >
                  <FontAwesomeIcon icon={faFaceMeh} value="okay" size="4x" />
                </button>
                <button
                  className={`border-2 border-gray-300 rounded-full p-2 hover:border-green-500 focus:outline-none ${
                    mood === "awful" ? "border-blue-500" : ""
                  }`}
                  onClick={() => {
                    handleMoodButtonClick("awful");
                  }}
                >
                  <FontAwesomeIcon icon={faFaceTired} value="awful" size="4x" />
                </button>
              </div>
            </div>
            <h1>Activities</h1>
            <div className="activity-grid">
              <div className="activity-row">
                {activities.slice(0, 4).map((activity) => (
                  <button
                    key={activity.name}
                    type="button"
                    className={`btn btn-outline-primary rounded-full border-2 h-14 w-14 hover:bg-green-500 ${
                      isActivity(activity.name)
                        ? "bg-green-500"
                        : "border-gray-800"
                    }`}
                    onClick={() => handleActivityChange(activity.name)}
                  >
                    <FontAwesomeIcon icon={activity.icon} size="2x" />
                  </button>
                ))}
              </div>
              <div className="activity-row">
                {activities.slice(4, 8).map((activity) => (
                  <button
                    key={activity.name}
                    type="button"
                    className={`btn btn-outline-primary rounded-full border-2 h-14 w-14 hover:bg-green-500 ${
                      isActivity(activity.name)
                        ? "bg-green-500"
                        : "border-gray-800"
                    }`}
                    onClick={() => handleActivityChange(activity.name)}
                  >
                    <FontAwesomeIcon icon={activity.icon} size="2x" />
                  </button>
                ))}
              </div>
              <div className="activity-row">
                {activities.slice(8, 12).map((activity) => (
                  <button
                    key={activity.name}
                    type="button"
                    className={`btn btn-outline-primary rounded-full border-2 h-14 w-14 hover:bg-green-500 ${
                      isActivity(activity.name)
                        ? "bg-green-500"
                        : "border-gray-800"
                    }`}
                    onClick={() => handleActivityChange(activity.name)}
                  >
                    <FontAwesomeIcon icon={activity.icon} size="2x" />
                  </button>
                ))}
              </div>
            </div>
            <h1>Daily Journal</h1>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleJournalChange}
                value={journal}
                placeholder="Today ..."
                required
                type="text"
                name="journal"
                id="journal"
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EntryForm;
