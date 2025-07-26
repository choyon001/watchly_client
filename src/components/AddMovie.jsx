import { useContext, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
const AddMovie = () => {
    // to save the value of the form 
    const {user} = useContext(AuthContext);
    const currentUser = user || { email:"Not Given" };
  const [formData, setFormData] = useState({
    poster: "",
    title: "",
    genre: "",
    duration: "",
    year: "",
    rating: 0,
    summary: "",
  });

  const [errors, setErrors] = useState({
    poster: "",
    title: "",
    genre: "",
    duration: "",
    year: "",
    rating: "",
    summary: "",
  });

  const genres = [
    "Comedy",
    "Drama",
    "Horror",
    "Action",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Fantasy",
  ];
  const years = Array.from({ length: 15 }, (_, i) => 2025 - i);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Poster validation (must be a URL)
    if (!formData.poster) {
      newErrors.poster = "Poster URL is required";
      isValid = false;
    } else if (!/^https?:\/\/.+\..+/.test(formData.poster)) {
      newErrors.poster = "Please enter a valid URL";
      isValid = false;
    } else {
      newErrors.poster = "";
    }

    // Title validation (at least 2 chars)
    if (!formData.title || formData.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
      isValid = false;
    } else {
      newErrors.title = "";
    }

    // Genre validation
    if (!formData.genre) {
      newErrors.genre = "Please select a genre";
      isValid = false;
    } else {
      newErrors.genre = "";
    }

    // Duration validation (number > 60)
    if (
      !formData.duration ||
      isNaN(formData.duration) ||
      Number(formData.duration) <= 60
    ) {
      newErrors.duration = "Duration must be more than 60 minutes";
      isValid = false;
    } else {
      newErrors.duration = "";
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = "Please select a release year";
      isValid = false;
    } else {
      newErrors.year = "";
    }

    // Rating validation
    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating";
      isValid = false;
    } else {
      newErrors.rating = "";
    }

    // Summary validation (at least 10 chars)
    if (!formData.summary || formData.summary.length < 10) {
      newErrors.summary = "Summary must be at least 10 characters";
      isValid = false;
    } else {
      newErrors.summary = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
    //   backend code for the adding movie 
        try {
            const response = await fetch("http://localhost:5000/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    userEmail: currentUser.email
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Movie added:", data);
            // Handle success (e.g., redirect or show success message)

            console.log("Form data:", formData);
            //   adding a success message
            toast.success("Movie added successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Reset form after successful submission
            setFormData({
                poster: "",
                title: "",
                genre: "",
                duration: "",
                year: "",
                rating: 0,
                summary: "",
            });
        } catch (error) {
            console.error("Error adding movie:", error);
            toast.error("Failed to add movie. Please try again.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }
    } else {
      toast.error("Please fix the errors in the form", {
        position: "top-center", 
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRating = (rate) => {
    setFormData({
      ...formData,
      rating: rate,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500 ">Add New Movie</h1>

      <form
        onSubmit={handleSubmit}
        className="card bg-base-200 shadow-xl p-6 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Movie Poster */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Movie Poster URL</span>
            </label>
            <input
              type="text"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
              className={`input input-bordered ${
                errors.poster && "input-error"
              }`}
            />
            {errors.poster && (
              <span className="text-error text-sm">{errors.poster}</span>
            )}
          </div>

          {/* Movie Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Movie Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter movie title"
              className={`input input-bordered ${
                errors.title && "input-error"
              }`}
            />
            {errors.title && (
              <span className="text-error text-sm">{errors.title}</span>
            )}
          </div>

          {/* Genre */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`select select-bordered ${
                errors.genre && "select-error"
              }`}
            >
              <option value="">Select a genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && (
              <span className="text-error text-sm">{errors.genre}</span>
            )}
          </div>

          {/* Duration */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Duration (minutes)</span>
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="120"
              className={`input input-bordered ${
                errors.duration && "input-error"
              }`}
            />
            {errors.duration && (
              <span className="text-error text-sm">{errors.duration}</span>
            )}
          </div>

          {/* Release Year */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Release Year</span>
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`select select-bordered ${
                errors.year && "select-error"
              }`}
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.year && (
              <span className="text-error text-sm">{errors.year}</span>
            )}
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <div className="flex items-center gap-2">
              <Rating
                onClick={handleRating}
                initialValue={formData.rating}
                size={30}
                iconsCount={5}
                transition
                fillColor="#FFD700" // Gold color
                emptyColor="#D1D5DB" // Light gray
                allowFraction={true}
                SVGstyle={{ display: "inline-block" }}
              />
              <span className="ml-2 text-lg font-medium">
                {formData.rating > 0 ? `${formData.rating}/5` : "Not rated"}
              </span>
            </div>
            {errors.rating && (
              <span className="text-error text-sm">{errors.rating}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="form-control mt-6">
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Enter movie summary"
            className={`textarea textarea-bordered h-24 ${
              errors.summary && "textarea-error"
            }`}
          ></textarea>
          {errors.summary && (
            <span className="text-error text-sm">{errors.summary}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-8">
          <button type="submit" className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition ">
            Add Movie
          </button>
        </div>
      </form>

       <ToastContainer/>
    </div>
  );
};

export default AddMovie;
