import { Link } from 'react-router-dom'
import useFetch from './useFetch'

const BookingHistory = () => {
  const { data, loading, error } = useFetch('http://localhost:3000/backend/bookings')
  const bookings = (data && data.bookings)|| [];

  return (
    <div>
      <h1 className="nobooking-title">BOOKING HISTORY</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}

      {bookings.length === 0 && !loading && (
        <div className="no-bookings">
          <p>No bookings yet. <Link to="/bikes">Book a bike!</Link></p>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="images">
          {bookings.map(booking => (
            <div key={booking._id} className="bike-card">
              <img
                src={booking.bikeId?.image}
                alt={booking.bikeId?.name}
                className="bikeimg"
              />
              <h3>{booking.bikeId?.name}</h3>
              <p>Color: {booking.bikeId?.color}</p>
              <p>Rs. {booking.bikeId?.pricePerDay} / day</p>
              <p>From: {booking.fromDate}</p>
              <p>To: {booking.toDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookingHistory