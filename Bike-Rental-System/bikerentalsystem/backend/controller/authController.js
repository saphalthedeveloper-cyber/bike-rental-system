const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { name: '', email: '', password: '',role: '' }

  if (err.code === 11000) {
    errors.email = 'Email already registered'
    return errors
  }
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered'
  }
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect'
  }
  if (err.name === 'ValidationError') {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  })
}

// SIGNUP
module.exports.signup_post = async (req, res) => {
  const { name, email, password,role } = req.body
  try {
    const user = await User.create({ name, email, password, role })
    const token = createToken(user._id)
     
    res.status(201).json({ user: user._id,name: user.name, token , role: user.role})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

// LOGIN
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({ user: user._id, name: user.name,token, role: user.role})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

// LOGOUT
module.exports.logout_get = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' })
}