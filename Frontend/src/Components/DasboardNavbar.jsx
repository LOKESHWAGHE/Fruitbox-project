import React from 'react';
import { Link } from 'react-router-dom';

function DashboardNavbar() {
    const navItems = (
        <>
            <li>
                <Link to="/userdashboard">Home</Link>
            </li>
            <li>
                <Link to="/cart">Cart</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/mysubscription">Subscription</Link>
            </li>
        </>
    );

    const handleLogout = () => {
        console.log("Logging out...");
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 top-0 left-0 right-0">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <Link to="/" className="text-2xl font-bold cursor-pointer">Fruit Box</Link>
                </div>
                <div className="navbar-end space-x-3">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems}
                        </ul>
                    </div>
                    <div className="hidden md:block">
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                    <Link to="/">
                        <button className="p-2.5 border-2 border-none text-white rounded-md bg-[#191E24] hover:bg-[#2A2F36] transition duration-300 ease-in-out">
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DashboardNavbar;
