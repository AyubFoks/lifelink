# LifeLink

LifeLink is a real-time, location-aware platform that connects hospitals, patients, and donors based on specific blood or blood component needs. It streamlines the process of connecting donors and hospitals, ensuring efficient and effective resource allocation.

## Features

### Frontend
*   **User Authentication:** Donors and hospital administrators can register and log in.
*   **Donation Request Display:** Donors can view a list of blood donation requests from various hospitals.
*   **Donation Scheduling:** Donors can accept a donation request and schedule an appointment with the hospital.
*   **Donor Dashboard:** Displays donor's profile information and donation history.
*   **Hospital Dashboard:** Displays hospital's inventory and recent donation requests.
*   **Contact Page:** A form for users to send inquiries or feedback.
*   **Responsive Design:** Ensures a seamless experience across various devices.

### Backend
*   **User Management:** API endpoints for donor and hospital administrator registration and login.
*   **Profile Management:** API endpoint to retrieve user profile information.
*   **Blood Request Management:** API endpoints for creating, retrieving, and managing blood donation requests.
*   **Donation Management:** API endpoints for scheduling and tracking donations.
*   **Hospital Management:** API endpoints for managing hospital information.

## Technologies Used

### Frontend
*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** For declarative routing in React applications.
*   **Formik & Yup:** For form management and validation.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Font Awesome:** For scalable vector icons.
*   **Axios:** Promise-based HTTP client for the browser and Node.js.

### Backend
*   **Flask:** A micro web framework for Python.
*   **SQLAlchemy:** SQL toolkit and Object-Relational Mapper (ORM).
*   **Flask-Bcrypt:** Provides Bcrypt hashing utilities for Flask.
*   **Flask-JWT-Extended:** Adds JWT (JSON Web Token) support to Flask.
*   **Flask-Migrate:** Handles SQLAlchemy database migrations via Alembic.
*   **Flask-CORS:** A Flask extension for handling Cross Origin Resource Sharing (CORS).

## Setup Instructions

### Prerequisites
*   Node.js (LTS version recommended)
*   Python 3.8+
*   pipenv (for Python dependency management)

### 1. Clone the repository
```bash
git clone https://github.com/AyubFoks/lifelink.git
cd lifelink
```

### 2. Backend Setup
```bash
cd server
pipenv install
pipenv shell
flask db upgrade
python seed.py 
flask run
```

The backend server will run on `http://localhost:5000`.

### Environment variables (important)

The server uses an environment variable `FRONTEND_URL` to configure CORS allowed origins. When deploying, set this to your Vercel frontend URL so the API accepts browser requests from the deployed frontend.

Example values to set on Render (do NOT commit secrets to git):
- FRONTEND_URL=https://lifelink-gules.vercel.app/
- DATABASE_URI=postgresql://user:password@host:port/dbname
- SECRET_KEY=some-secret
- JWT_SECRET_KEY=some-jwt-secret

On the frontend (Vercel), set the following environment variable so the build knows the API base URL:
- VITE_API_URL=https://lifelink-backend-97rb.onrender.com/api

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The frontend application will run on `http://localhost:5173` (or another available port).

## Usage

1.  **Register/Login:** Navigate to `/register/donor` or `/register/hospital` to create an account, or `/login/donor` or `/login/hospital` to log in.
2.  **Browse Requests:** Donors can view available donation requests on the `/requests` page.
3.  **Schedule Donation:** Donors can accept a request and schedule an appointment.
4.  **Dashboards:** Access personalized dashboards for donors (`/dashboard/donor`) and hospitals (`/dashboard/hospital`).
5.  **Contact Us:** Use the `/contact` page to send messages to the administrators.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## Authors

1. [Patricia Njuguna](https://github.com/Ms-Njuguna)

2. [Daniel Muhia](https://github.com/Muhia88)

3. [Purity Okaroni](https://github.com/PrincessOkaroni)

4. [Ayub Karanja](https://github.com/AyubFoks)

5. [Justin Tutu](https://github.com/JustinTutu5100)

## License

This project is licensed under the MIT License.