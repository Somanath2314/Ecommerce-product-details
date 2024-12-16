import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEmail } from '../../app/Slice/userSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Home() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch(); // useDispatch should be called outside of useEffect
  const email = useSelector((state) => state.user.email);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/getUserDetails", {
          withCredentials: true, // Include the cookie in the request
        }); 
        const userEmail = response.data.email.email;
        console.log(userEmail);

        setUser(userEmail); // Set user details

        // Dispatch action to add email to Redux store after setting state
        dispatch(addEmail({ email: userEmail }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    
    fetchUserDetails();
  }, [dispatch]); // Make sure useEffect only runs once

  return (
    <div>
      {isAuth ? (
        <h1>Welcome, {email}!</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
