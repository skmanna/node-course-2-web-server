const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (str) => str.toUpperCase());

app.use((req, res, next) => {
    let now = new Date().toString();
    let msg = `${now} ${req.method} ${req.url}`
    console.log(msg);
    let logFile = __dirname + '/log.txt';
    fs.appendFile(logFile, msg + '\n', (err) => {
        if(err) throw err;
        next();
    });
})
// app.use((req, res, next) => {
//     res.render('maintenance', { message: 'We will be right back'});
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome',
        message: 'Welcome to some website',
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
