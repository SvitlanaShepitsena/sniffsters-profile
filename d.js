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
