# Ultralight Generator<br> for Custom Elements<br>
[![NPM version](http://img.shields.io/npm/v/slush-ultralight.svg?style=flat)](http://npmjs.org/slush-ultralight)
[![NPM downloads](http://img.shields.io/npm/dm/slush-ultralight.svg?style=flat)](http://npmjs.org/slush-ultralight)
[![Dependency Status](http://img.shields.io/david/Ultralight-Elements/slush-ultralight.svg?style=flat)](https://david-dm.org/Ultralight-Elements/slush-ultralight)

> A Slush Generator to easily create Custom Elements using pure VanillaJS, especially for use with the Ultralight-Elements project.

## Install

Install this generator using NPM:

```sh
$ [sudo] npm install -g slush slush-ultralight
```

## Getting Started

There are several generators available.

* The first one is used to scaffold out an **entire project**, and tries to offer sensible defaults

    ```sh
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

    Which will generate the following files::

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
├── .travis.yml
└── tests
    ├── functional
    ├── intern.js
    └── unit
        └── tests.js

    ```

* The second one is used to scaffold an **individual custom element**:

    ```sh
$ slush ultralight:element
    ```

    ```
[?] What"s the name of your element?
[?] Use simple style or compact defineProperties style? 
   ```

> _**Note**: files will be generated in the current directory, so be sure to change to a new directory before running those commands if you don't want to overwrite existing files._


* Also included is a generator to help you register the custom element with bower

    ```sh
$ slush ultralight:register-bower
    ```


* To set up local testing against saucelabs, you can use
    ```sh
$ slush ultralight:setup-sauce
    ```

after which, you may use:

    ```sh
$ gulp sauce
    ```

from within your created project to initiate tests directly from your machine to saucelab's suite of browsers

 
## Contributing

Join us at https://github.com/Ultralight-Elements

## License

MIT License © The Ultralight-Element authors
