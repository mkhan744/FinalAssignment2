const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//Instantiate my DB
//mongoose.connect(process.env.MONGODB_URL);

mongoose.connect("mongodb+srv://MKhan744:MongoDBA.123@cluster0.bwdo9.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to Database'))
.catch(err => console.error('MongoDB connection error:', err));

//Mongoose error check
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});