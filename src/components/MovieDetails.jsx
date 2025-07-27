import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaClock,
  FaCalendarAlt,
  FaFilm,
  FaArrowLeft,
  FaHeart,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider"; // make sure this exists

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // get logged-in user

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://watchly-server.vercel.app/movies/${id}`);
        if (!response.ok) throw new Error("Movie not found");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleGoBack = () => navigate(-1);

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Delete Movie?",
      text: "This will permanently remove the movie.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://watchly-server.vercel.app/movies/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire("Deleted!", "Movie has been removed.", "success");
          navigate("/movies");
        } else {
          throw new Error("Failed to delete");
        }
      } catch (err) {
        Swal.fire("Error", "Could not delete the movie", "error");
      }
    }
  };

  const handleAddToFavorite = async () => {
    if (!user) {
      return Swal.fire("Unauthorized", "Please log in first", "warning");
    }

    const favoriteMovie = {
      ...movie,
      email: user.email,
    };

    try {
      const res = await fetch("https://watchly-server.vercel.app/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteMovie),
      });

      if (res.ok) {
        Swal.fire("Added!", "Movie added to your favorites", "success");
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire("Error", "Failed to add to favorites", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin h-10 w-10 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto text-center mt-10">
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={handleGoBack}
          className="mt-5 inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <button
          onClick={handleGoBack}
          className="mb-6 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden md:flex">
          <img
            src={movie.poster}
            alt={movie.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x450?text=No+Image+Available";
            }}
            className="w-full md:w-1/3 object-cover"
          />

          <div className="p-6 md:w-2/3 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1">
                <FaFilm /> {movie.genre}
              </span>
              <span className="flex items-center gap-1">
                <FaClock /> {movie.duration}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {movie.year}
              </span>
              <span className="flex items-center gap-1 text-yellow-500">
                <FaStar /> {movie.rating}/5
              </span>
            </div>

            {movie.summary && (
              <div>
                <h2 className="font-semibold text-lg mb-1">Synopsis</h2>
                <p className="text-gray-700 text-sm">{movie.summary}</p>
              </div>
            )}

            {/* ➕ Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
  onClick={handleDelete}
  disabled={user.email !== movie.userEmail}
  className={`flex items-center gap-2 px-4 py-2 rounded transition 
    ${
      user.email === movie.userEmail
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-gray-400 text-white cursor-not-allowed"
    }`}
>
  <FaTrash /> Delete Movie
</button>
              <button
                onClick={handleAddToFavorite}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <FaHeart /> Add to Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
