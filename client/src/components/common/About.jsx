import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function About() {
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="py-20">
                <h1>About lifelink and how it works</h1>
            </main>
            <Footer/>
        </div>
    )
}