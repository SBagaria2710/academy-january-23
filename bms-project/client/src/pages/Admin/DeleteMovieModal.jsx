import { Modal } from "antd";
import { deleteMovie } from "../../apicalls/movie";

function DeleteMovieModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  fetchAllMovies,
  selectedMovie,
  setSelectedMovie,
}) {
  const handleOK = async () => {
    try {
      setIsDeleteModalOpen(false);
      const movieId = selectedMovie._id;
      const response = await deleteMovie(movieId);
      if (response.success) {
        fetchAllMovies();
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      centered
      title="Delete Movie?"
      open={isDeleteModalOpen}
      onOk={handleOK}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">Are you sure you want to delete this movie?</p>
      <p className="pb3 fs-18">
        This action can't be undone and you'll lose this movie data.
      </p>
    </Modal>
  );
}

export default DeleteMovieModal;
