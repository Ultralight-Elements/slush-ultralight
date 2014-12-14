'use strict'

var fs = require('fs')

var fs = require('fs'),
    gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    iniparser = require('iniparser')

var isTrue = function(v) {
  return v === true ||
         v === 'true' ||
         v === 'y' ||
         v === 'yes' ||
         v === 'Y' ||
         v === 'Yes' ? true : false
}

function format(string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

var defaults = (function() {
  var homeDir = process.env.HOME ||
                process.env.HOMEPATH ||
                process.env.USERPROFILE,
      workingDirName = process.cwd().split('/').pop().split('\\').pop(),
      osUserName = homeDir && homeDir.split('/').pop() || 'root',
      configFile = homeDir + '/.gitconfig',
      user = {}

  if (fs.existsSync(configFile)) {
    user = iniparser.parseSync(configFile).user;
  }

  return {
    workingDirName: workingDirName,
    userName: format(user.name) || osUserName,
    authorEmail: user.email || ''
  };
})()

gulp.task('default', function(done) {
  var prompts = [{
    name: 'elementName',
    message: 'Element Name:',
    default: defaults.workingDirName
  }, {
    name: 'elementDescription',
    message: 'Element Description:',
    default: 'My awesome Custom Element'
  }, {
    name: 'elementVersion',
    message: 'Version Number:',
    default: '1.0.0'
  }, {
    name: 'githubUsername',
    message: 'GitHub Username:',
    default: defaults.userName
  }, {
    name: 'githubRepository',
    message: 'GitHub Repository Name:',
    default: defaults.workingDirName
  }, {
    name: 'githubEmail',
    message: 'Email:',
    default: defaults.authorEmail
  }, {
    name: 'license',
    message: 'License:',
    default: 'MIT'
  }, {
    name: 'copyrightHolder',
    message: 'Copyright Holder:'
  }]

  inquirer.prompt(prompts, function(answers) {
    var files = [];
    files.push(__dirname + '/templates/common/**')
    if (answers.license === 'MIT') {
      files.push(__dirname + '/templates/licenses/mit/LICENSE')
    }
    gulp.src(files)
      .pipe(template(answers))
      .pipe(rename(function(file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1)
        }
        if (file.basename === 'ult-element') {
          file.basename = _.slugify(answers.elementName)
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function() {
        done()
      })
  })
})

gulp.task('element', function(done) {
  var prompts = [{
    name: 'elementName',
    message: 'What"s the name of your element?',
    default: defaults.workingDirName
  }]

  inquirer.prompt(prompts, function(answers) {
    var files = [];
    files.push(__dirname + '/templates/common/src/**')

    gulp.src(files)
      .pipe(template(answers))
      .pipe(rename(function(file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1)
        }
        if (file.basename === 'ult-element') {
          file.basename = _.slugify(answers.elementName)
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function() {
        done()
      })
  })
})
