import React, { useState} from "react";
import axios from "axios";
import { RemoveRedEye } from "@mui/icons-material";

import Header from "../components/Header";
import AddPostHead from "../components/Posts/AddPostHead";
import AddIngredient from "../components/Ingredient/AddIngredient";
import AddDescription from "../components/Posts/AddDescription";
import AddInstruction from "../components/Instruction/AddIntruction";

const AddRecipe = () => {
 const [name, setName] = useState("");
 const [cuisine, setCuisine] = useState(null);
 const [cookingTime, setCookingTime] = useState(null);
 const [description, setDescription] = useState("");
 const [ingredients, setIngredients] = useState([]);
 const [steps, setSteps] = useState([]);

 const handleSubmit = (e) => {
//   e.preventDefault();
  const formData = {
   name: name,
   cuisine_id: +cuisine,
   cooking_time: cookingTime,
   image:
    "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=300",
   description: description,
   ingredients: ingredients,
   instructions: steps,
  };
  console.log(formData);
  axios
   .post("http://localhost:8100/add_recipe", formData)
   .then(function (response) {
    console.log("Success:", response.data);
    // Handle success here
   })
   .catch(function (error) {
    console.error("Error:", error);
    // Handle error here
   });
 };

 return (
  <div>
   <Header />
   <div className="fixed bottom-12 right-12 flex flex-col items-center bg-white rounded-lg shadow-md ml-4 w-12 text-pink-600 space-y-5 p-2">
    <RemoveRedEye />
   </div>
   <div className="w-6/12 m-auto space-y-3">
    <AddPostHead
     setName={setName}
     setCuisine={setCuisine}
     setCookingTime={setCookingTime}
    />
    <AddDescription setDescription={setDescription} />
    <AddIngredient items={ingredients} setItems={setIngredients} />
    <AddInstruction steps={steps} setSteps={setSteps} />
    <button
     className="w-full rounded-lg shadow-lg border p-2 bg-pink-600 text-white font-bold"
     onClick={handleSubmit}>
     Add Post
    </button>
   </div>
  </div>
 );
};

export default AddRecipe;
