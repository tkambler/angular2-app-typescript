'use strict';
/* global PROJECTDIR */

var express = require('express');
var path = require('path');

module.exports = (router) => {

    router.use('/', express.static(path.join(PROJECTDIR, 'client_compiled')));
    router.use('/node_modules', express.static(path.join(PROJECTDIR, 'node_modules')));

};
