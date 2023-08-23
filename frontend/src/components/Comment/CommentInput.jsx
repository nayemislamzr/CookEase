import React, { useState } from "react";

const CommentInput = ({ onSubmit }) => {
 const [comment, setComment] = useState("");

 const handleCommentChange = (event) => {
  setComment(event.target.value);
 };

 const handleSubmit = () => {
  if (comment.trim() !== "") {
   onSubmit(comment);
   setComment("");
  }
 };

 return (
  <form className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20 shadow-md">
   <div className="px-3 mb-2 mt-2">
    <textarea
     placeholder="Write your opinion..."
     className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
     onChange={handleCommentChange}></textarea>
   </div>
   <div className="flex justify-end px-4">
    <input
     type="submit"
     className="px-2.5 py-1.5 rounded-md text-white text-bold text-sm bg-pink-600"
     value="Comment"
     onSubmit={handleSubmit}
    />
   </div>
  </form>
 );
};

export default CommentInput;
