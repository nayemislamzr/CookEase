import React from "react";

const UserCard = ({ user }) => {
 return (
  <div className="bg-white p-4 rounded-lg shadow-md">
   <img
    src={user.profile_pic_url}
    className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-pink-600"
   />
   <h2 className="text-lg text-center font-abril-fatface">
    {user.first_name} {user.last_name}
   </h2>
   <p className="text-gray-600 text-center">{user.email}</p>
   <div className="mt-3 flex flex-row space-x-3">
    <button className="py-2 w-full bg-pink-600 text-white rounded-lg">Follow</button>
    <button className="py-2 w-full border-2 border-pink-600 text-pink-600 rounded-lg">View Profile</button>
   </div>
  </div>
 );
};

export default UserCard;
