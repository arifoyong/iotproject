const express = require("express");
const cors = require("cors");
const path = require('path');
const PORT = process.env.port || 3000;


const app = express();

app.use(express.static(path.join(__dirname, 'build')))

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
