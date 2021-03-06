# Ultralight Generator<br> for Custom Elements<br>
[![NPM version](http://img.shields.io/npm/v/slush-ultralight.svg?style=flat)](http://npmjs.org/slush-ultralight)
[![NPM downloads](http://img.shields.io/npm/dm/slush-ultralight.svg?style=flat)](http://npmjs.org/slush-ultralight)
[![Dependency Status](http://img.shields.io/david/Ultralight-Elements/slush-ultralight.svg?style=flat)](https://david-dm.org/Ultralight-Elements/slush-ultralight)

> A Slush Generator to easily create Custom Elements using pure VanillaJS, especially for use with the Ultralight-Elements project.

## Install

Install this generator using NPM:

```
$ [sudo] npm install -g slush-ultralight
```

If you haven't installed [slush](http://slushjs.github.io/#/) globally, you will also need  to install that as well

```
$ [sudo] npm install -g slush
```

## Getting Started

There are several generators available.

* The first one is used to scaffold out an **entire project**, and tries to offer sensible defaults

    ```
$ slush ultralight
    ```

    ```
[?] Element Name:
[?] Use simple style, or more compact (definePropertiesque) style?
[?] Element Description:
[?] Version Number:
[?] GitHub Username:
[?] GitHub Repo Name:
[?] Full GitHub Repository Name:
[?] Initialize git repository?
[?] Connect with https or ssh?
[?] Initialize Github Pages?
[?] Email:
[?] License:
[?] Copyright Holder
    ```

    Which will generate the following files:

    ```
.
├── bower_components/
├── bower.json
├── dist/
├── .gitignore
├── gulpfile.js
├── index.html
├── LICENSE
├── node_modules/
├── package.json
├── README.md
├── src/
│    └──<your-custom-element>.js
├── README.md
├── tests
│    ├── functional
│    ├── intern.js
│    └── unit
│        └── tests.js
└── .travis.yml

    ```

* A second one is used to scaffold an **individual custom element**:

    ```
$ slush ultralight:element
    ```

    ```
[?] What"s the name of your element?
[?] Use simple style or compact defineProperties style? 
   ```

> _**Note**: files will be generated in the current directory, so be sure to change to a new directory before running those commands if you don't want to overwrite existing files.  To maximize your convenience, this directory should have the same name as your custom element._


* Also included is a generator to help you register the custom element with bower

    ```
$ slush ultralight:register-bower
    ```


* To set up local testing with saucelabs, you can use
    ```
$ slush ultralight:setup-sauce
    ```

    after which, you may use:

    ```
$ gulp test-sauce
    ```

    from within your created project to initiate tests directly from your machine to saucelab's suite of browsers

 
## Contributing

Join us at https://github.com/Ultralight-Elements

## License

MIT License © 2014, The Ultralight-Element authors, based on the [slush-element](https://github.com/webcomponents/slush-element) project, Copyright © 2014, Beto Muniz
