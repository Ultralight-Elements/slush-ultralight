'use strict'

var fs = require('fs')
var gulp = require('gulp')
var gutil = require('gulp-util')
var install = require('gulp-install')
var conflict = require('gulp-conflict')
var template = require('gulp-template')
var rename = require('gulp-rename')
var _ = require('underscore.string')
var inquirer = require('inquirer')
var iniparser = require('iniparser')
var cp = require('child_process')

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
    type: 'list',
    name: 'elementStyle',
    message: 'Use simple style or compact defineProperties style?',
    choices: ['simple', 'compact'],
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
    message: 'GitHub Repo Name:',
    default: defaults.workingDirName
  }, {
    name: 'githubFullRepoName',
    message: 'Full GitHub Repository Name',
    default: defaults.userName + '/' + defaults.workingDirName
  },
  {
    name: 'gitInit',
    message: 'Initialize git repository?',
    default: 'yes'
  }, {
    type: 'list',
    name: 'gitProtocol',
    message: 'Connect with https or ssh?',
    choices: ['https', 'ssh'],
    when: function(answers) {
      return isTrue(answers.gitInit)
    }
  }, {
    name: 'githubPages',
    message: 'Initialize Github Pages?',
    default: 'yes',
    when: function(answers) {
      return isTrue(answers.gitInit)
    }
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
    message: 'Copyright Holder:',
    default: 'The Ultralight-Elements authors'
  }]

  inquirer.prompt(prompts, function(answers) {
    var files = [];
    files.push(__dirname + '/templates/common/**')
    if (answers.elementStyle === 'simple') {
      files.push(__dirname + '/templates/srcs/simple/**')
    } else if (answers.elementStyle === 'compact') {
      files.push(__dirname + '/templates/srcs/compact/**')
    }
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
      .on('finish', function() {
        var url
        if (isTrue(answers.gitInit)) {
          cp.spawn('git', ['init']).on('close', function() {
            cp.spawn('git', ['add', '-A']).on('close', function() {
              cp.spawn('git', ['commit', '-m"initial commit"']).on('close', function() {
                if (answers.gitProtocol === 'https') {
                  url = 'https://github.com/' +  answers.githubFullRepoName
                  cp.spawn('git', ['remote', 'add', 'origin', url]).on('close', function() {
                    if (isTrue(answers.githubPages)) {
                      cp.spawn('git', ['checkout', '--orphan', 'gh-pages']).on('close', function() {
                        cp.spawn('git', ['add', '-A']).on('close', function() {
                          cp.spawn('git', ['commit', '-m"initial gh-pages commit"']).on('close', function() {
                            cp.spawn('git', ['checkout', 'master']).on('close', function() {
                              done()
                            })
                          })
                        })
                      })
                    }
                  })
                  } else if (answers.gitProtocol === 'ssh') {
                    url = 'git@github.com:' + answers.githubFullRepoName + '.git'
                    cp.spawn('git', ['remote', 'add', 'origin', url]).on('close', function() {
                      if (isTrue(answers.githubPages)) {
                        cp.spawn('git', ['checkout', '--orphan', 'gh-pages']).on('close', function() {
                          cp.spawn('git', ['add', '-A']).on('close', function() {
                            cp.spawn('git', ['commit', '-m"initial gh-pages commit"']).on('close', function() {
                              cp.spawn('git', ['checkout', 'master']).on('close', function() {
                                done()
                              })
                            })
                          })
                        })
                      }
                    })
                  }
              })
            })
          })
        }
      })
  })
})

gulp.task('element', function(done) {
  var prompts = [{
    name: 'elementName',
    message: 'What"s the name of your element?',
    default: defaults.workingDirName
  }, {
    type: 'list',
    name: 'elementStyle',
    message: 'Use simple style or compact defineProperties style?',
    choices: ['simple', 'compact'],
  }]

  inquirer.prompt(prompts, function(answers) {
    var files = [];
    if (answers.elementStyle === 'simple') {
      files.push(__dirname + '/templates/srcs/simple/src/**')
    } else if (answers.elementStyle === 'compact') {
      files.push(__dirname + '/templates/srcs/compact/src/**')
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

gulp.task('register-bower', function(done) {

  var prompts = [{
    name: 'packageName',
    message: 'Package Name:',
    default: defaults.workingDirName
  },  {
    name: 'githubUsername',
    message: 'GitHub Username:',
    default: defaults.userName
  }]

  inquirer.prompt(prompts, function(answers) {
    require('child_process').spawn('bower',
      [
        'register',
        answers.packageName,
        'git://github.com/' + answers.githubUsername +
          '/' + answers.packageName + '.git'
      ],  {stdio: 'inherit'})
    .on('close', done)
    .on('error', function() {
      gutil.log('Error registering ' + answers.packageName + ' with bower.')
      done()
    })
  })
})

gulp.task('setup-sauce', function(done) {

  var prompts = [{
    name: 'sauceName',
    message: 'This is ignored by git, npm and bower.\n Saucelabs Account Name:',
    default: defaults.userName
  }, {
    name: 'sauceKey',
    message: 'Saucelabs Access Key:'
  }]

  inquirer.prompt(prompts, function(answers) {
    fs.writeFile(
      '.sauce.json',
      JSON.stringify({account: answers.sauceName, key: answers.sauceKey}),
      function(err) {
        if (!err) {
          gutil.log(
            'Ready for local testing against Sauce labs.\n' +
            'See tests/intern.js for preconfigured browsers.')
          done()
        }
      })
  })
})

gulp.task('npm-register', function(done) {})
