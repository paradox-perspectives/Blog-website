const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const articleRoutes = require('./articleRoutes');
const userRoutes = require('./userRoutes');
const cloudinaryRoutes = require('./cloudinaryRoutes');
const themeRoutes = require('./themesRoutes');
const mailRoutes = require('./mailRoute');

const cors = require('cors');

const origin = process.env.FRONT_END_URL;

var corsOptions = {
    origin,
    credentials: true,
    optionsSuccessStatus: 200
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(process.env.URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected successfully to MongoDB Atlas'))
    .catch(err => console.error('Connection error', err));

process.on('SIGINT', function() {
    mongoose.connection.close().then(() => {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

app.use('/articles', articleRoutes);
app.use('/users', userRoutes);
app.use('/upload', cloudinaryRoutes);
app.use('/themes', themeRoutes);
app.use('/mail', mailRoutes);

function ensureAuthor(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'Author') {
        return next();
    } else {
        res.status(403).send('Forbidden');
    }
}

// Usage
app.get('/author-dashboard', ensureAuthor, (req, res) => {
    res.send('Welcome to the Author Dashboard');
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
