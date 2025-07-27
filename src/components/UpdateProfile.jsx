import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user,setUser,updateUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Check if values actually changed
  if (name === user.displayName && photo === user.photoURL) {
    Swal.fire({
      icon: "info",
      title: "No Changes",
      text: "You didn't make any changes!",
      confirmButtonColor: "#ea580c",
    });
    setLoading(false);
    return;
  }

  const updatedUser = {
    email: user.email,
    name,
    photoURL: photo,
  };

  try {
    const res = await fetch("http://localhost:5000/users/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Update failed");

    if (data.modifiedCount > 0) {
        setUser((prev) => ({
          ...prev,
            displayName: name,
            photoURL: photo,
        }));
        await updateUser({ displayName: name, photoURL: photo });
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#ea580c",
      });
      // Optionally update context/local state here
    } else {
      Swal.fire({
        icon: "info",
        title: "No Changes Made",
        text: data.message || "Profile data was identical",
        confirmButtonColor: "#ea580c",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: error.message,
      confirmButtonColor: "#ea580c",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-6 flex items-center gap-2 justify-center">
          <FaUserEdit /> Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter your profile photo URL"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
