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

    const lastSelectedMonth = localStorage.getItem("selectedMonth") || "";
    const [search, setSearch] = useState(lastSelectedMonth);

    const handleSearchChange = (event) => {
        const selectedMonth = event.target.value;
        setSearch(selectedMonth);
        localStorage.setItem("selectedMonth", selectedMonth);
    }

    return (
        <>
        <div className="min-h-screen m-10">
            <div className="flex justify-center items-center h-full">
                <div className="w-1/2">
                    <select
                    onChange={handleSearchChange}
                    className=" appearance-none w-full rounded bg-orange-50 border border-black px-4 py-2 pr-8 hover:bg-orange-100 mb-2rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={search}
                    >
                        <option value="">Select a month</option>
                        <option value="-01-">January</option>
                        <option value="-02-">February</option>
                        <option value="-03-">March</option>
                        <option value="-04-">April</option>
                        <option value="-05-">May</option>
                        <option value="-06-">June</option>
                        <option value="-07-">July</option>
                        <option value="-08-">August</option>
                        <option value="-09-">September</option>
                        <option value="-10-">October</option>
                        <option value="-11-">November</option>
                        <option value="-12-">December</option>
                    </select>
                </div>
            </div>
            <div className="rounded-lg">
                <table className="w-1/2 ml-auto mr-auto mt-3">
                    <thead>
                        <tr className="bg-orange-50 border rounded border-black">
                            <th className="px-4 py-2">All Entries</th>
                        </tr>
                    </thead>
                    <tbody className = "">
                        {entries.filter((entry) => {
                            return search === "" ? entry : entry.created.includes(search)})
                            .map((entry, id) => {
                            return (
                                <tr key={id}>
                                    <td className="border px-4 py-2 flex items-center">
                                        <div className="w-28">
                                            { new Date(entry.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
                                            {console.log(entry.created)}
                                        </div>
                                        <div className={ `w-6 h-6 rounded-full ml-3
                                            ${entry.mood === "awful" ? "bg-red-500": entry.mood === "okay" ? "bg-yellow-500": entry.mood === "good" ? "bg-blue-500": "bg-green-500"}`}>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default EntriesList;
