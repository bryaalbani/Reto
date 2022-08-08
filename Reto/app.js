const express = require('express');
const dotenv = require('dotenv');
const authenticateToken = require("./middleware/auth");
const app = express();

dotenv.config();

app.use(express.json())

app.get('/DevOps', (req, res) => {
    res.status(400).send({
        error: 'ERROR - Wrong HTTP verb',
    })
});

app.post('/DevOps', authenticateToken,(req, res) => {

    const { message, to, from } = req.body;

    if (message == null || to == null || from == null) {
        res.status(400).send({
            error: 'ERROR - Wrong Body for Request',
        })
    } else {
        res.send({
            message: `hello ${to} your message will be send`,
        });
    }
});

app.use(function (req, res, next){
    res.send({
        error: 'ERROR, Not Resource find',
    })
    next({status: 404})
});


module.exports = app;