import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faPersonSnowboarding } from "@fortawesome/free-solid-svg-icons";
import { faPersonBiking } from "@fortawesome/free-solid-svg-icons";
import { faPersonSwimming } from "@fortawesome/free-solid-svg-icons";
import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { faPersonSkiing } from "@fortawesome/free-solid-svg-icons";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";
import { faFaceTired } from "@fortawesome/free-solid-svg-icons";

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
                <button>
                  <FontAwesomeIcon
                    icon={faFaceLaughBeam}
                    value="great"
                    size="4x"
                    onClick={() => {
                      handleMoodButtonClick("great");
                    }}
                  />
                </button>
                <button>
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    value="good"
                    size="4x"
                    onClick={() => {
                      handleMoodButtonClick("good");
                    }}
                  />
                </button>
                <button>
                  <FontAwesomeIcon
                    icon={faFaceMeh}
                    value="okay"
                    size="4x"
                    onClick={() => {
                      handleMoodButtonClick("okay");
                    }}
                  />
                </button>
                <button>
                  <FontAwesomeIcon
                    icon={faFaceTired}
                    value="awful"
                    size="4x"
                    onClick={() => {
                      handleMoodButtonClick("awful");
                    }}
                  />
                </button>
              </div>
            </div>
            <h1>Activities</h1>
            <div className="flex flex-wrap gap-4">
              {activities.map((activity) => (
                <button
                  key={activity}
                  onClick={() => handleActivityChange(activity)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: isActivity(activity) ? "blue" : "gray",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    padding: "0.5rem",
                    border: "none",
                    outline: "none",
                  }}
                >
                  {activity}
                </button>
              ))}
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
