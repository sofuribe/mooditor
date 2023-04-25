import React, {useState} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';


function EntryForm () {

    const { token } = useToken();

    const [mood, setMood] = useState("")
    const [activity, setActivity] = useState("")
    const [journal, setJournal] = useState("")

    const handleMoodChange = (event) => {
        const value = event.target.value;
        setMood(value);
    }

    const handleActivityChange = (event) => {
        const value = event.target.value;
        setActivity(value);
    }

    const handleJournalChange = (event) => {
        const value = event.target.value;
        setJournal(value);
    }

    const handleSubmit = async (event) => {

        event.preventDefault()

        const data = {};

        data.mood = mood;
        data.activity_name = [activity];
        data.journal = journal;
        console.log(data, "88888888888888")

        const entryUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/entries`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(entryUrl, fetchConfig);
        if (response.ok) {
            await response.json();
            setMood("");
            setActivity([]);
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
                        <textarea
                            onChange={handleMoodChange}
                            value={mood}
                            placeholder="Mood"
                            required
                            type="text"
                            name="mood"
                            id="mood"
                            className="form-control"
                        />
                        <label htmlFor="mood">Mood</label>
                    </div>
                    </form>
                    <h1>Activities</h1>
                    <form onSubmit={handleSubmit} id="create-activity-form">
                    <div className="form-floating mb-3">
                        <textarea
                            onChange={handleActivityChange}
                            value={activity}
                            placeholder="Activity"
                            required
                            type="text"
                            name="activity"
                            id="activity"
                            className="form-control"
                        />
                        <label htmlFor="activity">Activity</label>
                    </div>
                    </form>
                    <h1>5 Minute Journal</h1>
                    <form onSubmit={handleSubmit} id="create-journal-form">
                    <div className="form-floating mb-3">
                        <textarea
                            onChange={handleJournalChange}
                            value={journal}
                            placeholder="Journal"
                            required
                            type="text"
                            name="journal"
                            id="journal"
                            className="form-control"
                        />
                        <label htmlFor="journal">Journal</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EntryForm;
