import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import DonationHistoryItem from "../../components/cards/DonationHistoryItem";
import RequestCard from "../../components/cards/RequestCard";

export default function TestPage() {
    const mockDonation = {
        date: "2024-01-15T10:30:00Z",
        status: "Completed",
        recipientName: "John Doe",
        bloodType: "A+",
        location: "City Hospital",
    };

    const mockRequest = {
        logo: "/client/src/assets/images/general-hospital.png",
        hospitalName: "General Hospital",
        bloodTypes: ["A+", "O-"],
        donationType: "Whole Blood",
        location: "123 Main St, Anytown, USA",
        status: "Urgent",
        dateNeeded: "2024-03-01",
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="py-20">
                <DonationHistoryItem donation={mockDonation} />
                <RequestCard {...mockRequest} />
            </main>
            <Footer />
        </div>
    );
}