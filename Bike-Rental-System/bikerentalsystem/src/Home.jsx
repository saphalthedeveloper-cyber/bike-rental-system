import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom' 
const Home = () => {
  const { data: bikes, loading, error } = useFetch('http://localhost:3000/backend/home')
  
   const navigate = useNavigate()
  return (
    <div className="home">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <img src="/images/background.png" alt="background" className="backgroundimg"></img>
      <div className="featured">
        <h2>Featured Bikes</h2>
        <div className='images'>
          {bikes && bikes.map(bike => (
            <div key={bike._id} className='bike-card'>
              <img src={bike.image} alt="bike image" className='bikeimg' />
              <h3>{bike.name}</h3>
              <p>Price: {bike.pricePerDay}</p>
               <button
                disabled={bike.isBooked}
                  onClick={() => navigate(`/booking/${bike._id}`)}
              >
                {bike.isBooked ? 'Booked' : 'Book Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home


