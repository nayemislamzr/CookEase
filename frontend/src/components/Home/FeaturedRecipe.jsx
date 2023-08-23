import React from "react";
import RecipeCard from "./RecipeCard";
import { Tag } from "@mui/icons-material";

const FeaturedRecipes = () => {
 const blogs = [
  {
   title: "Scrambled eggs with chicken",
   image:
    "https://img-global.cpcdn.com/comments/cc2ee763184cf0e4/680x680cq70/photo.webp",
   cuisine: "Bengali",
   cookTime: 15,
   chefName: "Nayem",
   publishTime: "15/08/23",
  },
  {
   title: "Scrambled eggs with chicken",
   image:
    "https://img-global.cpcdn.com/comments/cc2ee763184cf0e4/680x680cq70/photo.webp",
   cuisine: "Bengali",
   cookTime: 15,
   chefName: "Nayem",
   publishTime: "15/08/23",
  },
  {
   title: "Scrambled eggs with chicken",
   image:
    "https://img-global.cpcdn.com/comments/cc2ee763184cf0e4/680x680cq70/photo.webp",
   cuisine: "Bengali",
   cookTime: 15,
   chefName: "Nayem",
   publishTime: "15/08/23",
  },
  {
   title: "Scrambled eggs with chicken",
   image:
    "https://img-global.cpcdn.com/comments/cc2ee763184cf0e4/680x680cq70/photo.webp",
   cuisine: "Bengali",
   cookTime: 15,
   chefName: "Nayem",
   publishTime: "15/08/23",
  },
  {
   title: "Scrambled eggs with chicken",
   image:
    "https://img-global.cpcdn.com/comments/cc2ee763184cf0e4/680x680cq70/photo.webp",
   cuisine: "Bengali",
   cookTime: 15,
   chefName: "Nayem",
   publishTime: "15/08/23",
  },
 ];

 return (
  <>
   <div className="text-left">
    <h1 className="text-2xl font-extrabold text-pink-600 mb-4">
     <Tag style={{ fontSize: "1.8rem" }} />
     Featured Recipes
    </h1>
   </div>
   <div class="mt-3 grid lg:grid-cols-5 gap-3">
    {blogs.map((blog, index) => (
     <div>
      <RecipeCard
       title={blog.title}
       image={blog.image}
       cuisine={blog.cuisine}
       publishTime={blog.publishTime}
       chefName={blog.chefName}
       cookTime={blog.cookTime}
      />
     </div>
    ))}
   </div>
   <div className="flex items-center justify-center h-full">
    <button className="rounded-lg bg-pink-600 p-3 text-white font-bold">
     Show More
    </button>
   </div>
  </>
 );
};

export default FeaturedRecipes;
