import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaClock, FaCalendarAlt, FaFilm } from "react-icons/fa";

const FeaturedMovies = () => {
  const [topMovies, setTopMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://watchly-server.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.rating - a.rating);
        setTopMovies(sorted.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSeeDetails = (id) => navigate(`/movies/${id}`);
  

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl text-orange-600 font-bold text-center mb-8">
        🎬 Featured Movies Based on Top Rating
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {topMovies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-96 w-full object-cover rounded-t-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <div className="flex items-center text-sm gap-2 mt-2">
                <FaFilm className="text-gray-500" /> {movie.genre}
                <FaClock className="text-gray-500 ml-3" /> {movie.duration} mins
              </div>
              <div className="flex items-center text-sm gap-2 mt-1">
                <FaCalendarAlt className="text-gray-500" /> {movie.year}
                <FaStar className="text-yellow-500 ml-3" /> {movie.rating}/5
              </div>
              <button
                onClick={() => handleSeeDetails(movie._id)}
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMovies;
