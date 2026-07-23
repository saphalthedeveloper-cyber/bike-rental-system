import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar'
import SearchResultList from "./SearchResultList";

const Navbar = ({search,onSearchChange,bikes=[]}) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isHomePage = location.pathname === '/';
  const isBikePage = location.pathname === '/bikes';



  const isOwner = token && role === "owner";
  const isRenter = token && role === "renter";

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
      <img src="/images/logo.jpeg" alt="logo" className="logo" />
       <div className="search-wrapper" style={{ position: "relative" }}>
      { token && <SearchBar search={search} onSearchChange={onSearchChange} /> }
      <SearchResultList search={search} bikes={bikes} onSearchChange={onSearchChange}/>
    </div>
      </div>     
      <div className="classlink">
       
        {userName && !isLoginPage && <span>Welcome, {userName}</span>}
       
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {isOwner && (
          <>
            <Link to="/admin/bikes">Manage Bikes</Link>
            <Link to="/admin/bookings">All Bookings</Link>
          </>
        )}

        {isRenter && (
          <>
            <Link to="/" className="home">Home</Link>
            <Link to="/bikes">Bikes</Link>
            <Link to="/about" className="nav-about">About</Link>
            <Link to="/booking" className="nav-booking">My Bookings</Link>
          </>
        )}

        {token && !isLoginPage && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;