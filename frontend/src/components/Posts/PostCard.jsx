import React from "react";
import { Favorite, ModeComment, RestaurantMenu } from "@mui/icons-material";

const PostCard = ({
 id,
 imageUrl,
 caption,
 writer,
 time,
 reactionCount,
 commentCount,
}) => {
 return (
  <div className="bg-white shadow-md p-4 rounded-lg mb-4">
   <div className="flex items-center mb-2">
    <img src={imageUrl} alt="PostCard" className="w-10 h-10 rounded-full mr-2" />
    <div>
     <p className="font-semibold text-pink-600">{writer}</p>
     <p className="text-sm text-gray-600">{time}</p>
    </div>
   </div>
   <p className="text-gray-700 mb-2">{caption}</p>
   <img src={imageUrl} alt="PostCard" className="w-full mb-2 rounded-lg" />
   <div className="flex justify-between pb-1">
    <p className="text-sm text-gray-600 inline">{reactionCount} likes</p>
    <p className="text-sm text-gray-600 inline">{commentCount} comments</p>
   </div>
   <div className="flex items-center justify-between text-gray-600 w-full px-10 pt-2 border-t-2 border-black-100">
    <div className="mr-4 flex items-center">
     <button className="flex items-center space-x-1">
      <Favorite />
      <span>Like</span>
     </button>
    </div>
    <div className="mr-4 flex items-center">
     <button className="flex items-center space-x-1">
      <ModeComment />
      <span>Comment</span>
     </button>
    </div>
    <div className="flex items-center">
     <button className="flex items-center space-x-1">
      <RestaurantMenu />
      <span>Recipe</span>
     </button>
    </div>
   </div>
  </div>
 );
};

export default PostCard;
