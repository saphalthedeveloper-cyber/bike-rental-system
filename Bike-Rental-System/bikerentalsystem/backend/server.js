const express = require('express');
const mongoose = require('mongoose');
const Bike = require('./models/bike');
const Booking = require('./models/booking');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const cors = require('cors')

const { requireAuth, requireOwner, requireRenter } = require('./middleware/authMiddleware')

const app = express();
app.use(cors({ origin: 'http://localhost:5173', 
    credentials: true}));

app.use(cookieParser());
app.use(express.json());
app.use('/backend', authRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MOngoDB Connected'))
    .catch((err) => console.log(err));


app.get('/backend/home', async (req, res) => {
    try {
        const bikes = await Bike.find();
       res.status(200).json(bikes);
    } catch (err) {
        res.status(500).json({error:'Failed to fetch bikes'})
    }
});
//admin
app.get('/backend/admin/bikes',requireAuth, requireOwner,async (req, res) => {
    try {
        const bikes = await Bike.find();
       res.status(200).json( {bikes, user: req.user})
    } catch (err) {
       res.status(500).json({ error: err.message })
    }
});

app.post('/backend/admin/bikes/add' ,requireAuth, requireOwner,async (req, res) => {
    try {
        const bike =await Bike.create(req.body);
        res.status(201).json({success: true,bike});
    } catch (err) {
        res.status(400).json({error:err.message})
    }
});

app.post('/backend/admin/bikes/edit/:id',requireAuth, requireOwner, async (req, res) => {
    try {
       const bike =await Bike.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ success: true, bike })
    } catch (err) {
       res.status(400).json({ error: err.message })

    }
});

app.post('/backend/admin/bikes/delete/:id',requireAuth, requireOwner,async (req, res) => {
    try {
        await Bike.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true })
    } catch (err) {
         res.status(400).json({ error: err.message })
    }
});

app.get('/backend/admin/bookings',requireAuth, requireOwner,  async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId').populate('bikeId');
      res.status(200).json({ bookings, user: req.user})
    } catch (err) {
         res.status(500).json({ error: err.message })
    }
});
app.post('/backend/admin/bookings/delete/:id',requireAuth, requireOwner, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
       res.status(200).json({ success: true })
    } catch (err) {
        console.log(err);
    }
});


//renter
app.get('/backend/bikes', requireAuth,requireRenter, async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.status(200).json( bikes)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

app.post('/backend/booking', requireAuth,requireRenter, async (req, res) => {
    try {
        const booking = new Booking({
            ...req.body,
            userId: req.user._id
        });
        const bookings = await booking.save();
        await Bike.findByIdAndUpdate(bookings.bikeId, { isBooked: true });
       res.status(201).json({ success: true, bikeId: bookings.bikeId })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

app.get('/backend/booking/:bikeId', requireAuth,requireRenter, async (req, res) => {
    try {
        const bikes = await Bike.findById(req.params.bikeId);
        const booking = await Booking.findOne({ bikeId: req.params.bikeId });
        res.status(200).json( {bikes, user: req.user,booking})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

app.get('/backend/bookings',requireAuth,requireRenter,   async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).populate('bikeId');
        res.status(200).json( { user: req.user,bookings})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});



//  404 
app.use((req, res) => {
    res.status(404).json({error:'Failed to load server'})
});
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))