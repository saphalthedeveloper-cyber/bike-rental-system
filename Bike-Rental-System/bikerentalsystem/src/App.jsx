import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import About from './About';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Bikes from './Bikes';
import Booking from './Booking';
import AdminBikes from './admin/AdminBikes';
import AdminBooking from './admin/AdminBooking';
import BookingHistory from './BookingHistory';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/bikes" element={<Bikes />} />
                    <Route path="/booking/:bikeId" element={<Booking />} />
                    <Route path="/booking" element={<BookingHistory />} />
                    <Route path="/admin/bikes" element={<AdminBikes />} />
                    <Route path="/admin/bookings" element={<AdminBooking />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;