const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const cors = require('cors');
const userProfileRoute = require('./routes/userProfileRoute'); 

dotEnv.config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(`MongoDB connection error: ${error.message}`));

// Use the user profile routes
app.use('/api', userProfileRoute);

// Error handling middleware
app.use('/', (req, res) => {
    res.send("<h1> Welcome Bhanuuu </h1>");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
