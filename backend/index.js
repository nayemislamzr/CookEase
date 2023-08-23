import express from "express";
import mysql from "mysql";
import cors from "cors";

const port = 8100;
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "2019331092",
 database: "CookEase",
});

app.listen(port, () => {
 console.log(`CookEase is alive at http://localhost:${port}`);
});

// get user by id
app.get("/users/:id", (req, res) => {
 const userId = req.params.id;
 const q = "select * from site_user where user_id=(?)";
 const values = [userId];
 db.query(q, [values], (err, data) => {
  if (err) return res.json(err);
  return res.json(data);
 });
});

// add user
app.post("/add_user", (req, res) => {
 const q =
  "insert into CookEase.site_user(`first_name`,`last_name`,`email`,`password`) values(?)";
 const values = [
  req.body.first_name,
  req.body.last_name,
  req.body.email,
  req.body.password,
 ];
 db.query(q, [values], (err, data) => {
  if (err) return res.json(err);
  return res.json("user has been added successfully");
 });
});

// login user
app.post("/login_user", (req, res) => {
 const q =
  "SELECT user_id, first_name, last_name, email, profile_pic_url FROM CookEase.site_user WHERE email = ? AND password = ?";
 const values = [req.body.email, req.body.password];

 db.query(q, values, (err, data) => {
  if (err) {
   console.error("Error logging in:", err);
   return res.status(500).json({ error: "Error logging in" });
  } else {
   if (data.length === 1) {
    return res.status(200).json(data[0]);
   } else {
    return res.status(401).json({ error: "Invalid credentials" });
   }
  }
 });
});

// get recent recipes
app.get("/recent_recipes", (req, res) => {
 const limit = 5; // Number of recent recipes to fetch

 // SQL query to select the 5 most recent recipes
 const query = `
        SELECT *
        FROM CookEase.recipe 
        ORDER BY post_time DESC 
        LIMIT ?;
    `;

 // Execute the SQL query with the specified limit
 db.query(query, [limit], (error, results) => {
  if (error) {
   console.error("Error fetching recent recipes:", error);
   // Handle the error here, e.g., send an error response
   res.status(500).json({ error: "Error fetching recent recipes" });
  } else {
   // Send the retrieved recent recipes as a JSON response
   res.status(200).json(results);
  }
 });
});

// app.get("/featured_recipes", (req, res) => {
// }

// get recipeInfo by id
// name, intro, instruction, cookingTime, cuisine, imageurl, likecount, commentcount
app.get("/recipe/:id", (req, res) => {
 const recipeId = req.params.id;
 const q1 = "SELECT * FROM CookEase.recipe where recipe_id=(?)";
 const q2 =
  "SELECT cuisine_name as cuisine FROM CookEase.cuisine where cuisine_id=(?)";
 const q3 =
  "SELECT media_url as imageUrl FROM CookEase.media where recipe_id=(?)";
 const q4 =
  "SELECT count(id) as likeCount FROM CookEase.recipe_reaction where type='like' and recipe_id=(?)";
 const q5 =
  "SELECT count(id) as commentCount FROM CookEase.recipe_comment where recipe_id=(?)";

 const result = {};

 db.query(q1, [recipeId], (err, data) => {
  if (err) {
   return next(err);
  }

  result.recipeId = data[0].recipe_id;
  result.name = data[0].name;
  result.cuisineId = data[0].cuisine_id;
  result.description = data[0].description;
  result.cookingTime = data[0].cooking_time;

  const { cuisineId } = result;

  db.query(q2, [cuisineId], (err, data) => {
   if (err) {
    return next(err);
   }

   result.cuisine = data[0].cuisine;

   db.query(q3, [recipeId], (err, data) => {
    if (err) {
     return next(err);
    }

    result.imageUrl = data[0].imageUrl;

    db.query(q4, [recipeId], (err, data) => {
     if (err) {
      return next(err);
     }

     result.likeCount = data[0].likeCount;

     db.query(q5, [recipeId], (err, data) => {
      if (err) {
       return res.json(err);
      }

      result.commentCount = data[0].commentCount;

      return res.json(result);
     });
    });
   });
  });
 });
});

const addIngredients = (ingredients, recipeId) => {
 ingredients.forEach((ingredient) => {
  const selectQuery =
   "SELECT ingredient_id FROM CookEase.ingredient WHERE ingredient_name = ?";

  db.query(selectQuery, [ingredient], (selectErr, selectData) => {
   if (selectErr) {
    console.error("Error selecting ingredient:", selectErr);
    // Handle the error here
   } else {
    if (selectData.length === 0) {
     // Ingredient doesn't exist, insert it
     const insertIngredientQuery =
      "INSERT INTO CookEase.ingredient (ingredient_name) VALUES (?)";

     db.query(insertIngredientQuery, [ingredient], (insertErr, insertData) => {
      if (insertErr) {
       console.error("Error inserting ingredient:", insertErr);
       // Handle the error here
      } else {
       const ingredientId = insertData.insertId;
       const insertRecipeIngredientQuery =
        "INSERT INTO CookEase.recipe_ingredient (recipe_id, ingredient_id) VALUES (?, ?)";

       db.query(
        insertRecipeIngredientQuery,
        [recipeId, ingredientId],
        (recipeIngredientErr) => {
         if (recipeIngredientErr) {
          console.error(
           "Error inserting recipe ingredient:",
           recipeIngredientErr
          );
          // Handle the error here
         }
        }
       );
      }
     });
    } else {
     // Ingredient already exists, insert the recipe-ingredient relationship
     const ingredientId = selectData[0].ingredient_id;
     const insertRecipeIngredientQuery =
      "INSERT INTO CookEase.recipe_ingredient (recipe_id, ingredient_id) VALUES (?, ?)";

     db.query(
      insertRecipeIngredientQuery,
      [recipeId, ingredientId],
      (recipeIngredientErr) => {
       if (recipeIngredientErr) {
        console.error(
         "Error inserting recipe ingredient:",
         recipeIngredientErr
        );
        // Handle the error here
       }
      }
     );
    }
   }
  });
 });
};

