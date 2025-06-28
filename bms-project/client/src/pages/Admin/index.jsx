import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import MovieList from './MovieList';
import TheatreTable from './TheatreTable';
import { Tabs } from 'antd';

function Admin() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatreTable />,
    },
  ];

  useEffect(() => {
    if (user !== "null" && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <h1>Admin Page</h1>
      <Tabs items={tabItems} />
    </div>
  )
}

export default Admin