import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";

export default function Register() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="py-25">This is the register page</main>
            <Footer/>
        </div>
    )
}