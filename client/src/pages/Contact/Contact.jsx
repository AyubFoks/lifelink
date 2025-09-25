import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-12 mt-20">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Contact Us</h1>
          <p className="text-center text-gray-600 mt-4">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mt-8 mb-4 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mt-8">Our Contact Information</h2>
              <p className="mt-2 flex items-center gap-2">
                <i className="fas fa-envelope text-[#921223]"></i> support@lifelink.org
              </p>
              <p className="mt-1 flex items-center gap-2">
                <i className="fas fa-phone text-[#921223]"></i> +254 700 000 000
              </p>
              <p className="mt-1 flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-[#921223]"></i> Lifelink Tower, Nairobi, Kenya
              </p>
            </div>
            <form className="mt-8 space-y-6 md:w-1/2">
              <div>
                <label htmlFor="name" className="block mb-2">Full Name</label>
                <input type="text" id="name" name="name" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea id="message" name="message" rows="4" className="w-full p-2 border rounded"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#921223] text-white p-2 rounded">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
