const path = require('path');
const express = require('express');
const app = express();
const { Event } = require('./db/index.js');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/api/events', (req, res, next) => {
    Event.findAll()
        .then(events => {
            // console.log(events);
            res.send(events)
        })
        .catch(e => console.log('error getting events', e))
})

app.post('/api/events', (req, res, next) => {
    Event.create(req.body)
        .then(event => {
            res.statusCode = 200;
            res.send(event);
        })
        .catch(e => {
            res.statusCode = 400;
            next(e);
        })
})

app.put('/api/events/:id', (req, res, next) => {
    const id = req.params.id;
    const { title, date } = req.body;
    Event.findByPk(id)
        .then(event => {
            event.update({ title, date });
            res.statusCode = 200;
            res.send(event);
        })
        .catch(e => {
            res.statusCode = 400;
            next(e)
        })
})

app.delete('/api/events/:id', (req, res, next) => {
    const { id } = req.params;
    console.log('destroyed id is: ', id)
    Event.destroy({
        where: {
            id,
        }
    })
    .then(events => {
        res.statusCode = 200;
        res.sendStatus = events;
    })
    .catch(e => {
        res.statusCode = 400;
        next(e)
    })
})

module.exports = { app }