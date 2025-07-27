const WhyChooseUs = () => {
  return (
    <section className=" py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Why Choose Watchly?</h2>
        <p className="text-gray-700 text-lg mb-8">
          Watchly is your go-to movie portal that combines ease of use with powerful features.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">Curated Content</h3>
            <p>All movies are user-reviewed and rated. Discover only the best!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">Personal Favorites</h3>
            <p>Save and manage your favorite movies in one place.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">Seamless Experience</h3>
            <p>Simple interface with smooth navigation for all users.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
