const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/start', function (req, res, next) { 
    if(!Number(req.body.divider)){
        res.status(400).send('Division by zero');
        return;
    }

    let result = { total: 0 };
    for (let i = 1; i < 4; ++i) {
        const year = req.body['year' + i];
        if (!year) {
            break;
        }
        const values = req.body['values' + i];
        const total = values?.reduce((a, v) => a + (Number(v) || 0), 0) * req.body.multiplier / req.body.divider;
        result[year] = total;
        result.total += total;
    }

    res.send(result);
});

module.exports = app;
