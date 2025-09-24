import Navbar from "../../components/common/Navbar/Navbar"
import Footer from "../../components/common/Footer/Footer"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
           <Navbar />
           <main className="py-20">
            <h1>The rest of the home page goes here</h1>
           </main>
           <Footer />
        </div>
    )
}