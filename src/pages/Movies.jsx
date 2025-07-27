import { useState, useEffect } from 'react';
import { FaStar, FaClock, FaCalendarAlt, FaFilm } from 'react-icons/fa';
import { MdOutlineMovie } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // NEW: control visible movies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies");
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSeeDetails = (movieId) => {
    navigate(`/movies/${movieId}`);
    toast.info(`Loading movie details...`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSeeAllMovies = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center text-orange-500">
        <MdOutlineMovie className="mr-2" /> All Movies
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.slice(0, visibleCount).map((movie) => (
          <div key={movie._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
              }}
              loading="lazy"
            />
            
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              
              <div className="flex items-center mb-1">
                <FaFilm className="text-gray-500 mr-2" />
                <span className="text-gray-700">{movie.genre}</span>
              </div>
              
              <div className="flex items-center mb-1">
                <FaClock className="text-gray-500 mr-2" />
                <span className="text-gray-700">{movie.duration}</span>
              </div>
              
              <div className="flex items-center mb-1">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span className="text-gray-700">{movie.year}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-500 mr-2" />
                <span className="text-gray-700">{movie.rating}/5</span>
              </div>
              
              <button
                onClick={() => handleSeeDetails(movie._id)}
                className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < movies.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleSeeAllMovies}
            className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg text-lg font-medium transition-colors duration-300 inline-flex items-center "
          >
            <MdOutlineMovie className="mr-2" /> See More Movies
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
