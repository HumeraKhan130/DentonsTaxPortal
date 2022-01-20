'use strict';

const build = require('@microsoft/sp-build-web');
const esprima = require('esprima');
const through = require('through2');


const subLocaleValidation = build.subTask("validate-localization", function (gulp, buildOptions, done) {
  const spfxBuild = this;
  return gulp.src("src/**/loc/**/*.js").pipe(through.obj((chunk, enc, cb) => {
    if (chunk.isNull()) {
      cb(null, chunk);
      return;
    }

    try {
      esprima.parseScript(chunk.contents.toString(), { tolerant: false });
    } catch (err) {
      spfxBuild.fileError(chunk.path, err.lineNumber, null, null, err.description);
    }

    cb(null, chunk);
  }));
});

const validateLocalization = build.task("validate-localization", subLocaleValidation);
build.rig.addPreBuildTask(validateLocalization);


build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));
