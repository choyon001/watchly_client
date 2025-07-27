import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaStar, FaClock, FaCalendarAlt, FaFilm, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Favourites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`http://localhost:5000/favorites/${user.email}`);
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchFavorites();
    }
  }, [user]);

  const handleRemove = async (favoriteId) => {
    const confirmed = await Swal.fire({
      title: "Remove from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/favorites/${favoriteId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
          Swal.fire("Removed!", "Movie removed from favorites.", "success");
        } else {
          throw new Error("Failed to remove favorite");
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin h-10 w-10 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600">Loading your favorite movies...</p>
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        You have no favorite movies yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((movie) => (
        <div
          key={movie._id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-60 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
            }}
          />
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{movie.title}</h2>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
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
                <FaStar /> {movie.rating}
              </span>
            </div>
            <Link
              to={`/movies/${movie.movieId || movie._id}`} // Use movieId if exists, fallback to _id
              className="inline-block mt-3 text-blue-600 hover:underline text-sm"
            >
              View Details
            </Link>

            <button
              onClick={() => handleRemove(movie._id)}
              className="mt-3 text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
            >
              <FaTrash /> Remove from Favorites
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Favourites;
