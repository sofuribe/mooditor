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

    return (
        <>
        <div className="min-h-screen">
            <div className="p-4">
                <div className="group relative">
                    <button className="bg-gray-800 text-white px-6 h-10 rounded">Month</button>
                    <nav tabIndex="0" className="border-2 bg-white invisible border-gray-800 rounded w-60 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
                        <ul className="py-1">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    January
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    February
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    March
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    April
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        <table className="table-fixed w-full">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2">All Entries</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry, id) => {
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
