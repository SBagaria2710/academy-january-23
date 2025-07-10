import { axiosInstance } from ".";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (err) {
    return err;
  }
};

export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updateMovie = async (movieId, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/movies/update-movie/${movieId}`,
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/movies/delete-movie/${movieId}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/api/movies/movie/${movieId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};
