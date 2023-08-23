import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const User = (props) => {
 const { id } = useParams();
 const [user, setUser] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const apiUrl = `http://localhost:8800/users/${id}`;
    const response = await axios.get(apiUrl);
    setUser(response.data[0]);
   } catch (error) {
    console.error("Error fetching user data:", error);
   }
  };

  fetchData();
 }, [id]);

 return (
  <div>
   <h1>User id: {id}</h1>
   {user && <div>{user.first_name}</div>}
  </div>
 );
};

export default User;
