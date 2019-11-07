require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require('path');
const PORT = process.env.PORT || 5000;

const { Sensor, Data } = require('./models');


const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')))

// Routes
app.get('/api', (req, res) => {
  res.send({ message: "API is running" })
})

app.use('/api/device', require('./routes/api/device'))
app.use('/api/record', require('./routes/api/record'))

if (process.env.NODE_ENV === 'production' || 'staging') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'frntend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'frntend/build', 'index.html'));
  });
}


app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
