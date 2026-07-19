const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Check if logged in
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' })
      } else {
        req.user = await User.findById(decodedToken.id)
        next()
      }
    })
  } else {
    return res.status(401).json({ message: 'No token found' })
  }
}

// Check if admin
const requireOwner = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    next()
  } else {
    res.status(403).json({ message: 'Admin access only' })
  }
}

// Check if user
const requireRenter = (req, res, next) => {
  if (req.user && req.user.role === 'renter') {
    next()
  } else {
    res.status(403).json({ message: 'Renter access only' })
  }
}

module.exports = { requireAuth, requireOwner, requireRenter }