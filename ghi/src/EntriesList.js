import {useEffect, useState} from 'react';

function EntriesList(){
    const [entries, setEntries] = useState([]);
    const fetchEntries = async () => {
        const entriesUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/entries}`
        const response = await fetch(entriesUrl);

        if (response.ok) {
            const data = await response.json();
            setEntries(data.entries);
        }
    }

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry, id) => {
                    return (
                        <tr key={id}>
                            <td>{entry.created}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}
export default EntriesList;
