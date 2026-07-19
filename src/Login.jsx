import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

   
    setEmailError('')
    setPasswordError('')

    try {
      const res = await fetch('http://localhost:3000/backend/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      console.log(data);

      if (data.errors) {
        setEmailError(data.errors.email)
        setPasswordError(data.errors.password)
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userName', data.name)
         localStorage.setItem('role', data.role)
         
          if (data.role === 'owner') {
        navigate('/admin/bikes');
    } else {
        navigate('/');
    }
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="login">
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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

          <button type="submit">LOGIN</button>
         <p>No account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login