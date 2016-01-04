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
                    'delay': 1000,
                    'callback': (nodemon) => {

                        nodemon.on('config:update', () => {
                            var config = require('app/config');
                            setTimeout(() => {
                                require('open')('http://localhost:' + config.get('port'));
                            }, 1000);
                        });

                    }
                }
            }
        }
    });

    grunt.registerTask('load-config', function() {
        var done = this.async();
        var path = require('path');
        require('app/config')(path.join(__dirname, 'server_config'))
            .then(() => {
                return done();
            });
    });

    grunt.registerTask('default', ['nodemon']);

    grunt.task.run(['load-config']);

};
