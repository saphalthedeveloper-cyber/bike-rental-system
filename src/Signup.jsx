import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setNameError('')
    setEmailError('')
    setPasswordError('')

    try {
      const res = await fetch('http://localhost:3000/backend/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()
     

      if (data.errors) {
        setNameError(data.errors.name)
        setEmailError(data.errors.email)
        setPasswordError(data.errors.password)
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userName', data.name) 
        navigate('/login')
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="name-error">{nameError}</div>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="email-error">{emailError}</div>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password-error">{passwordError}</div>

          <button type="submit">SIGN UP</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup