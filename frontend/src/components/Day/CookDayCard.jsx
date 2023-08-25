import React from "react";

const CookDayCard = ({ snap }) => {
 const user = {
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
 };
 return (
  <div className="relative rounded-lg shadow-md border">
   <div className="rounded-full border border-4 border-pink-600 absolute top-2 left-2">
    <img src={user.image} className="rounded-full h-10 w-10 object-cover" />
   </div>
   <div className="p-1 rounded-md bg-pink-600 text-white text-xs font-semibold absolute bottom-2 left-2">
    Nayem Islam
   </div>
   <img
    src={snap.cooksnap_url}
    className="rounded-lg h-64 w-full object-cover"
   />
  </div>
 );
};

export default CookDayCard;
