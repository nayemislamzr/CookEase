import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
 BookmarkBorder,
 FavoriteBorder,
 ChatBubbleOutline,
 CameraAltOutlined,
 Print,
} from "@mui/icons-material";

import Header from "../components/Header";
import PostHead from "../components/Posts/PostHead";
import Ingredient from "../components/Ingredient/Ingredient";
import CommentSection from "../components/Comment/CommentSection";
import Description from "../components/Posts/Description";
import UserCard from "../components/User/UserCard";
import CommentInput from "../components/Comment/CommentInput";
import Instruction from "../components/Instruction/Instruction";

const Recipe = (props) => {
 const { id } = useParams();
 const [recipe, setRecipe] = useState(null);
 const [user, setUser] = useState(null);
 const [comments, setComments] = useState([]);
 const [ingredients, setIngredients] = useState([]);
 const [steps, setSteps] = useState([]);

 useEffect(() => {
  const fetchRecipe = async () => {
   try {
    const apiUrl = `http://localhost:8100/recipe/${id}`;
    const response = await axios.get(apiUrl);
    setRecipe(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchUser = async () => {
   try {
    const apiUrl = `http://localhost:8100/user_by_recipe/${id}`;
    const response = await axios.get(apiUrl);
    setUser(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchComments = async () => {
   try {
    const apiUrl = `http://localhost:8100/comments_by_post/${id}`;
    const response = await axios.get(apiUrl);
    setComments(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchSteps = async () => {
   try {
    const apiUrl = `http://localhost:8100/steps/${id}`;
    const response = await axios.get(apiUrl);
    setSteps(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchIngredients = async () => {
   try {
    const apiUrl = `http://localhost:8100/ingredients/${id}`;
    const response = await axios.get(apiUrl);
    setIngredients(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  (async () => {
   await fetchRecipe();
   await fetchUser();
   await fetchComments();
   await fetchSteps();
   await fetchIngredients();
  })();
 }, []);

 return (
  <div>
   <Header />
   <div className="fixed bottom-1/2 right-12 flex flex-col items-center bg-white rounded-lg shadow-md ml-4 w-12 text-pink-600 space-y-5 p-2">
    <BookmarkBorder />
    <FavoriteBorder />
    <ChatBubbleOutline />
    <CameraAltOutlined />
    <Print />
   </div>
   <div className="flex flex-row justify-center space-x-3">
    <div className="w-6/12 flex-col space-y-3">
     {recipe && (
      <PostHead
       name={recipe.name}
       cookingTime={recipe.cookingTime}
       cuisine={recipe.cuisine}
       imageUrl={recipe.imageUrl}
       likeCount={recipe.likeCount}
       commentCount={recipe.commentCount}
      />
     )}
     {recipe && <Description text={recipe.description} />}
     {ingredients && <Ingredient ingredients={ingredients} />}
     {steps && <Instruction steps={steps} />}
    </div>
    <div className="w-3/12 flex-col space-y-3">
     {user && <UserCard user={user} />}
     <CommentSection comments={comments} />
     <CommentInput />
    </div>
   </div>
  </div>
 );
};

export default Recipe;
