import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import member1 from "../../assets/images/ayub.jpg";
import member2 from "../../assets/images/dan.jpg";
import member3 from "../../assets/images/purity.jpg";
import member4 from "../../assets/images/patricia.jpg";
import member5 from "../../assets/images/tutu.jpg";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF9] text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 px-6 md:px-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-center"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.15)" }}
          >
            LifeLink – Your Link to Someone’s Second Chance
          </h1>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#921223]">
              The Problem
            </h2>
            <p className="mb-3">
              The power to save a life is already in our hands, but the system is
              failing to let us use it. Mothers, fathers, and children across
              the nation are dying because hospitals can’t reach willing donors in time.
            </p>
            <p>
              Fragmented networks and a lack of real-time coordination create a
              deadly silence—a chasm between a hospital’s desperate plea and a
              donor’s willingness to give.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#921223]">
              Our Solution
            </h2>
            <p>
              LifeLink is a real-time, location-aware platform that connects
              hospitals, patients, and donors based on specific blood or blood
              component needs. Smart matching, instant alerts, and streamlined
              scheduling empower communities to respond faster and more
              efficiently to life-threatening situations.
            </p>
          </section>
          <section>
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#921223] mb-2">
             Our Mission
            </h3>
            <p>
             To bridge the critical gap between blood donors and patients in need by
             creating a fast, reliable, and transparent network that saves lives.
            </p>
         </div>
         </section>
        <section>
         <div>
            <h3 className="text-xl font-semibold text-[#921223] mb-2">Our Vision</h3>
             <p>
              A world where no patient dies because of delayed access to lifesaving blood
              or components — a connected community where every willing donor becomes a
             real-time hero.
            </p>
         </div>
        </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#921223]">
              Who Benefits
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Patients & Families:</strong> receive lifesaving blood
                components on time.
              </li>
              <li>
                <strong>Hospitals:</strong> gain access to a larger pool of
                ready donors.
              </li>
              <li>
                <strong>Donors:</strong> get timely, location-based alerts about
                urgent needs.
              </li>
              <li>
                <strong>Communities:</strong> build trust and solidarity through
                life-saving action.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#921223]">
              How It Works
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Hospitals post real-time requests for blood types/components.</li>
              <li>
                Donors in the right location and with the right type receive
                instant notifications.
              </li>
              <li>
                Donors confirm availability and schedule a donation within
                minutes.
              </li>
              <li>Hospitals track responses and coordinate transfusions.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#921223]">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div>
                <img
                  src={member1}
                  alt="Member 1"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-2 shadow-md"
                />
                <p className="font-semibold">Ayub Karanja</p>
                <p className="text-sm text-gray-500">Chief Visionary Officer</p>
              </div>
              <div>
                <img
                  src={member2}
                  alt="Member 2"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-2 shadow-md"
                />
                <p className="font-semibold">Daniel</p>
                <p className="text-sm text-gray-500">Backend Wizard</p>
              </div>
              <div>
                <img
                  src={member3}
                  alt="Member 3"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-2 shadow-md"
                />
                <p className="font-semibold">Purity</p>
                <p className="text-sm text-gray-500">Master of Frontend Magic</p>
              </div>
              <div>
                <img
                  src={member4}
                  alt="Member 4"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-2 shadow-md"
                />
                <p className="font-semibold">Patricia</p>
                <p className="text-sm text-gray-500">Design Alchemist</p>
              </div>
              <div>
                <img
                  src={member5}
                  alt="Member 5"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-2 shadow-md"
                />
                <p className="font-semibold">Justin Tutu</p>
                <p className="text-sm text-gray-500">LifeLink Architect</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
