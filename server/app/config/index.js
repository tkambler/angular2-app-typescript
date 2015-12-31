'use strict';

var handlers = require('shortstop-handlers');
var Promise = require('bluebird');
var confit = require('confit');

module.exports = function(configDir) {

    confit = Promise.promisifyAll(confit({
        'basedir': configDir,
        'protocols': {
            'require': handlers.require(configDir),
            'path': handlers.path(configDir),
            'glob': handlers.glob(configDir)
        }
    }));

    return confit.createAsync()
        .then((config) => {
            module.exports = config;
            return config;
        });

};
