import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const isOwner = token && role === "owner";
  const isRenter = token && role === "renter";

  const handleLogout = () => {
    localStorage.clear();
     navigate('/login');
  window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <img src="/images/logo.jpeg" alt="logo" className="logo" />
      <div className="classlink">
        {userName && <span>Welcome, {userName}</span>}

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
            <Link to="/">Home</Link>
            <Link to="/bikes">Browse Bikes</Link>
            <Link to="/about">About</Link>
            <Link to="/booking">My Bookings</Link>
          </>
        )}

        {token && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;