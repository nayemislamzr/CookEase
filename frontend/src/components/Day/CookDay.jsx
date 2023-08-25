import React from "react";
import CookSnapCard from "./CookDayCard";

const CookDay = () => {
 const snaps = [
  {
   cooksnap_id: 1,
   recipe_id: 100,
   user_id: 20,
   cooksnap_url:
    "https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
   caption: "My CookDay",
  },
  {
   cooksnap_id: 1,
   recipe_id: 100,
   user_id: 20,
   cooksnap_url:
    "https://images.freeimages.com/images/large-previews/d27/cooking-chicken-1520344.jpg",
   caption: "My CookDay",
  },
  {
   cooksnap_id: 1,
   recipe_id: 100,
   user_id: 20,
   cooksnap_url:
    "https://images.freeimages.com/images/large-previews/d36/cooking-a-chiken-1323662.jpg",
   caption: "My CookDay",
  },
  {
   cooksnap_id: 1,
   recipe_id: 100,
   user_id: 20,
   cooksnap_url:
    "https://images.freeimages.com/images/large-previews/215/mount-cook-national-park-1378279.jpg",
   caption: "My CookDay",
  },
  {
   cooksnap_id: 1,
   recipe_id: 100,
   user_id: 20,
   cooksnap_url:
    "https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
   caption: "My CookDay",
  },
 ];
 return (
  <div className="grid grid-cols-5 gap-2">
   {snaps.map((snap) => (
    <CookSnapCard snap={snap} />
   ))}
  </div>
 );
};

export default CookDay;
