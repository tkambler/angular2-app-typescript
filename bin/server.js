'use strict';

// Don't run this script directly - run `npm start` from the CLI, instead.

var path = require('path');

Object.defineProperties(GLOBAL, {
    'PROJECTDIR': {
        'value': path.resolve(__dirname, '..')
    }
});

require('app/config')(path.join(PROJECTDIR, 'server_config'))
    .then((config) => {
        return require('app/express');
    });
