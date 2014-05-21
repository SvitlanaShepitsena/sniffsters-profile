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


    var filtr = filt.replace(/#name#/g, name).replace(/#lname#/g, lname);

////////////////

//     Specs   //
    var sd = 'test/spec/filters/';
    var st = 'Spec.ts';
    var filtspec = grunt.file.read('templates/spec-filt.tpl');
    var filtspecr = filtspec.replace(/#name#/g, name).replace(/#lname#/g, lname);

////////////////

    // register
    var ref = '/// <reference path="filters/' + name + '.ts" />\r\n';
    var reg = "profile.filter('"+jname+"', () => {" +
        " return (value:boolean):string => {" +
        "return "+name+".filter(value);     } });\r\n";


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
