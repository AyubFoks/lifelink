import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import lifelinkMain from "../../assets/images/lifelink.jpg";
import lifelink1 from "../../assets/images/lifelink 1.jpg";
import lifelink2 from "../../assets/images/lifelink 2.jpg";
import lifelink3 from "../../assets/images/lifelink 3.jpg";
import lifelink4 from "../../assets/images/lifelink 4.jpg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ----------  HERO  ---------- */}
      <header id="about" className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-16 md:px-16 bg-gradient-to-r from-white to-gray-50">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black">
            Connecting Donors, Hospitals & Patients
          </h1>
          <p className="text-[#757575] md:text-lg max-w-xl">
            LifeLink bridges the gap between donors, hospitals, and patients, making life-saving resources accessible to those in need.
          </p>
        </div>

        <div className="flex-1">
          <img
            src={lifelinkMain}
            alt="About LifeLink"
            className="w-full h-80 object-cover rounded-xl shadow-lg"
          />
        </div>
      </header>

      {/* ----------  HOW IT WORKS  ---------- */}
      <section id="how" className="px-6 py-16 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-black mb-4">How LifeLink Works</h2>
        <p className="text-center text-[#757575] max-w-3xl mx-auto mb-10">
          LifeLink streamlines the process of connecting donors and hospitals, ensuring efficient and effective resource allocation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          {/* Step 1 */}
          <article>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-2xl font-bold text-black">1</div>
            <h3 className="text-xl font-semibold text-black mb-2">For Donors</h3>
            <p className="text-[#757575] text-sm">Donors register their willingness to contribute, specifying the types of resources they can provide.</p>
          </article>

          {/* Step 2 */}
          <article>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-2xl font-bold text-black">2</div>
            <h3 className="text-xl font-semibold text-black mb-2">For Hospitals</h3>
            <p className="text-[#757575] text-sm">Hospitals submit their urgent needs, detailing the required resources and the urgency of the situation.</p>
          </article>

          {/* Step 3 */}
          <article>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-2xl font-bold text-black">3</div>
            <h3 className="text-xl font-semibold text-black mb-2">Seamless Matching</h3>
            <p className="text-[#757575] text-sm">LifeLink's system matches donor resources with hospital needs, facilitating quick and direct communication.</p>
          </article>
        </div>
      </section>

      {/* ----------  BENEFITS  ---------- */}
      <section className="px-6 py-16 md:px-16 bg-gray-50">
        {/* Benefits for Donors */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-black mb-8">Benefits for Donors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <article className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center space-y-3">
              <img src={lifelink1} alt="Direct impact" className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold text-black">Direct Impact</h3>
              <p className="text-[#757575] text-sm">See exactly how your donation changes lives by viewing real-time updates on patients and hospitals you’ve supported.</p>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center space-y-3">
              <img src={lifelink2} alt="Community engagement" className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold text-black">Community Engagement</h3>
              <p className="text-[#757575] text-sm">Join a vibrant community of donors and healthcare providers, sharing stories and inspiring one another to give more.</p>
            </article>
          </div>
        </div>

        {/* Benefits for Hospitals */}
        <div>
          <h2 className="text-3xl font-bold text-center text-black mb-8">Benefits for Hospitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <article className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center space-y-3">
              <img src={lifelink3} alt="Resource availability" className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold text-black">Resource Availability</h3>
              <p className="text-[#757575] text-sm">LifeLink provides hospitals with access to a wider range of resources, ensuring they can meet patient needs.</p>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center space-y-3">
              <img src={lifelink4} alt="Improved patient care" className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold text-black">Improved Patient Care</h3>
              <p className="text-[#757575] text-sm">With access to more resources, hospitals can improve patient care and outcomes, saving more lives.</p>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}