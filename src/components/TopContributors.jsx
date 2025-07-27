import { useEffect, useState } from "react";

const TopContributors = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/top-contributors")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch top contributors:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-12 ">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-8">👑 Top Contributors</h2>

        {loading ? (
          <p className="text-gray-600">Loading contributors...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-600">No contributors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.map((user, idx) => (
              <div
                key={idx}
                className="bg-orange-100 p-6 rounded-lg shadow hover:shadow-md transition text-gray-800"
              >
                <h3 className="text-xl font-semibold break-words">{user.email}</h3>
                <p className="text-sm mt-2">
                  🎬 Movies Uploaded: <strong>{user.count}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopContributors;
