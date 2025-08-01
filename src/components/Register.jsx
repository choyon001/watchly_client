import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "./../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import Swal from "sweetalert2";
const Register = () => {
  const {
    createNewUser,
    updateUser,
    setUser,
    googleSignIn,
    loading,
    setLoading,
  } = useContext(AuthContext);
  // make password error state
  const [passwordError, setPasswordError] = useState("");
  // creating navigate so that redirect
  const navigate = useNavigate();
  // creating a valid password function
  const validatePassword = (password) => {
    let isValid = true;
    let errorMessage = "";

    // Minimum length requirement
    if (password.length < 8) {
      isValid = false;
      errorMessage = "Password must be at least 8 characters long.";
    }
    // At least one uppercase letter
    else if (!/[A-Z]/.test(password)) {
      isValid = false;
      errorMessage = "Password must contain at least one uppercase letter.";
    }
    // At least one lowercase letter
    else if (!/[a-z]/.test(password)) {
      isValid = false;
      errorMessage = "Password must contain at least one lowercase letter.";
    }
    // At least one number
    else if (!/[0-9]/.test(password)) {
      isValid = false;
      errorMessage = "Password must contain at least one number.";
    }
    // At least one special character
    else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      isValid = false;
      errorMessage = "Password must contain at least one special character.";
    }
    // Check for common passwords (very basic example)
    else if (
      ["password", "123456", "qwerty"].includes(password.toLowerCase())
    ) {
      isValid = false;
      errorMessage = "Password is too common and easily guessable.";
    }
    // Check for repeated characters
    else if (/(.)\1{3,}/.test(password)) {
      isValid = false;
      errorMessage = "Password contains too many repeated characters.";
    }

    setPasswordError(errorMessage);
    return isValid;
  };

  // handle google sign in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        // save the user to the database
        updateUser({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
          .then(() => {
            const userData = {
              displayName: result.user.displayName || "Anonymous",
              email: result.user.email,
              photoURL:
                result.user.photoURL ||
                "https://i.ibb.co/4f1z5x3/default-profile-picture.png",
              createdDate: result.user.metadata.creationTime,
            };
            fetch("https://watchly-server.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
          });

        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
        });
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleNewUser = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = form.get("name");
    const email = form.get("email");
    const photoUrl = form.get("photoUrl");
    const password = form.get("password");

    // Validate the password
    if (!validatePassword(password)) {
      return;
    }
    // set a loader
    setLoading(true);
    createNewUser(email, password)
      .then((result) => {
        setUser(result.user);
        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
           
            const userData = {
              displayName: name || "Anonymous",
              email: email,
              photoURL:
                photoUrl ||
                "https://i.ibb.co/4f1z5x3/default-profile-picture.png",
              createdDate: result.user.metadata.creationTime,
            };
            fetch("https://watchly-server.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
            navigate("/");
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "Welcome to Watchly!",
            });

            event.target.reset();
          })
          .catch((error) => {
            
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: "Could not update user profile.",
            });
          });
      })
      .catch((error) => {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `<p class="text-red-500">${error.message}</p>`, 
          
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white md:border-2  md:border-orange-200 rounded-lg mt-10 mb-10">
      {/* loader */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <RingLoader color="#F97316" size={60} />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Register for Watchly
      </h2>
      <form onSubmit={handleNewUser} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded  focus:outline-none  focus:border-orange-200"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded  focus:outline-none  focus:border-orange-200"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            className="w-full px-3 py-2 border rounded  focus:outline-none  focus:border-orange-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" autocomplete="">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded  focus:outline-none  focus:border-orange-200"
            required
            onChange={(e) => validatePassword(e.target.value)}
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
        >
          Register
        </button>
      </form>
      <div className="mb-6 mt-6">
        <button
          className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-orange-600 text-white 
              font-semibold rounded  hover:bg-orange-700 transition 
                "
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm sm:text-base">Register with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
