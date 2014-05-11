// Generated on 2014-05-04 using generator-tsangular 0.1.5
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var enterInside = function (target, before, insert) {
    if (target == undefined)
        return target;

    var test = target.indexOf(insert);
    if (test > 0)return target;

    var start = target.indexOf(before);

    var p1 = target.substring(0, start);
    var p2 = target.substring(start);
    return p1 + insert + p2;
}
var removeFromInside = function (target, remove) {
    if (target == undefined)
        return target;

    target = target.replace(remove, '');
    return target;
}




// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    var delFileDep = function(fileName){
        var arrExt = ['ts', 'js','js.map'];

        var dotCoord = fileName.lastIndexOf('.');
        fileName = dotCoord > 0 ? fileName.substring(0, dotCoord):fileName;


        arrExt.forEach(function(e){

            grunt.file.delete(fileName+'.'+e)
        });

    }


    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                dest: 'profile.js'
            }
        },


        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            typescript: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.ts'],
                tasks: ['typescript:dist']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/views/{,*/}*.html',
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        coffee: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/scripts',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/scripts',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/spec',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/spec',
                        ext: '.js'
                    }
                ]
            }
        },
        typescript: {
            dist: {
                src: '<%= yeoman.app %>/scripts/{,*/}*.ts',
                dest: '.tmp/scripts',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3/es5
                    basePath: '<%= yeoman.app %>/scripts'
                    // sourcemap: true,
                    // fullSourceMapPath: true,
                    // declaration: true,
                }
            }

        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
         dist: {}
         },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //   files: {
            //     '<%= yeoman.dist %>/styles/main.css': [
            //       '.tmp/styles/{,*/}*.css',
            //       '<%= yeoman.app %>/styles/{,*/}*.css'
            //     ]
            //   }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['*.html', 'views/*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'bower_components/**/*',
                            'images/{,*/}*.{gif,webp}',
                            'styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: [
                            'generated/*'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'typescript:dist'
            ],
            test: [
                'coffee',
                'typescript'
            ],
            dist: [
                'coffee',
                'typescript:dist',
                'typescript:tf',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'

            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>/scripts',
                        src: '*.js',
                        dest: '<%= yeoman.dist %>/scripts'
                    }
                ]
            }
        },
        uglify: {


            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            },
            minvs: {
                dist: {
                    files: {
                        '<%= yeoman.dist %>/scripts/profile.js': [
                            '<%= yeoman.dist %>/scripts/profile.js'
                        ]
                    }
                }
            }
        }
    });

    grunt.registerTask('vs', function () {
        grunt.task.run(['concat']);
        grunt.task.run(['uglify:minvs']);
    });

    grunt.registerTask('c', function (cname) {
//        delete option
        var rm = grunt.option('rm');

        rm = (rm === undefined) ? false : rm;




//     C        //
        var d = 'app/scripts/controllers/';
        var t = 'Ctrl' + '.ts';
        var ctrl = grunt.file.read('templates/ctrl.tpl');

        var lname = cname.toLowerCase();
        var name = lname.charAt(0).toUpperCase() + lname.substring(1);



        var ctrlr = ctrl.replace(/#name#/g, name).replace(/#lname#/g, lname);

////////////////

//     Specs   //
        var sd = 'test/spec/controllers/';
        var st = 'CtrlSpec.ts';
        var spec = grunt.file.read('templates/spec.tpl');
        var specr = spec.replace(/#name#/g, name).replace(/#lname#/g, lname);

////////////////

        // register
        var ref = '/// <reference path="controllers/' + name + 'Ctrl.ts" />\r\n';
        var reg = 'profile.controller("' + name + 'Ctrl", ' + name + 'Ctrl);\r\n';
        var state = '\t\t\t\t.state("' + lname + '", {\r\n' +
            '\t\t\t\t\turl: "/profile/' + lname + '", \r\n' +
            '\t\t\t\t\tcontroller:"' + name + 'Ctrl",\r\n' +
            '\t\t\t\t\ttemplateUrl: "../views/profile-' + lname + '.html"\r\n' +
            '\t\t\t\t})\r\n';

        var apath = 'app/scripts/app.ts';
        var tpath = 'app/views/profile-' + lname + '.html';
        var app = grunt.file.read(apath);
        if (rm) {
            app = removeFromInside(app, ref);
            app = removeFromInside(app, reg);
            app = removeFromInside(app, state);
        }
        else {

            app = enterInside(app, '//#ctrl', reg);
            app = enterInside(app, '//#state', state);
            app = enterInside(app, '//#ref', ref);
        }


        /////////////////// index
        var ipath = 'app/index.html';
        var src = '<script src="scripts/controllers/' + name + 'Ctrl.js"></script>\r\n';
        var indf = grunt.file.read(ipath);
        //////////////////
        if (rm) {
            indf = removeFromInside(indf, src);

        } else {

            indf = enterInside(indf, '<!-- links -->', src);
        }

        if (rm) {
            var file = d + name + t;
            var sfile = sd + name + st;

            delFileDep(file);
            delFileDep(sfile);

            grunt.file.delete(tpath);
        } else {
            grunt.file.write(d + name + t, ctrlr);
            grunt.file.write(sd + name + st, specr);
            grunt.file.write(tpath, '<div class="well well-sm">' + name + ' Template</div>');
        }
            grunt.file.write(apath, app);
            grunt.file.write(ipath, indf);

    })

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'copy',
        'cdnify',
        'ngmin',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
