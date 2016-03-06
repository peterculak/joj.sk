/* jshint node: true */
'use strict';

var branch = process.env.BRANCH ? process.env.BRANCH : 'development';

var del             = require('del');
var g               = require('gulp-load-plugins')();
var gulp            = require('gulp');
var runSequence     = require('run-sequence');
var gulpif          = require('gulp-if');
var replace         = require('gulp-replace-task');
var ga              = require('gulp-ga');

// === Paths ===

var assets          = {toString: function() { return 'assets' }};
assets.images       = {toString: function() { return assets + '/images' }};
assets.images.files = assets.images + '/**/*';

var libs            = {toString: function() { return 'libs' }};
var vendor          = {toString: function() { return 'bower_components' }};

var src             = {toString: function() { return 'src' }};
src.app             = {toString: function() { return src + '/app' }};
src.app.shared      = {toString: function() { return src.app + '/_shared' }};
src.app.files       = src.app + '/**/*.js';
src.app.templates   = src.app + '/**/*.html';
src.index           = src + '/index.html';

var dist            = {toString: function() { return 'dist' }};
dist.app            = {toString:function() { return dist + '/app' }};
dist.app.templates  = dist.app + '/templates.js';
dist.index          = dist + '/index.html';
dist.scripts        = {toString:function() { return dist + '/scripts' }};

// === Develpement ===

gulp.task('clean', function(cb) {
  return del([
    dist + '/*'
  ], cb);
});

/**
 * @todo: setup cross domain tracking for ga
 * For now just don't include ga anywhere else but live
 */
gulp.task('index', function() {
  var sources = gulp.src(src.app.files, {read: false});

  var constants = getConstants();

  return gulp.src(src.index)
    .pipe(g.inject(sources, {
      addRootSlash: false,
      ignorePath: '/src'
    }))
    .pipe(gulpif(branch === 'production', ga(constants.ga)))
    .pipe(gulp.dest(''+dist));
});

gulp.task('jshint', function() {
  return gulp.src(src.app.files)
    .pipe(g.jshint())
    .pipe(g.jshint.reporter('jshint-stylish'));
});

gulp.task('templates', function() {
  return gulp.src(src.app.templates)
    .pipe(g.angularTemplatecache({
      module: 'joj.templates',
      standalone: true,
      root: 'app'
    }))
    .pipe(gulp.dest(''+dist.app));
});

gulp.task('constants', function() {
  var constants = getConstants();

  console.log(constants);

  return g.ngConstant({
    constants: constants,
    name: 'joj.shared',
    deps: false,
    stream: true
  })
  .pipe(gulp.dest(''+src.app.shared));
});

gulp.task('serve', function() {
  return g.connect.server({
    host: 'dev.joj.co',
    port: '80',
    root: [''+dist, ''+src, ''+assets, ''+libs],
    middleware: function(connect, options) {
      var c = connect();

      return [
        c.use('/' + vendor, connect.static(''+vendor))
      ];
    }
  });
});

gulp.task('watch', function() {
  g.livereload.listen();

  // compile handlers
  gulp.watch(src.app.files, ['index', 'jshint']);
  gulp.watch(src.app.templates, ['templates']);
  gulp.watch(src.index, ['index']);
  //gulp.watch([src.styles.files, src.styles.includes], ['styles']);


  // livereload handlers
  gulp.watch([
      src.app.files,
      dist.app.templates,
      dist.index,
      dist.styles.files
    ]).on('change', g.livereload.changed);
});

// === Build ===

gulp.task('clean:build', function(cb) {
  return del([
    dist.app + '',
    dist.scripts + '/app.js',
    dist.scripts + '/lib.js',
    dist.scripts + '/modernizr.js',
    dist.scripts + '/vendor.js',
    dist.styles + '/app.css',
    dist.styles + '/main.css',
    dist.styles + '/vendor.css',
    dist.images + '',
  ], cb);
});

gulp.task('index:build', function() {
  var assetsRef = g.useref.assets({
    searchPath: ['.', ''+dist, ''+libs, ''+src]
  });

  var vendorCss = g.filter('styles/vendor.css');
  var appCss = g.filter('styles/app.css');
  var modernizr = g.filter('scripts/modernizr.js');
  var vendorJs = g.filter('scripts/vendor.js');
  var libsJs = g.filter('scripts/lib.js');
  var appJs = g.filter('scripts/app.js');
  var index = g.filter('index.html');

  return gulp.src(dist.index)
    // load assets into Gulp stream
    .pipe(assetsRef)

    // CSSO vendor styles
    .pipe(vendorCss)
    .pipe(g.csso())
    .pipe(vendorCss.restore())

    // CSSO app styles
    .pipe(appCss)
    .pipe(g.csso())
    .pipe(appCss.restore())

    // Uglify Modernizr
    .pipe(modernizr)
    .pipe(gulpif(branch === 'production' || branch === 'staging', g.uglify()))
    .pipe(modernizr.restore())

    // Uglify vendors
    .pipe(vendorJs)
    .pipe(gulpif(branch === 'production' || branch === 'staging', g.uglify()))
    .pipe(vendorJs.restore())

    // Uglify libs
    .pipe(libsJs)
    .pipe(gulpif(branch === 'production' || branch === 'staging', g.uglify()))
    .pipe(libsJs.restore())

    // ng-annotate & Uglify app
    .pipe(appJs)
    .pipe(g.ngAnnotate())
    .pipe(gulpif(branch === 'production' || branch === 'staging', g.uglify()))
      .on('error', function(err) { console.warn(err.message) })
    .pipe(appJs.restore())

    .pipe(g.rev())
    .pipe(assetsRef.restore())
    .pipe(g.useref())
    .pipe(g.revReplace())
    .pipe(gulp.dest(''+dist));
});

gulp.task('images', function() {
  return gulp.src(assets.images.files)
    .pipe(gulp.dest(''+dist.images));
});


// === Main tasks definitions ===

gulp.task('build', function() {
  return runSequence(
    'constants',
    ['index', 'templates'],
    'index:build',
    'clean:build',
    'images'
  );
});

gulp.task('default', function() {
  return runSequence(
    'clean',
    'constants',
    ['index', 'jshint', 'serve', 'templates'],
    'watch'
  );
});

var getConstants = function () {
  var myConfig = require('./config.json');

  var constants = null;

  if (branch !== 'production' && branch !== 'staging' && branch !== 'development') {
    constants = myConfig['%branch%'];
    constants.name = constants.name.replace('%branch%', branch);
    constants.siteUrl = constants.siteUrl.replace('%branch%', branch);
    constants.pagesUrl = constants.pagesUrl.replace('%branch%', branch);
    constants.apiEndPoint = constants.apiEndPoint.replace('%branch%', branch);
    constants.cookieOptions.domain = constants.cookieOptions.domain.replace('%branch%', branch);
    constants.ga.url = constants.ga.url.replace('%branch%', branch);
  } else {
    constants = myConfig[branch];
  }

  return constants;
};