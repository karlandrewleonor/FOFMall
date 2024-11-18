const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // To parse JSON bodies

// Connect to MongoDB (ensure this connection string is correct for your MongoDB Atlas instance)
mongoose.connect('mongodb+srv://adamasinnov:AdamasAdmin2023@adamasinnov.babhglt.mongodb.net/FOF_Mall', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the Order Schema (For the Orders collection)
const OrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  deliveryAddress: String,
  landmark: String,
  contactNumber: String,
  paymentMethod: String,
  items: Array,
  total: Number,
});

const Order = mongoose.model('Order', OrderSchema);

// Define the Product Schema (For the Products collection)
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  rating: { type: Number, default: 0 },  // Default rating is 0
  reviews: { type: Number, default: 0 },  // Default reviews is 0
  image: String,  // Image URL of the product
});

const Product = mongoose.model('Product', ProductSchema);

// Define the Restaurant Booking Schema
const RestaurantBookingSchema = new mongoose.Schema({
  restaurantName: String,
  date: Date,
  time: Date,
  numberOfPeople: Number,
  name: String,
  downpayment: { type: Boolean, default: false },
  referenceCode: String,  // Unique reference code for the booking
});

const RestaurantBooking = mongoose.model('RestaurantBooking', RestaurantBookingSchema);

// Define the Hotel Booking Schema
const HotelBookingSchema = new mongoose.Schema({
  hotelName: String,
  checkInDate: Date,
  checkOutDate: Date,
  numberOfGuests: Number,
  name: String,
  downpayment: { type: Boolean, default: false },
  referenceCode: String,  // Unique reference code for the booking
});

const HotelBooking = mongoose.model('HotelBooking', HotelBookingSchema);

// Define the Apartment Booking Schema
const ApartmentBookingSchema = new mongoose.Schema({
  apartmentName: String,
  checkInDate: Date,
  checkOutDate: Date,
  numberOfGuests: Number,
  name: String,
  downpayment: { type: Boolean, default: false },
  referenceCode: String,  // Unique reference code for the booking
});

const ApartmentBooking = mongoose.model('ApartmentBooking', ApartmentBookingSchema);

// POST route to create a new restaurant booking
app.post('/api/restaurantbookings', (req, res) => {
  const newBooking = new RestaurantBooking(req.body);
  newBooking.save()
    .then(booking => {
      res.status(201).json(booking);  // Respond with the created booking
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET route to fetch all restaurant bookings
app.get('/api/restaurantbookings', (req, res) => {
  RestaurantBooking.find()
    .then(bookings => res.json(bookings))  // Respond with the list of bookings
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST route to create a new hotel booking
app.post('/api/hotelbookings', (req, res) => {
  const newBooking = new HotelBooking(req.body);
  newBooking.save()
    .then(booking => {
      res.status(201).json(booking);  // Respond with the created booking
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET route to fetch all hotel bookings
app.get('/api/hotelbookings', (req, res) => {
  HotelBooking.find()
    .then(bookings => res.json(bookings))  // Respond with the list of hotel bookings
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST route to create a new apartment booking
app.post('/api/apartmentbookings', (req, res) => {
  const newBooking = new ApartmentBooking(req.body);
  newBooking.save()
    .then(booking => {
      res.status(201).json(booking);  // Respond with the created booking
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET route to fetch all apartment bookings
app.get('/api/apartmentbookings', (req, res) => {
  ApartmentBooking.find()
    .then(bookings => res.json(bookings))  // Respond with the list of apartment bookings
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST route to create a new order
app.post('/api/orders', (req, res) => {
  const newOrder = new Order(req.body);
  newOrder.save()
    .then(order => res.status(201).json(order))  // Respond with the created order
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET route to fetch all orders
app.get('/api/orders', (req, res) => {
  Order.find()
    .then(orders => res.json(orders))  // Respond with the list of orders
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST route to create a new product
app.post('/api/products', (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save()
    .then(product => res.status(201).json(product))  // Respond with the created product
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET route to fetch all products
app.get('/api/products', (req, res) => {
  Product.find()
    .then(products => res.json(products))  // Respond with the list of products
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server on the specified PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
