var fs = require('fs')
var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync')
var redirect = require('connect-redirection')
var size = require('gulp-size')
var bump = require('gulp-bump')
var git = require('gulp-git')
var runSequence = require('run-sequence')
var zip = require('gulp-zip')
// var connect = require('gulp-connect-multi')();
// var ghpages = require('gh-pages');
// var clean = require('gulp-clean');
// var path = require('path');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './',
      middleware: [
        redirect(),
        function(req, res, next) {
          if (req.url === '/') {
            return res.redirect('http://localhost:3000/node_modules/intern/client.html?config=tests/intern')
          }
          next()
        }
      ]
    }
  })
})

gulp.task('build-element', function() {

  var bundler = browserify({
    entries: ['./src/<%= elementName %>.js'],
    debug: true,
    standalone: '<%= elementName %>'
  })

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source('<%= elementName %>.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/'))
  }

  var minBundle = function() {
    return bundler
      .bundle()
      .pipe(source('<%= elementName %>.min.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/'))
      .pipe(size({showFiles: true, gzip: true}))
  }

  bundle()
  return minBundle()
})

gulp.task('zip-dist', function() {
  return gulp.src([
    'dist/**/*.js',
    'dist/**/*.map'
  ], {base: '.'})
  .pipe(zip('dist.zip'))
  .pipe(gulp.dest('dist'))
})

gulp.task('bump-patch', function() {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'))
})

gulp.task('bump-minor', function() {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type:'minor'}))
    .pipe(gulp.dest('./'))
})

gulp.task('bump-major', function() {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: 'major'}))
    .pipe(gulp.dest('./'))
})

gulp.task('tag', function () {
  var pkg = require('./package.json')
  var v = 'v' + pkg.version
  var message = 'Release ' + v

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'))
})

gulp.task('npm', function (done) {
  require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done)
})

gulp.task('sauce', function(done) {
  var envConfig, saucefile = '.sauce.json'

  if ((process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY)) {
     callSauceFromIntern()
  } else if (fs.existsSync(saucefile)) {
    fs.readFile(saucefile, function(err, data) {
      if (err) throw err
      envConfig = JSON.parse(data)
      //could be more rigorous below
      if (envConfig) {
        process.env.SAUCE_USERNAME = envConfig.account
        process.env.SAUCE_ACCESS_KEY = envConfig.key
      } else {
        throw 'Error'
      }
      callSauceFromIntern()        
    })
  } else {
    gutil.log('\nFile .sauce.json not found.\n' +
              'Sauce env variables not found.\n' +
              'Run "slush ultralight:sauce-setup" to configure ')
    done()
  }

  function callSauceFromIntern () {
    require('child_process').spawn('./node_modules/.bin/intern-runner', ['config=tests/intern'], { stdio: 'inherit', env: process.env })
      .on('close', done)
  }
})

gulp.task('build', ['build-element'])
gulp.task('test-local', function(done) {runSequence('build-element', 'browser-sync', done)})
gulp.task('test-sauce', ['sauce'])
gulp.task('release-patch', function(done) {runSequence('bump-patch', 'tag', 'npm', done)})
gulp.task('release-minor', function(done) {runSequence('bump-minor', 'tag', 'npm', done)})
gulp.task('release-major', function(done) {runSequence('bump-major', 'tag', 'npm', done)})


// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md

// var copy = function() {
//   gulp.src([
//     'bower_components/**/*',
//     'demo/*',
//     'src/*',
//     'index.html'
//     ], {
//       base: './'
//     })
//     .pipe(gulp.dest('./.tmp/'));
// }

// var ignore = function() {
//   gulp.src(['./.tmp/bower_components/<%= githubRepository %>'])
//     .pipe(clean());
// }

// gulp.task('server', connect.server({
//   root: [__dirname],
//   port: 8000,
//   livereload: true
// }))

// gulp.task('beforebuild', function() {
//   copy()
//   ignore()
// })

// gulp.task('deploy', ['beforebuild'], function () {

//   ghpages.publish(path.join(__dirname, '.tmp/'), {
//       clone: 'bower_components/<%= githubRepository %>',
//       logger: function(message) {
//         console.log(message)
//       }
//   } , function(err) {

//     console.log('');
//     if (err.errno === 34) {
//       console.log('Error: You need run "gulp build" before deploy your custom element in gh-pages.\n')
//     } else if (typeof err.errno === "undefined") {
//       console.log('Error: You need add a remote repository before deploy your custom element in gh-pages.\n')
//     }
//   }, true)
// })
