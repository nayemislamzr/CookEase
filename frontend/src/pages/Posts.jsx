import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/Posts/PostCard";
import CookDay from "../components/Day/CookDay";
import axios from "axios";

const Posts = () => {

 const [posts, setPosts] = useState([]);
 useEffect(() => {
  const fetchData = async () => {
   try {
    const apiUrl = `http://localhost:8100/posts`;
    const formData = { user_id: localStorage.getItem("user_id") };
    const response = await axios.post(apiUrl, formData);

    response.data.map(async ({ recipe_id, description, post_time }) => {
     const recipe = await axios.get(
      `http://localhost:8100/recipe/${recipe_id}`
     );
     const user = await axios.get(
      `http://localhost:8100/get_user_from_recipe/${recipe_id}`
     );

     const newPost = {
      recipeId: recipe_id,
      imageUrl: recipe.data.imageUrl,
      caption: description,
      author: user.data.first_name + " " + user.data.last_name,
      authorId: user.data.user_id,
      profilePic: user.data.profile_pic_url,
      time: post_time,
      reactionCount: recipe.data.likeCount,
      commentCount: recipe.data.commentCount,
     };
     setPosts((posts) => [...posts, newPost]);
    });

    console.log(posts);
   } catch (error) {
    console.error("Error fetching user data:", error);
   }
  };

  fetchData();
 }, []);

 return (
  <>
   <Header />
   <div className="flex justify-center items-center">
    <div className="w-5/12 flex flex-col space-y-3">
     <CookDay />
     {posts.map((post, index) => (
      <div>
       <PostCard post={post} />
      </div>
     ))}
    </div>
   </div>
  </>
 );
};

export default Posts;
