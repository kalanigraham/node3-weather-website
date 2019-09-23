const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9f0a6257a9dfaeb609448a73c56007a2/' + latitude + ',' + longitude;//37.8267,-122.4233';

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location!');
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The expected high is ' + body.daily.data[0].temperatureHigh + ' and the expected low is ' + body.daily.data[0].temperatureLow + '. There is a ' + (body.currently.precipProbability * 100) + '% chance of rain.');
        }
    });
};

module.exports = forecast;