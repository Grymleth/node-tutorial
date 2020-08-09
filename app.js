const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const { response } = require('express');
const { render } = require('ejs');

// express app
const app = express();

// connect to mongodb
// add folder to root named 'mongodb' and put mongodb uri in a file named 'dbURI.txt'
const dbURI = fs.readFileSync('./mongodb/dbURI.txt', {encoding: 'utf8'});
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('connected to db');
        // listen for requests
        app.listen(3000, () => {
            console.log('listening on port 3000');
        })
    })
    .catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>about</p>');
    res.render('about', { title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});
