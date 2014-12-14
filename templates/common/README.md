# &lt;<%= githubRepository %>&gt;

> <%= elementDescription %>

## Demo

[Check it live!](http://<%= githubUsername %>.github.io/<%= githubRepository %>)

## Install
Install the components using [NPM](http://www.npmjs.org)

```sh
$ npm install <%= githubRepository %> --save
```

Install the component using [Bower](http://bower.io/):

```sh
$ bower install <%= githubRepository %> --save
```

Or [download as ZIP](https://github.com/<%= githubUsername %>/<%= githubRepository %>/archive/master.zip).

## Usage

1. Import the tiny (**2.6k** minified and gzipped) Ultralight-Elements platform:

    ```html
    <script src="bower_components/Ultralight-Elements/ultralight-platform.min.js"></script>
    ```

    or require ultralight-platform with **browserify** or your favorite **AMD** module loader

2. Import Custom Element:

    ```html
    <script src="bower_components/<%= githubRepository %>/dist/<%= elementName %>.min.js">
    ```

    or require <%= githubRepository %> with **browserify** or your favorite **AMD** loader

3. Start using it!

    ```html
    <<%= elementName %>></<%= elementName %>>
    ```

## Options

Attribute     | Options     | Default      | Description
---           | ---         | ---          | ---
`foo`         | *string*    | `bar`        | Lorem ipsum dolor.

## Methods

Method        | Parameters   | Returns     | Description
---           | ---          | ---         | ---
`unicorn()`   | None.        | Nothing.    | Magic stuff appears.

## Events

Event         | Description
---           | ---
`onsomething` | Triggers when something happens.

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

* Install [Bower](http://bower.io/) & [Gulp](http://gulpjs.com/):

    ```sh
    $ [sudo] npm install -g bower gulp
    ```

* Install local dependencies:

    ```sh
    $ bower install && npm install
    ```

* To test your project, start the development server and open `http://localhost:8000`.

    ```sh
    $ gulp server
    ```

* To build the distribution files before releasing a new version.

    ```sh
    $ gulp build
    ```

* To provide a live demo, send everything to `gh-pages` branch.

    ```sh
    $ gulp deploy
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/<%= githubUsername %>/<%= githubRepository %>/CHANGELOG.md).

## License

<% if (license === 'MIT') { %>
[MIT License](http://opensource.org/licenses/MIT)
<% } %>
