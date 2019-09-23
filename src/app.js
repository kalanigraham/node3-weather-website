const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define directoies
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

//Setup static directory
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kalani Graham'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kalani Graham'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kalani Graham',
        help: 'This message is used to help users.'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send ({ error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error});
            }
            //console.log(location);
            //console.log(forecastData);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products:[]
    })    
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Kalani Graham',
        error: 'Help article not found'
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Kalani Graham',
        error: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});