import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from './useFetch'
import { API_URL } from './config'

const Booking = () => {
  const { bikeId } = useParams()
  const navigate = useNavigate()

  const { data, loading, error } = useFetch(`${API_URL}/backend/booking/${bikeId}`)
  const bike = data && data.bikes;
  const user = data && data.user;
  const pricePerDay = (bike && bike.pricePerDay) || 0;


  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [price, settotalPrice] = useState('0');
  const [image, setImage] = useState('')
  const [bookingError, setBookingError] = useState('')


  const today = new Date().toISOString().split('T')[0];


  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`${API_URL}/backend/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bikeId,
          name,
          phone,
          bikeName: bike.name,
          fromDate,
          toDate,
          pricePerDay: bike.pricePerDay,
          price
        })
      })

      const data = await res.json()


      if (data.success) {
        alert('Bike booked successfully!')
        navigate('/') } 
        else if (data.error) {
      setBookingError(data.error)
      }

    } catch (err) {
      console.log(err)
    }
  }

useEffect(() => {
  if (fromDate && toDate) {
    const days = (new Date(toDate) - new Date(fromDate)) / 86400000;
    const totalPrice = days * pricePerDay;
    settotalPrice(totalPrice);
  }
}, [fromDate, toDate, pricePerDay])


useEffect(() => {
  if (bookingError) {
    const timer = setTimeout(() => {
      setBookingError('')
    }, 4000)
return () => clearTimeout(timer) 
  }
}, [bookingError])

  return (
    <div id="contact-info">
      <h2>BOOKING</h2>

      {loading && <p className='loading'></p>}
      {error && <p className="error" >Something went wrong</p>}

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
          <div className="bike-preview">
            <img src={`/${bike.image}`} alt={bike.name} className="bikeimg" />

          </div>

          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
             min={today}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />

          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            min={today}
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
          {bookingError && <p className="error-booking">{bookingError}</p>}

        </form>
      )}
    </div>
  )
}

export default Booking