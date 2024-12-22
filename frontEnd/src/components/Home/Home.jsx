import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmail } from '../../app/Slice/userSlice';
import axios from 'axios';

function Home() {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState(null); // State to store the API key
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    // Fetch user details
    async function fetchUserDetails() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/getUserDetails', {
          withCredentials: true, // Include the cookie in the request
        });
        const userEmail = response.data.email.email;
        console.log(userEmail);

        setUser(userEmail); // Set user details
        dispatch(addEmail({ email: userEmail })); // Dispatch action to store email in Redux
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchUserDetails();

    // Fetch API key after the user details
    async function fetchApiKey() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/getApiKey', {
          withCredentials: true,
        });
        setApiKey(response.data.apiKey); // Store API key in state
      } catch (error) {
        console.log('Error fetching the API key', error);
      }
    }

    fetchApiKey();
  }, [dispatch]);

  return (
    <div>
      {isAuth ? (
        <h1>Welcome, {email}!</h1>
      ) : (
        <p>Loading...</p>
      )}

      {/* Render API key once it's fetched */}
      {apiKey ? (
        <h2>This is your API key: {apiKey}</h2>
      ) : (
        <p>Loading API key...</p>
      )}
    </div>
  );
}

export default Home;
