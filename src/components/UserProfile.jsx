import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="flex justify-center items-center    lg:px-8 min-h-screen ">
      <div className="bg-orange-50 w-full max-w-xs md:max-w-xl p-6 sm:p-10 rounded-2xl shadow-lg text-center">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt={user?.displayName || "User Avatar"}
            className="w-16 h-16 rounded-full mb-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150?text=No+Avatar";
            }}
            />
          <h2 className="text-2xl  font-bold text-gray-800 mb-2">
            {user?.displayName || "Anonymous User"}
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2 text-sm sm:text-base">
            <FaEnvelope className="text-orange-400" /> {user?.email || "Not available"}
          </p>
        </div>

        <div className="mt-6 border-t pt-4 text-left">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📋 Profile Info</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li><strong>Joined:</strong> {user?.metadata?.creationTime?.split(",") || "N/A"}</li>
            <li><strong>UID:</strong> {user?.uid || "N/A"}</li>
            <li><strong>Status:</strong> <span className="text-green-600 font-medium">Active</span></li>
          </ul>
        </div>

        <div className="mt-6">
          <Link to="/auth/updateProfile"
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-lg transition w-auto"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
