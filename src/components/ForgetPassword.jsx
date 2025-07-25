import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";


const ForgetPassword = () => {
    const { forgetPassword, setLoading } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        setLoading(true);
        forgetPassword(email)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Reset Link Sent",
                    text: "Please check your email for the reset link.",
                });
                form.reset();
            })
            .catch((error) => {
                console.error("Error sending reset link:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
       <div className=" min-h-screen ">
         <div className="max-w-md mx-auto p-6 bg-white md:border-2  md:border-orange-200 rounded-lg mt-10 mb-10 ">
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Reset Password 
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
        
        

        <button
          type="submit"
          className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
        >
            Send Reset Link
        </button>
      </form>
      
    </div>
       </div>
    );
};

export default ForgetPassword;