import React, { useState } from "react";
import { FiHome, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiUser, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { toggleTheme } from "../feature/Theme/ThemeSlice";
import { logout } from "../feature/authSlice";
import { useCheckRoleQuery } from "../feature/authApi/AuthApi";

const Dashboard = () => {
    const {user}=useSelector(state=>state.auth)
    const {data:role,isLoading}=useCheckRoleQuery(user?.email)
    const [isOpen, setIsOpen] = useState(false);
    // Function to close the sidebar when clicking outside
    const handleOutsideClick = (e) => {
        if (isOpen && !e.target.closest("#sidebar")) {
            setIsOpen(false);
        }
    };
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);

    console.log(theme);
    if (isLoading) {
        return <>loading</>
    }

    console.log(role?.role);
    return (
        <div  className="flex  h-screen " onClick={handleOutsideClick}>
            {/* Sidebar */}
            <div
                id="sidebar"
                className={`fixed top-0 left-0 w-64 h-full  shadow-lg p-4 transition-transform duration-300 ease-in-out ${theme==='dark'&&'bg-white'} ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:relative lg:translate-x-0 lg:block`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <button className="lg:hidden" onClick={() => setIsOpen(false)}>
                        <FiX className="text-2xl" />
                    </button>
                </div>
                <ul className="space-y-2 flex flex-col items-start">
                {
                    role?.role==='admin'?<>
                     <Link to='/'>
                        <li className="p-2 flex items-center space-x-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                            <FiHome className="text-xl" />
                            <span>Home</span>
                        </li>
                    </Link>
                    <Link to='/profile'>
                        <li className="p-2 flex items-center space-x-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                            <FiUser className="text-xl" />
                            <span>Profile</span>
                        </li>
                    </Link>
                    <Link to='/profile'>
                        <li className="p-2 flex items-center space-x-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                            <FiUsers className="text-xl" />
                            <span>Users</span>
                        </li>
                    </Link>


                    {user?.email && <li onClick={() => dispatch(logout())} className="p-2 flex items-center space-x-2 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer">
                        <FiLogOut className="text-xl" />
                        <span>Logout</span>
                    </li>}

                    </>:<>    <Link to='/'>
                        <li className="p-2 flex items-center space-x-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                            <FiHome className="text-xl" />
                            <span>Home</span>
                        </li>
                    </Link>
                    <Link to='/profile'>
                        <li className="p-2 flex items-center space-x-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                            <FiUser className="text-xl" />
                            <span>Profile</span>
                        </li>
                    </Link>
                    <Link to='/create-task'>
                        <li className="p-2 flex items-center space-x-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                            <FiPlus className="text-xl" />
                            <span>Create Task</span>
                        </li>
                    </Link>
                    {user?.email && <li onClick={() => dispatch(logout())} className="p-2 flex items-center space-x-2 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer">
                        <FiLogOut className="text-xl" />
                        <span>Logout</span>
                    </li>}</>
                }
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <div className=" shadow-md p-4 flex justify-between items-center">
                    <button className="lg:hidden btn btn-outline btn-sm" onClick={() => setIsOpen(!isOpen)}>
                        <FiMenu className="text-xl" />
                    </button>
                    <h2 className="text-lg font-semibold">Welcome to Dashboard</h2>
                    <div className="flex items-center space-x-4">
                     {theme==='dark'? <button onClick={()=>dispatch(toggleTheme())} className="btn btn-sm btn-outline">Dark Mode</button>:   <button onClick={()=>dispatch(toggleTheme())} className="btn btn-sm btn-outline">Light Mode</button>}
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img title={user?.email} src={user?.photo} alt="User" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
