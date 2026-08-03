import { Route, Routes } from 'react-router-dom';
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
import { useState } from 'react';
import useFetch from './useFetch';
import { useLocation } from 'react-router-dom';
import { API_URL } from './config'
function AppContent() {
    const [search, setSearch] = useState("");
    const token = localStorage.getItem('token');
    const { data: bikes , loading, error } = useFetch(token ?  `${API_URL}/backend/bikes` : null);
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';
    return (
        <>
            <Navbar
                search={search}
                onSearchChange={setSearch}
                bikes={bikes}
            />
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home search={search} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/bikes" element={<Bikes search={search}/>} />
                    <Route path="/booking/:bikeId" element={<Booking />} />
                    <Route path="/booking" element={<BookingHistory />} />
                    <Route path="/admin/bikes" element={<AdminBikes />} />
                    <Route path="/admin/bookings" element={<AdminBooking />} />
                </Routes>
            </div>
           {!isSignUpPage && !isLoginPage && <Footer/>}
        </>
    );
}

export default AppContent;