'use strict';

module.exports = (grunt) => {

    require('load-grunt-tasks')(grunt, {
        'pattern': [
            'grunt-*'
        ]
    });

    grunt.config.init({
        'nodemon': {
            'server': {
                'script': 'bin/server.js',
                'options': {
                    'watch': ['server/**/*', 'server_config/**/*'],
                    'delay': 1000
                }
            }
        }
    });

    grunt.registerTask('default', ['nodemon']);

};
