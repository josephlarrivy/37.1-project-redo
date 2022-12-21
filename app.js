const express = require('express');
const app = express();
const ExpressError = require('./expressError');


app.get('/', (req, res, next) => {
    res.send('testing')
});

app.get('/mean', (req, res, next) => {
    if (!req.query.numbers) {
        throw new ExpressError('need query string with numbers', 400)
    }
    try {
        let numsArr = [];
        let numsAsStrings = req.query.numbers.split(',');
        for (let num of numsAsStrings) {
            numsArr.push(parseInt(num))
        }
        
        const sum = numsArr.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
        let len = numsArr.length;

        let value = sum/len
        res.json({
            "response": {
                "operation": "mean",
                "value": value
            }
        })
    } catch (e) {
        return next(e)
    }
});



app.get('/median', (req, res, next) => {
    if (!req.query.numbers) {
        throw new ExpressError('need query string with numbers', 400)
    }
    const median = (arr) => {
        return arr.slice().sort((a, b) => a - b)[Math.floor(arr.length / 2)];
    };

    try {
        let numsArr = [];
        let numsAsStrings = req.query.numbers.split(',');
        for (let num of numsAsStrings) {
            numsArr.push(parseInt(num))
        }

        let value = median(numsArr);
        res.json({
            "response": {
                "operation": "median",
                "value": value
            }
        })
    } catch (e) {
        return next(e)
    }
});



app.get('/mode', (req, res, next) => {
    if (!req.query.numbers) {
        throw new ExpressError('need query string with numbers', 400)
    }
    res.json({
        "response": {
            "operation": "x",
            "value": value
        }
    })
});










app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});

app.listen(3000, function () {
    console.log('listening on port 3000');
})