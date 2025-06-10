import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-white py-16 shadow-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Rateguard Analytics</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rateguard Analytics is on a mission to transform how individuals navigate insurance decisions using the power of AI.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower users with intelligent tools that help them understand, compare, and choose the best insurance policies — faster, smarter, and with confidence.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where insurance is transparent and accessible — where people make informed decisions, backed by data and guided by simplicity.
            </p>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-blue-300 transition">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">
                We use advanced AI models to summarize policies, highlight key features, and reduce information overload.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-blue-300 transition">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Smart Comparisons</h3>
              <p className="text-gray-600">
                Compare multiple plans side-by-side with personalized recommendations based on your needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-blue-300 transition">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">User-Centric Design</h3>
              <p className="text-gray-600">
                A sleek and simple interface focused on real user problems, not just flashy features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-blue-300 transition">
              <img
                src="/images/anmol.jpg"
                alt="Anmol Sharma"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold text-blue-700">Anmol Sharma</h4>
              <p className="text-sm text-gray-500">AI Specialist</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-blue-300 transition">
              <img
                src="/images/adarsh.jpg"
                alt="Adarsh Rathore"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold text-blue-700">Adarsh Rathore</h4>
              <p className="text-sm text-gray-500">Lead Developer</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-blue-300 transition">
              <img
                src="/images/amol.jpg"
                alt="Amol Thakur"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold text-blue-700">Amol Thakur</h4>
              <p className="text-sm text-gray-500">Product Manager</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;