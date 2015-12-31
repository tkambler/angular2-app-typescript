'use strict';

var express = require('express');
var meddleware = require('meddleware');
var config = require('app/config');
var app = express();
app.use(meddleware(config.get('middleware')));

app.listen(config.get('port'), () => {
    console.log('Server is listening on port: %s', config.get('port'));
});
