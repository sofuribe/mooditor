import {useEffect, useState} from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";

function EntriesList(){
    const { token } = useToken();
    const [entries, setEntries] = useState([]);
    useEffect(() => {
        const fetchEntries = async () => {
            if (token) {
            const entriesUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/entries`

            const fetchConfig = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(entriesUrl, fetchConfig);

            if (response.ok) {
                const data = await response.json();
                setEntries(data);
            }
        }
    }
        fetchEntries();
    }, [token]);

    const [search, setSearch] = useState ('');

    return (
        <>
        <div className="min-h-screen">
            <div className="input-group mb-3">
                <input
                    maxLength="17"
                    onChange={(event) => setSearch(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Type to search month..."
                    aria-label="search"
                    aria-describedby="basic-addon2"
                >
                </input>
            </div>
            <table className="table-fixed w-1/2 ml-auto mr-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">All Entries</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.filter((entry) => {
                        return search === "" ? entry : entry.created.includes(search)
                    }).map((entry, id) => {
                        return (
                            <tr key={id}>
                                <td className="border px-4 py-2">{ new Date(entry.created).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) } {entry.mood}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default EntriesList;
