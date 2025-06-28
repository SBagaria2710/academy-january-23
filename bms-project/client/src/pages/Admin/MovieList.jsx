import React, { useState, useEffect } from "react";
import { getAllMovies } from "../../apicalls/movie";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";
import moment from "moment";

function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (url) => <img src={url} alt="poster" width={50} />,
    },
    {
      title: "Movie Name",
      dataIndex: "movieName",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
    },
    {
      title: "Duration (in mins)",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (value) => {
        return moment(value).format("MM-DD-YYYY");
      }
    },
    {
      title: "Actions",
      render: (_, rowObj) => {
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedMovie(rowObj);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(rowObj);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const fetchAllMovies = async () => {
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map((movie) => ({ ...movie, key: `movie_${movie._id}` }))
    );
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end mb-10px">
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add Movie
        </Button>
      </div>
      <Table columns={columns} dataSource={movies} />
      {isModalOpen && (
        <MovieForm
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          fetchAllMovies={fetchAllMovies}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          fetchAllMovies={fetchAllMovies}
        />
      )}
    </div>
  );
}

export default MovieList;
