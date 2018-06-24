const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const path         = require('path');
const router       = require('./routes/router.js');
const app          = express();
const port         = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

app.use('/api', router)

app.listen(port, () => console.log(`Listening on port ${port}`));
