import useFetch from '../useFetch';
import { API_URL } from '../config'

const AdminBookings = () => {
  const { data: bookings, loading, error } = useFetch(`${API_URL}/backend/admin/bookings`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!bookings || bookings.length === 0) return <p>No bookings yet.</p>;

  const handleDelete = (id) => {
    if (!window.confirm('Delete this booking?')) return;
        const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/backend/admin/bookings/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res=> res.json())
    .then(()=>{
       window.location.reload();
    }) 
      
    .catch(err => console.log(err));
  };

  return (
    <div className="admin-bookings">
      <h2>All Bookings</h2>
      
      <div className="bookings-grid">
        {bookings.bookings.map(booking => (
          booking.bikeId && (
            <div key={booking._id} className="booking-card">
              <img src={`/${booking.bikeId.image}`} alt={booking.bikeId.name} />
              <h3>{booking.bikeId.name}</h3>
              <p>Customer: {booking.name}</p>
              <p>From: {new Date(booking.fromDate).toLocaleDateString()}</p>
              <p>To: {new Date(booking.toDate).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(booking._id)}>Delete</button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
export default AdminBookings;