const addInstructionSteps = (steps, recipeId) => {
 steps.forEach((step, index) => {
  const q =
   "INSERT INTO CookEase.instruction_steps (recipe_id, step_number, step_description) VALUES (?, ?, ?)";
  db.query(q, [recipeId, index + 1, step], (error, results) => {
   if (error) {
    console.error("Error inserting instruction step:", error);
   }
  });
 });
};

const addImage = (image, recipeId) => {
 const q =
  "INSERT INTO CookEase.media (recipe_id, media_type, media_url) VALUES (?, ?, ?)";
 db.query(q, [recipeId, "image", image], (err, result) => {
  if (err) {
   console.error("Error inserting image:", err);
   // Handle the error here
  } else {
   //    console.log("Image inserted successfully.");
   // You can perform any additional actions on success here
  }
 });
};

//add recipe
app.post("/add_recipe", (req, res) => {
 const q =
  "insert into recipe(`name`,`cuisine_id`,`description`,`cooking_time`) values(?)";
 const values = [
  req.body.name,
  req.body.cuisine_id,
  req.body.description,
  req.body.cooking_time,
 ];
 db.query(q, [values], (err, data) => {
  if (err) return res.json(err);
  const recipeId = data.insertId;
  addImage(req.body.image, recipeId);
  addIngredients(req.body.ingredients, recipeId);
  addInstructionSteps(req.body.instructions, recipeId);
  return res.json(`successfuly added the recipe with id ${recipeId}`);
 });
});

// get all cuisines
app.get("/get_cuisines", (req, res) => {
 const q = "SELECT * FROM CookEase.cuisine";
 db.query(q, (error, results) => {
  if (error) {
   console.error("Error retrieving cuisines:", error);
   // Handle the error here, e.g., send an error response
   res.status(500).json({ error: "Error retrieving cuisines" });
  } else {
   // Send the retrieved cuisines as a JSON response
   res.status(200).json(results);
  }
 });
});

// get user from recipe_id
app.get("/user_by_recipe/:id", (req, res) => {
 const recipeId = req.params.id;
 const q =
  "SELECT q.user_id,q.first_name,q.last_name,q.email,q.profile_pic_url,q.is_active FROM CookEase.user_recipe as p inner join CookEase.site_user as q where p.user_id = q.user_id and p.recipe_id=(?)";
 db.query(q, [recipeId], (err, data) => {
  if (err) return res.json(err);
  return res.json(data[0]);
 });
});

app.get("/comments_by_post/:id", (req, res) => {
 const recipeId = req.params.id;
 const q1 =
  "SELECT user_id, comment_text, comment_time FROM CookEase.recipe_comment WHERE recipe_id = ?";
 const q2 =
  "SELECT first_name, last_name FROM CookEase.site_user WHERE user_id = ?";

 const result = [];

 db.query(q1, [recipeId], (err, comments) => {
  if (err) {
   return next(err);
  }

  // If there are no comments, return an empty array
  if (comments.length === 0) {
   return res.json(result);
  }

  let processedComments = 0;

  comments.forEach((comment) => {
   db.query(q2, [comment.user_id], (err, user) => {
    if (err) {
     return res.json(err);
    }

    const commentWithUser = {
     user: {
      user_id: comment.user_id,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
     },
     comment: {
      comment_text: comment.comment_text,
      comment_time: comment.comment_time,
     },
    };

    result.push(commentWithUser);

    processedComments++;

    if (processedComments === comments.length) {
     return res.json(result);
    }
   });
  });
 });
});

// get steps of a recipe
app.get("/steps/:id", (req, res) => {
 const recipeId = req.params.id;
 const q =
  "SELECT step_number,step_description FROM CookEase.instruction_steps where recipe_id=(?) order by step_number";
 db.query(q, [recipeId], (err, data) => {
  if (err) return res.json(err);
  return res.json(data);
 });
});

// get ingredients of a recipe
app.get("/ingredients/:id", (req, res) => {
 const recipeId = req.params.id;
 const q =
  "SELECT ingredient_name FROM CookEase.recipe_ingredient natural join CookEase.ingredient where recipe_id=(?)";
 db.query(q, [recipeId], (err, data) => {
  if (err) return res.json(err);
  return res.json(data);
 });
});