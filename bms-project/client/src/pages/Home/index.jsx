import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from '../../apicalls/user';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Home useEffect");

    const fetchUserDetails = async () => {
      const response = await GetCurrentUser();
      console.log(response);
      if (!response.success) {
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <div>Home</div>
  )
}

export default Home