'use strict';

module.exports = (grunt) => {

    require('time-grunt')(grunt);

    require('load-grunt-tasks')(grunt, {
        'pattern': [
            'grunt-*'
        ]
    });

    grunt.config.init({
        'concurrent': {
            'options': {
                'logConcurrentOutput': true
            },
            'develop': ['nodemon', 'watch'],
        },
        'nodemon': {
            'server': {
                'script': 'bin/server.js',
                'options': {
                    'watch': ['server/**/*', 'server_config/**/*'],
                    'delay': 1000,
                    'callback': (nodemon) => {

                        nodemon.on('config:update', () => {
                            var path = require('path');
                            require('app/config')(path.join(__dirname, 'server_config'))
                                .then((config) => {
                                    setTimeout(() => {
                                        require('open')('http://localhost:' + config.get('port'));
                                    }, 1000);
                                });
                        });

                    }
                }
            }
        },
        'clean': {
            'options': {
                'no-write': false
            },
            'default': {
                'src': ['client_compiled']
            }
        },
        'sync': {
            'default': {
                'files': [
                    {
                        'cwd': 'client',
                        'src': '**/*',
                        'dest': 'client_compiled',
                        'expand': true
                    }
                ]
            }
        },
        'ts': {
            'default': {
                'src': ['client_compiled/app/**/*.ts'],
                'options': {
                    'target': 'ES5',
                    'module': 'commonjs',
                    'moduleResolution': 'node',
                    'sourceMap': true,
                    'emitDecoratorMetadata': true,
                    'experimentalDecorators': true,
                    'removeComments': false,
                    'noImplicitAny': false
                }
            }
        },
        'browserify': {
            'options': {
                'exclude': [],
                'require': [],
                'paths': ['client_compiled/client'],
                'babelify': {
                    'enable': true,
                    'options': {
                        'presets': ['es2015']
                    }
                }
            },
            'default': {
                'options': {
                    'src': 'client_compiled/app/boot.js',
                    'dest': 'client_compiled/app/compiled.js'
                }
            }
        },
        'watch': {
            'default': {
                'files': ['client/**/*'],
                'tasks': ['sync', 'ts', 'browserify']
            }
        }
    });

    grunt.registerTask('build', ['clean', 'sync', 'ts', 'browserify']);
    grunt.registerTask('launch', ['build', 'concurrent:develop']);
    grunt.loadTasks('tasks');

};
