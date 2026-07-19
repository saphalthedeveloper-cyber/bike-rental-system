import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from './UseFetch'

const Booking = () => {
  const { bikeId } = useParams()
  const navigate = useNavigate()

  const { data, loading, error } = useFetch(`http://localhost:3000/backend/booking/${bikeId}`)
 const bike = data && data.bikes;
 const user = data && data.user;
 const pricePerDay = (bike && bike.pricePerDay) || 0;


  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:3000/backend/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          bikeId,
          name,
          phone,
          bikeName: bike.bikeName,
          fromDate,
          toDate,
          pricePerDay: bike.pricePerDay,
          totalPrice
        })
      })

      const data = await res.json()
      console.log(data)

      if (data.success) {
        alert('Bike booked successfully!')
        navigate('/')
      }

    } catch (err) {
      console.log(err)
    }
  }

useEffect(()=>{
  if(fromDate && toDate){
     const days=(new Date(toDate)-new Date(fromDate))/86400000;
     const priceFromDB=pricePerDay
    const totalPrice=days*priceFromDB;
    setPrice(totalPrice);
  }
 
},[fromDate,toDate,pricePerDay]);

  return (
    <div id="contact-info">
      <h2>CONTACT DETAILS</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}

      {bike && (
        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Bike</label>
          <input
            type="text"
            value={bike.name}
            readOnly
          />

          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />

          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />

          <label>Price Per Day</label>
          <input
            type="text"
            value={`Rs. ${bike.pricePerDay}`}
            readOnly
          />
             <label>Total Price</label>
          <input
            type="text"
            value={`Rs. ${price}`}
            readOnly
          />

          <button type="submit">Book Now</button>
        </form>
      )}
    </div>
  )
}

export default Booking