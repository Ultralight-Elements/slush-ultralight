# Ultralight Generator<br> for Custom Elements<br>
[![NPM version](http://img.shields.io/npm/v/slush-ultralight.svg?style=flat)](http://npmjs.org/slush-ultralight)
[![NPM downloads](http://img.shields.io/npm/dm/slush-ultralight.svg?style=flat)](http://npmjs.org/slush-ultralight)
[![Dependency Status](http://img.shields.io/david/Ultralight-Elements/slush-ultralight.svg?style=flat)](https://david-dm.org/Ultralight-Elements/slush-ultralight)

> A Slush Generator that provides a functional boilerplate to easily create Custom Elements using pure VanillaJS.

## Install

Install this generator using NPM:

```sh
$ [sudo] npm install -g slush-ultralight
```

## Getting Started

There are two different generators available.

* The first one used to scaffold out new **individual elements**:

    ```sh
$ slush ultralight
    ```

    ```
[?] What's the name of your element?
    ```

    Which will generate the following file::

    ```
.
└── my-element.js
    ```

* The second one is used to scaffold an **entire project**:

    ```sh
$ slush ultralight:repo
    ```

    ```
[?] What's the name of your element?
[?] How would you describe the element?
[?] What's the GitHub repository?
[?] What's your GitHub username?
[?] Do you want to include some useful Gulp tasks?
    ```

    Which will generate the following project structure with npm and bower dependencies installed:

    ```
.
├── .gitignore
├── bower.json
├── bower_components/
├── package.json
├── index.html
├── node_modules/
├── gulpfile.js
├── src/my-element.html
└── README.md
    ```

> _**Note**: files will be generated in the current directory, so be sure to change to a new directory before running those commands if you don't want to overwrite existing files._

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT License © The Ultralight-Element authors
