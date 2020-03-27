var express = require("express"),
    fs = require('fs'),
    port = process.env.PORT || 8000;

var http = require('http'),
    bodyParser = require('body-parser');

var app = express();
var logger = require('morgan');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set("view options", {
    layout: false
});

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
    res.render('app/index.html');
});

app.get('/users', function(req, res) {
    fs.readFile('./app/data/users.json', 'utf-8', function(err, data) {
        if (err) throw err;

        console.log(data);
        res.json(JSON.parse(data));
    })
});

app.post('/users', function(req, res) {

    fs.readFile('./app/data/users.json', 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data);
        arrayOfObjects.push({
            username: req.body[0].value,
            fname: req.body[1].value,
            lname: req.body[2].value,
            dob: req.body[3].value,
            email: req.body[4].value,
            password: req.body[5].value,
            car: req.body[6].value
        })

        console.log(arrayOfObjects)

        fs.writeFile('./app/data/users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })
});

app.get('/cities', function(req, res) {
    var city = require('./app/data/cities.json');
    res.json(city);
});

app.get('/cars', function(req, res) {
    fs.readFile('./app/data/cars.json', 'utf-8', function(err, data) {
        if (err) throw err;

        console.log(data);
        res.json(JSON.parse(data));
    })
});

app.post('/cars', function(req, res) {
    fs.readFile('./app/data/cars.json', 'utf-8', function(err, data) {
        if (err) throw err
        console.log(req);
        var arrayOfObjects = JSON.parse(data);
        arrayOfObjects.push({
            source: req.body[0].value,
            destination: req.body[1].value,
            price: req.body[2].value,
            capacity: req.body[3].value,
            rideDate: req.body[4].value,
            carNumber: req.body[5].value
        })

        console.log(arrayOfObjects)

        fs.writeFile('./app/data/cars.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })
});

app.get('/rides', function(req, res) {
    fs.readFile('./app/data/ridesAvailable.json', 'utf-8', function(err, data) {
        if (err) throw err;

        console.log(data);
        res.json(JSON.parse(data));
    })
});

app.post('/rides', function(req, res) {

    fs.readFile('./app/data/ridesAvailable.json', 'utf-8', function(err, data) {
        if (err) throw err

        console.log(req.body);
        
        fs.writeFile('./app/data/ridesAvailable.json', JSON.stringify(req.body), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })
});

app.post('/emptyRides', function(req, res) {
    fs.writeFile('./app/data/ridesAvailable.json', JSON.stringify([]), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    })
});

app.listen(port);
console.log('Express server running at http://localhost:' + port);