import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
    const { token } = useToken();
    const { logout } = useToken();

    const navigate = useNavigate();
    const handleLogout = async (event) => {
        event.preventDefault();
        await logout();
        navigate("/login");
    }

    if (!token){
        return (
            <nav className='px-3 py-3 text-2xl'>
                <div className="rounded-full border border-black flex justify-between items-center h-15 mx-auto bg-stone-50 ">
                    <h1 className='w-32 p-2 pl-4'>mooditor</h1>
                    <ul className="flex text-lg">
                        <li className='p-2 hover:text-blue-900'>
                            main page
                        </li>
                        <li className='p-2 hover:text-blue-900'>
                            <Link to="login">login</Link>
                        </li>
                        <li className='p-2 pr-4 hover:text-blue-900'>
                            <Link to="signup">sign up</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className='px-3 py-3 text-2xl'>
                <div className="rounded-full border border-black flex justify-between items-center h-15 mx-auto bg-stone-50 ">
                    <h1 className='w-32 p-2 pl-4'>mooditor</h1>
                    <ul className="flex text-lg">
                        <li className='p-2 hover:text-blue-900'>
                            home
                        </li>
                        <li className='p-2 hover:text-blue-900'>
                            {/* <Link to="entries">all entries</Link> */}
                            all entries
                        </li>
                        <li className='p-2 pr-4 hover:text-blue-900'>
                            <button onClick ={handleLogout}>logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;
