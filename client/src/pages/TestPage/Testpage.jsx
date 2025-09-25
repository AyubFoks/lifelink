import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import DonationHistoryItem from "../../components/cards/DonationHistoryItem";
import RequestCard from "../../components/cards/RequestCard";
import DonorHistory from "../../components/cards/DonorHistory";
import HospitalDonationHistory from "../../components/cards/HospitalDonationHistory";

export default function TestPage() {
    const mockDonations = [
        {
            date: "2024-01-15T10:30:00Z",
            status: "Completed",
            recipientName: "John Doe",
            bloodType: "A+",
            location: "City Hospital",
        },
        {
            date: "2024-01-20T14:00:00Z",
            status: "Completed",
            recipientName: "Jane Smith",
            bloodType: "B-",
            location: "General Hospital",
        },
        {
            date: "2024-02-01T09:00:00Z",
            status: "Completed",
            recipientName: "Peter Jones",
            bloodType: "O+",
            location: "St. Mary's Hospital",
        },
        {
            date: "2024-02-10T11:30:00Z",
            status: "Completed",
            recipientName: "Mary Johnson",
            bloodType: "AB+",
            location: "County Hospital",
        },
        {
            date: "2024-02-15T16:00:00Z",
            status: "Completed",
            recipientName: "David Williams",
            bloodType: "A-",
            location: "Childrens Hospital",
        },
        {
            date: "2024-02-20T13:00:00Z",
            status: "Completed",
            recipientName: "Sarah Brown",
            bloodType: "B+",
            location: "City Clinic",
        },
        {
            date: "2024-03-01T10:00:00Z",
            status: "Scheduled",
            recipientName: "Michael Davis",
            bloodType: "O-",
            location: "General Hospital",
        },
        {
            date: "2024-03-05T15:00:00Z",
            status: "Scheduled",
            recipientName: "Emily Miller",
            bloodType: "A+",
            location: "City Hospital",
        },
        {
            date: "2024-03-10T12:00:00Z",
            status: "Scheduled",
            recipientName: "Jessica Wilson",
            bloodType: "B-",
            location: "St. Mary's Hospital",
        },
        {
            date: "2024-03-15T14:30:00Z",
            status: "Cancelled",
            recipientName: "Christopher Moore",
            bloodType: "O+",
            location: "County Hospital",
        },
    ];

    const mockRequests = [
        {
            request: {
                id: 1,
                blood_type: "A+",
                donation_type: "Whole Blood",
                urgency: "Urgent",
                date_needed: "2024-03-01",
            },
            hospital: {
                id: 1,
                name: "General Hospital",
                address: "123 Main St, Anytown, USA",
            },
        },
        {
            request: {
                id: 2,
                blood_type: "B+",
                donation_type: "Platelets",
                urgency: "Open",
                date_needed: "2024-03-05",
            },
            hospital: {
                id: 2,
                name: "City Clinic",
                address: "456 Oak Ave, Anytown, USA",
            },
        },
    ];

    const donorHistory = [
        { date: "2023-01-15", hospital: "General Hospital", donationType: "Whole Blood" },
        { date: "2023-05-20", hospital: "City Clinic", donationType: "Platelets" },
        { date: "2023-09-10", hospital: "St. Mary's Hospital", donationType: "Plasma" },
    ];

    const hospitalDonationHistory = [
        { date: "2023-01-15", donationType: "Whole Blood", donorName: "John Doe", bloodGroup: "A+" },
        { date: "2023-01-16", donationType: "Platelets", donorName: "Jane Smith", bloodGroup: "B-" },
        { date: "2023-01-17", donationType: "Plasma", donorName: "Peter Jones", bloodGroup: "O+" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="py-20">
                <div>
                    <h2>Donation History</h2>
                    {mockDonations.map((donation, index) => (
                        <DonationHistoryItem key={index} donation={donation} />
                    ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {mockRequests.map((data, index) => (
                        <RequestCard key={index} request={data.request} hospital={data.hospital} />
                    ))}
                </div>
                <DonorHistory donations={donorHistory} />
                <HospitalDonationHistory donations={hospitalDonationHistory} />
            </main>
            <Footer />
        </div>
    );
}