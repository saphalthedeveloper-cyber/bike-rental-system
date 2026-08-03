import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { API_URL } from './config'
const Home = ({search}) => {

  const navigate = useNavigate();

     const { data: bikes, loading, error } = useFetch(`${API_URL}/backend/home`);

  const filteredBikes = (bikes || []).filter((bike) =>
    bike.name.toLowerCase().includes(search.toLowerCase())
   );
  
   


 return (
  <div className="home">
    {loading && <p className='loading'></p>}
    {error && <p className="error" > ⚠️ Something went wrong</p>}

    <img
      src="/images/background.png"
      alt="background"
      className="backgroundimg"
    />

    <div className="featured">
      <h2>Featured Bikes</h2>
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
            onClick={() => {const token=localStorage.getItem("token")
               if (!token) {
              navigate('/login')
             }else{
               navigate(`/booking/${bike._id}`)}}
              }
            >
              {bike.isBooked ? "Booked" : "Book Now"}
              
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Home;