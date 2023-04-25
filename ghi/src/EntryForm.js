import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
// import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
// import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
// import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
// import { faGamepad } from "@fortawesome/free-solid-svg-icons";
// import { faPersonSnowboarding } from "@fortawesome/free-solid-svg-icons";
// import { faPersonBiking } from "@fortawesome/free-solid-svg-icons";
// import { faPersonSwimming } from "@fortawesome/free-solid-svg-icons";
// import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
// import { faPersonSkiing } from "@fortawesome/free-solid-svg-icons";
// import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
// import { faBed } from "@fortawesome/free-solid-svg-icons";
// import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";
// import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
// import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";
// import { faFaceTired } from "@fortawesome/free-solid-svg-icons";

const activities = [
  "Reading",
  "Running",
  "Gym",
  "Walking",
  "Video Games",
  "Snowboarding",
  "Biking",
  "Sports",
  "Swimming",
  "Hiking",
  "Meditate",
  "Yoga",
  "Skiing",
  "Cooking",
  "Sleeping",
];

function EntryForm () {

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

  const handleMoodButtonClick = (e) => {
    const value = e.target.value;
    setMood(value);
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
          {/* <FontAwesomeIcon icon={faFaceLaughBeam} size="2xl" />
          <FontAwesomeIcon icon={faFaceSmileBeam} size="2xl" />
          <FontAwesomeIcon icon={faFaceMeh} size="2xl" />
          <FontAwesomeIcon icon={faFaceTired} size="2xl" /> */}
          <form onSubmit={handleSubmit} id="create-mood-form">
            <div className="form-floating mb-3">
              <label htmlFor="mood">Mood</label>
              <div className="btn-group mb-3">
                <button
                  type="button"
                  className={`w-16 h-16 bg-green-500 rounded-full btn ${
                    mood === "great" ? "bg-green-600" : "hover:bg-green-600"
                  } p-4`}
                  value="great"
                  onClick={handleMoodButtonClick}
                >
                  Great
                </button>
                <button
                  type="button"
                  className={`w-16 h-16 bg-blue-500 rounded-full btn ${
                    mood === "good" ? "bg-blue-600" : "hover:bg-blue-600"
                  } p-4`}
                  value="good"
                  onClick={handleMoodButtonClick}
                >
                  Good
                </button>
                <button
                  type="button"
                  className={`w-16 h-16 bg-yellow-500 rounded-full btn ${
                    mood === "okay" ? "bg-yellow-600" : "hover:bg-yellow-600"
                  } p-4`}
                  value="okay"
                  onClick={handleMoodButtonClick}
                >
                  Okay
                </button>
                <button
                  type="button"
                  className={`w-16 h-16 bg-red-500 rounded-full btn ${
                    mood === "awful" ? "bg-red-600" : "hover:bg-red-600"
                  } p-4`}
                  value="awful"
                  onClick={handleMoodButtonClick}
                >
                  Awful
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
            {/* <FontAwesomeIcon icon={faBookOpen} size="xl" />
            <FontAwesomeIcon icon={faPersonRunning} size="2xl" />
            <FontAwesomeIcon icon={faDumbbell} size="xl" />
            <FontAwesomeIcon icon={faPersonWalking} size="xl" />
            <FontAwesomeIcon icon={faGamepad} />
            <FontAwesomeIcon icon={faPersonSnowboarding} />
            <FontAwesomeIcon icon={faPersonBiking} size="xl" />
            <FontAwesomeIcon icon={faPersonSwimming} size="xl" />
            <FontAwesomeIcon icon={faPersonHiking} size="xl" />
            <FontAwesomeIcon icon={faPersonSkiing} size="xl" />
            <FontAwesomeIcon icon={faKitchenSet} size="xl" />
            <FontAwesomeIcon icon={faBed} /> */}
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EntryForm;
