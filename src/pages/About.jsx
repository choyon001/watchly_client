const About = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-6">About Watchly</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          <span className="font-bold text-orange-600">Watchly</span> is your ultimate movie companion. From discovering new films to managing your personal favorites, we bring a smooth, interactive, and modern experience built for every movie lover.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-10 text-left">
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-orange-50">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">🎯 Project Theme</h2>
            <p className="text-gray-700">
              Watchly is built to simplify movie exploration and management. You can browse details, add your own movie entries, and keep your personal list of favorites—effortlessly.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-orange-50">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">💡 Key Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Add and view movies with detailed info</li>
              <li>Mark movies as favorite</li>
              <li>Remove movies from your favorites</li>
              <li>Modern and responsive design</li>
              <li>Secure user login and registration</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-orange-100 p-6 rounded-xl shadow-inner">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">✨ Why Watchly?</h2>
          <p className="text-gray-700">
            We believe in making your movie browsing and sharing experience delightful. Whether you're a movie critic, casual viewer, or aspiring filmmaker, Watchly provides a beautiful and practical platform to manage your movie interests.
          </p>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          <p>
            Created with ❤️ by <span className="text-orange-600"> Dewan Monjur Elahi Choyon</span> – Powered by MERN Stack.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
