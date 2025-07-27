import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { RingLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const { signInUser, loading, setLoading, googleSignIn, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoading(true);
    signInUser(email, password)
      .then(async (result) => {
        const user = result.user;
        // console.log("Last sign-in time:", user.metadata.lastSignInTime);

        const response = await fetch(`http://localhost:5000/users`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            lastLogin: user.metadata.lastSignInTime,
          }),
        });

        if (!response.ok) throw new Error("Failed to update login time");

        setUser(user);
        navigate("/");
        Swal.fire("Login Successful", "Welcome back!", "success");
      })
      .catch((error) => {
        Swal.fire("Login Failed", error.message, "error");
        // console.error("Login error:", error);
      })
      .finally(() => setLoading(false));
  };

  //   handle google sign in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // save the user to the database
        fetch(`http://localhost:5000/users`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            lastLogin: user.metadata.lastSignInTime,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            // console.log("User data updated successfully");
          })
          .catch((error) => {
            // console.error("Error updating user data:", error);
          });
          
        // console.log("User logged in with Google:", user);
        setUser(user);
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
        });
      })
      .catch((error) => {
        // console.error("Error logging in with Google:", error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
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
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Login to Watchly
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none  focus:border-orange-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none  focus:border-orange-200"
          />
        </div>
        <div className="mb-4 text-right">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-orange-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
        >
          Login
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
          <span className="text-sm sm:text-base">Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
