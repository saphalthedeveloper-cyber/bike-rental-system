import { useState } from 'react'
import useFetch from '../UseFetch'

const AdminBikes = () => {
  const { data: bikes, loading, error } = useFetch('http://localhost:3000/backend/admin/bikes')

  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [image, setImage] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')

  
  const handleAdd = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:3000/backend/admin/bikes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ name, color, image, pricePerDay })
      })
      const data = await res.json()
      if (data.success) {
        alert('Bike added!')
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

 
  const handleEdit = async (e, bikeId) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const form = e.target

    try {
      const res = await fetch(`http://localhost:3000/backend/admin/bikes/edit/${bikeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          name: form.name.value,
          color: form.color.value,
          image: form.image.value,
          pricePerDay: form.pricePerDay.value
        })
      })
      const data = await res.json()
      if (data.success) {
        alert('Bike updated!')
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

 
  const handleDelete = async (bikeId) => {
    if (!window.confirm('Delete this bike?')) return
    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`http://localhost:3000/backend/admin/bikes/delete/${bikeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      const data = await res.json()
      if (data.success) {
        alert('Bike deleted!')
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2 className="admintitle">Manage Bikes</h2>

     
      <div className="add-form">
        <h3>Add New Bike</h3>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Bike Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image path (e.g. images/bike1.jpg)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price Per Day"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            required
          />
          <button type="submit">Add Bike</button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}

   
      <div className="images">
        {bikes && bikes.bikes && bikes.bikes.map(bike => (
          <div key={bike._id} className="bike-card">
            <img src={`/${bike.image}`} alt={bike.name} className="bikeimg" />
            <h3>{bike.name}</h3>
            <p>Color: {bike.color}</p>
            <p>Rs. {bike.pricePerDay} / day</p>

        
            <h4>Update Below!!</h4>
            <form onSubmit={(e) => handleEdit(e, bike._id)}>
              <input type="text" name="name" defaultValue={bike.name} required />
              <input type="text" name="color" defaultValue={bike.color} required />
              <input type="text" name="image" defaultValue={bike.image} required />
              <input type="number" name="pricePerDay" defaultValue={bike.pricePerDay} required />
              <button type="submit">Update</button>
            </form>

           
            <button onClick={() => handleDelete(bike._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminBikes