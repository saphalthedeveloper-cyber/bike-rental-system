import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom'

const Bikes = ({search}) => {
  const { data: bikes, loading, error } = useFetch('http://localhost:3000/backend/bikes')
   const navigate = useNavigate()
    const filteredBikes = (bikes || []).filter((bike) =>
    bike.name.toLowerCase().includes(search.toLowerCase())
   );
  return (
    <div className="home">
      <h2>Bikes</h2>
      {loading && <p className='loading'></p>}
      {error && <p className="error" >Something went wrong</p>}
      <div className="featured">
        
          <div className='no-bike'>
   {filteredBikes.length === 0 && search.trim() !== "" && (
          <p>No bikes found.</p>
        )}
        </div>
        <div className="images">
          
          {filteredBikes.map((bike) => (
  <div key={bike._id} className="bike-card">
    <img src={bike.image} alt="bike" className="bikeimg" />
    <h3>{bike.name}</h3>
    <p>Price: {bike.pricePerDay}</p>

    <button
      disabled={bike.isBooked}
      onClick={() => navigate(`/booking/${bike._id}`)}
      style={{ display: localStorage.getItem("token") ? "block" : "none" }}
    >
      {bike.isBooked ? "Booked" : "Book Now"}
    </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bikes   