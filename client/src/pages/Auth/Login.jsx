import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import  {Link, useNavigate, useParams }  from 'react-router-dom';

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="py-25">
                <div className="w-1/2 mx-auto text-center">
                    <h1 className="font-bold text-3xl">Log In to Your 'user' Account</h1>
                    <div className="flex gap-1 text-lg justify-center">
                        <h3>Don't have an account?</h3>
                        <Link to='/register' className="text-[#921223] underline">Sign up here</Link>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}