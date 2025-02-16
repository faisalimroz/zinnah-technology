import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const {user}=useSelector(state=>state.auth)
  const theme=useSelector((state)=>state.theme.theme)
  return (
    <div className="max-w-lg mx-auto p-6  shadow-md rounded-lg">
      <div className="flex justify-center mb-6">
        <img
          src={user?.photo || '/default-profile.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div className="text-center mb-6">
        <p className={`${theme==='light'&&'text-white'}`}>{user?.email}</p>
        <p className="text-gray-500">Role: {user?.role}</p>
      </div>
    </div>
  );
};

export default Profile;
