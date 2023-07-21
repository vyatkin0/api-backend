var express = require('express');
var path = require('path');

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/start', function (req, res, next) {

  const reducer = (a, v) => a + (v || 0) * req.body.multiplier / req.body.divider;

  let result = { total: 0 };
  for (let i = 1; i < 4; ++i) {
    const year = req.body['year' + i];
    if (!year) {
      break;
    }
    const values = req.body['values' + i];
    const total = values?.reduce(reducer, 0);
    result[year] = total;
    result.total += total;
  }

  res.send(result);
});

module.exports = app;
