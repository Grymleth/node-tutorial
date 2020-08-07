const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
/*const server = */  
app.listen(3000, () => {
    console.log('listening on port 3000');
});

app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    const blogsArr = [
        {title: 'Best Doujin I\'ve ever read', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Hey, where\'s Ibaraki?', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to cause dolphin extinction', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ];
    res.render('index', { title: 'Home', blogs: blogsArr});
});

app.get('/about', (req, res) => {
    // res.send('<p>about</p>');
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog'});
});

// 404 page
app.use((req, res) => {
    res.render('404', { title: '404'});
});