// Generated on 2014-05-04 using generator-tsangular 0.1.5
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var minify = require('html-minify').minify;

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var enterInside = function (target, before, insert) {
    if (target === undefined) {
        return target;
    }

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

    var delFileDep = function (fileName) {
        var arrExt = ['ts', 'js', 'js.map'];

        var dotCoord = fileName.lastIndexOf('.');
        fileName = dotCoord > 0 ? fileName.substring(0, dotCoord) : fileName;


        arrExt.forEach(function (e) {

            grunt.file.delete(fileName + '.' + e)
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
            },
            same: {
                src: '<%= yeoman.app %>/scripts/{,*/}*.ts',
                dest: 'app/scripts',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3/es5
                    basePath: '<%= yeoman.app %>/scripts',
                    sourcemap: false,
                    fullSourceMapPath: false
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
                'typescript:same'
            ],
            test: [
                'coffee',
                'typescript'
            ],
            dist: [
                'coffee',
                'typescript:same',
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
            files: {
                expand: true,
                cwd: 'app/scripts',
                src: ['**/*.js'],
                dest: 'vs'
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
                options: {
                    mangle: false
                },
                files: {
                    'app/profile.js': ['vs/**/*.js']
                }

            }
        },

        concat: {
            options: {
                separator: '\r\n\r\n'
            },
            dist: {
                src: ['vs/{,*/}*.js' ],
                dest: 'app/profile.js'
            }
        }



    });

    grunt.registerTask('move-app-to-z', function () {
        if (grunt.file.exists('vs/app.js')) {
            grunt.file.copy('vs/app.js', 'vs/z/app.js');
            grunt.file.delete('vs/app.js');
        }
    });


    grunt.registerTask('copy-profile-to-root', function () {
        var address = 'app/profile.js';
        var content = grunt.file.read(address);
        content = content.replace(/http:\/\/localhost:44300/g, '');
        grunt.file.write(address, content);
        grunt.file.copy('app/profile.js', 'profile.js');
    });


    grunt.registerTask('templates', function () {
        var file = grunt.file.read('app/scripts/app.ts');
        var search = "templateUrl";
        var index = 0, pos = 0;
        var fileContent = "";

        var options = {
            charset: 'utf-8',
            collapseWhitespace: true,
            removeComments: true
        }

        while (true) {
            index = file.indexOf(search, index);
            if (index == -1) {
                break;
            }

            index = file.indexOf('"', index) + 1;
            var final = file.indexOf('"', index);
            var key = file.substring(index, final);
            var startPos = key.indexOf('views');
            startPos = key.indexOf('/', startPos) + 1;
            var fileName = 'app/views/' + key.substring(startPos);
            var content = minify(grunt.file.read(fileName).trim(), options).replace('\n', '').replace('\t', '');

            var fullChunk = '<script type="text/ng-template" id="' + key + '">' + content + '</script>';
//            grunt.log.subhead(content);
            fileContent += fullChunk;
            if (final > index) {
                index = final;
            }
        }

        var dirFolder = 'app/views/directives';

        grunt.file.recurse(dirFolder, function (file) {

            var content = minify(grunt.file.read(file).trim(), options).replace('\n', '').replace('\t', '');
//            grunt.log.ok(content);

            var pos = file.indexOf('views');
            var key = file.substring(pos);
//
            var fullChunk = '<script type="text/ng-template" id="' + key + '">' + content + '</script>';
            fileContent += fullChunk;
        });

        grunt.file.write('templates.cshtml', fileContent);

    });


    grunt.registerTask('clean', function () {
        if (grunt.file.exists('vs')) {
            grunt.file.delete('vs');
        }

        if (grunt.file.exists('app/profile.js')) {
            grunt.file.delete('app/profile.js');
        }
    });
    grunt.registerTask('vs', function () {
//        grunt.task.run('typescript:same');
        grunt.task.run(['ngmin']);
        grunt.task.run(['move-app-to-z']);
        grunt.task.run(['uglify:minvs']);
//        grunt.task.run(['concat']);
        grunt.task.run(['copy-profile-to-root']);
        grunt.task.run(['templates']);
        grunt.task.run(['clean']);

    });


    grunt.registerTask('c', function (cname) {
//        delete option
        var rm = grunt.option('rm');

        rm = (rm === undefined) ? false : rm;


//     C        //
        var d = 'app/scripts/controllers/';
        var t = 'Ctrl' + '.ts';
        var ctrl = grunt.file.read('templates/ctrl.tpl');

        var lname = cname;
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
            grunt.file.write(tpath, grunt.file.read("templates/ctrl-template.tpl"));
        }
        grunt.file.write(apath, app);
        grunt.file.write(ipath, indf);

    })


    grunt.registerTask('s', function (sname) {
//        delete option
        var rm = grunt.option('rm');

        rm = (rm === undefined) ? false : rm;


//     C        //
        var d = 'app/scripts/services/';
        var t = 'Service.ts';
        var serv = grunt.file.read('templates/serv.tpl');

        var lname = sname.toLowerCase();
        var name = lname.charAt(0).toUpperCase() + lname.substring(1);


        var servr = serv.replace(/#name#/g, name).replace(/#lname#/g, lname);

////////////////

//     Specs   //
        var sd = 'test/spec/services/';
        var st = 'ServiceSpec.ts';
        var specserv = grunt.file.read('templates/spec-serv.tpl');
        var specrserv = specserv.replace(/#name#/g, name).replace(/#lname#/g, lname);

////////////////

        // register
        var ref = '/// <reference path="services/' + name + 'Service.ts" />\r\n';
        var reg = 'profile.service("' + name + 'Service", ' + name + 'Service);\r\n';


        var apath = 'app/scripts/app.ts';
        var app = grunt.file.read(apath);
        if (rm) {
            app = removeFromInside(app, ref);
            app = removeFromInside(app, reg);
        }
        else {

            app = enterInside(app, '//#serv', reg);
            app = enterInside(app, '//#ref', ref);
        }


        /////////////////// index
        var ipath = 'app/index.html';
        var src = '<script src="scripts/services/' + name + 'Service.js"></script>\r\n';
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

        } else {
            grunt.file.write(d + name + t, servr);
            grunt.file.write(sd + name + st, specrserv);
        }
        grunt.file.write(apath, app);
        grunt.file.write(ipath, indf);

    })


    grunt.registerTask('f', function (fname) {
//        delete option
        var rm = grunt.option('rm');
        rm = (rm === undefined) ? false : rm;


//     C        //
        var d = 'app/scripts/filters/';
        var t = '.ts';
        var filt = grunt.file.read('templates/filt.tpl');

        var name = fname.charAt(0).toUpperCase() + fname.substring(1);
        var jname = name.charAt(0).toLowerCase() + name.substring(1);


        var filtr = filt.replace(/#name#/g, name);

////////////////

//     Specs   //
        var sd = 'test/spec/filters/';
        var st = 'Spec.ts';
        var filtspec = grunt.file.read('templates/spec-filt.tpl');
        var filtspecr = filtspec.replace(/#name#/g, name);

////////////////

        // register
        var ref = '/// <reference path="filters/' + name + '.ts" />\r\n';
        var reg = "profile.filter('" + jname + "', () => {" +
            " return (value:boolean):string => {" +
            "return " + name + ".filter(value);     } });\r\n";


        var apath = 'app/scripts/app.ts';
        var app = grunt.file.read(apath);
        if (rm) {
            app = removeFromInside(app, ref);
            app = removeFromInside(app, reg);
        }
        else {

            app = enterInside(app, '//#filt', reg);
            app = enterInside(app, '//#ref', ref);
        }


        /////////////////// index
        var ipath = 'app/index.html';
        var src = '<script src="scripts/filters/' + name + '.js"></script>\r\n';
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

        } else {
            grunt.file.write(d + name + t, filtr);
            grunt.file.write(sd + name + st, filtspecr);
        }
        grunt.file.write(apath, app);
        grunt.file.write(ipath, indf);

    })


    grunt.registerTask('d', function (dname, dtype) {
//        delete option
        var rm = grunt.option('rm');

        rm = (rm === undefined) ? false : rm;


        var d = 'app/scripts/directives/';
        var directive = grunt.file.read('templates/dir.tpl');

        var dnames = dname.toLowerCase().split('-');

        var uname = '', lname = '', jname = '';
        var counter = 1;
        dnames.forEach(function (part) {
            var Upart = part.charAt(0).toUpperCase() + part.substring(1).toLowerCase();
            uname += Upart;
            lname += part.toLowerCase();
            if (counter++ == 1) {
                jname += part.toLowerCase();
            }
            else {
                jname += Upart;
            }

        });

        var oname = dname;

//        grunt.log.ok(uname);
//        grunt.log.ok(lname);
//        grunt.log.ok(jname);
//        grunt.log.ok(oname);


        var directivef = directive.replace(/#uname#/g, uname).replace(/#lname#/g, lname)
            .replace(/#jname#/g, jname).replace(/#dname#/g, dname);

        var dirFileName = d + jname + '.ts', directivef;
        if (!rm)
            grunt.file.write(dirFileName, directivef);
        else {
            delFileDep(dirFileName);
        }


        var reg = 'profile.directive("' + jname + '", ' + jname + ');\r\n';
////////////////

//     Specs   //
//        var sd = 'test/spec/directive/';
//        var st = 'Spec.ts';
//        var spec = grunt.file.read('templates/spec.tpl');
//        var specr = spec.replace(/#name#/g, name).replace(/#lname#/g, lname);

////////////////

        // register
        var ref = '/// <reference path="directives/' + jname + '.ts" />\r\n';
//        grunt.log.ok(ref);
//        grunt.log.ok(reg);
//        grunt.fail.fatal();


        var apath = 'app/scripts/app.ts';
        var tpath = 'app/views/directives/' + oname + '.html';
        var app = grunt.file.read(apath);
        if (rm) {
            app = removeFromInside(app, ref);
            app = removeFromInside(app, reg);
        }
        else {

            app = enterInside(app, '//#dir', reg);
            app = enterInside(app, '//#ref', ref);
        }


        /////////////////// index/
        var ipath = 'app/index.html';
        var src = '<script src="scripts/directives/' + jname + '.js"></script>\r\n';
        var indf = grunt.file.read(ipath);
        //////////////////
        var directiveTemplate = '<div class="well well-sm">' + oname + ' Template</div>';
        /////////////////
        if (dtype && dtype == 'info') {
            var directiveTemplate = grunt.file.read('templates/dir-info.tpl');
        }

        if (dtype && dtype == 'edit') {
            var directiveTemplate = grunt.file.read('templates/dir-edit.tpl');
        }


/////
        if (rm) {
            indf = removeFromInside(indf, src);

        } else {

            indf = enterInside(indf, '<!-- links -->', src);
        }

        if (rm) {
            grunt.file.delete(tpath);
        } else {
            grunt.file.write(tpath, directiveTemplate);
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
