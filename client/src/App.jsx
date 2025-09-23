import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="min-h-screen p-4">
        <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
