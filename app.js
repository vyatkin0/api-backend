const express = require('express');
const app = express();
const stats = require('./stats.json');
const teamStats = require('./teamStats.json');

app.use(express.urlencoded({ extended: false }));

app.post('/api/start', function (req, res) {
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

app.get('/api/stats', function (req, res) {
    res.json(stats);
});

app.get('/api/team-stats', function (req, res) {
    const index = req.id;
    if(index>=0 && index<teamStats.length){
        res.json(teamStats[index]);
        return;
    }

    res.status(400).send('Does not exist');
});

module.exports = app;
