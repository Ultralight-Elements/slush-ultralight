// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
  // The port on which the instrumenting proxy will listen
  proxyPort: 9000,

  // A fully qualified URL to the Intern proxy
  proxyUrl: 'http://localhost:9000/',

  // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
  // specified browser environments in the `environments` array below as well. See
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
  // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
  // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
  // automatically
  capabilities: {
    'selenium-version': '2.41.0'
  },

  // Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
  // OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
  // capabilities options specified for an environment will be copied as-is
  //
  // ULTRALIGHT-ELEMENTS NOTE: These browsers represent the minimal set of browsers that all Ultralight elements
  // should be tested against.  IE 8 is not yet compatible with the Ultralight platform due to it's lack of support
  // for mutation events.  IE 9-11 do not natively support the custom elements spec, and 9-10 do not natively support 
  // the custom event constructor.  Firefox 30 and Chrome 34 predate native support for the custom elements 
  // spec.  The latest version of Firefox and Chrome should also be tested.  The earliest version of mobile safari 
  // that is compatible with intern seems to be 7.1.  It would be preferable to test against an earlier version if
  // it can be done so reliably.
  
  environments: [
    {browserName: 'internet explorer', version: '11'},
    {browserName: 'internet explorer', version: '10'},
    {browserName: 'internet explorer', version: '9'},
    {browserName: 'firefox', version: '30'},
    {browserName: 'firefox', version: '33'},
    {browserName: 'chrome', version: '34'},
    {browserName: 'chrome', version: '39'},
    {browserName: 'safari', version: '6'},
    {browserName: 'safari', version: '8'},
    {browserName: 'iphone', version: '7.1'},
    {browserName: 'iphone', version: '8.1'},
    {browserName: 'android', version: '4.1'}
  ],

  // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
  maxConcurrency: 3,

  // Name of the tunnel class to use for WebDriver tests
  tunnel: 'SauceLabsTunnel',

  // The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
  // loader
  useLoader: {
    'host-node': 'dojo/dojo',
    'host-browser': 'node_modules/dojo/dojo.js'
  },

  // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
  // can be used here.
  loader: {
    // Packages that should be registered with the loader in each testing environment
    packages: [
      {name: 'customelement', location: 'dist'},
      {name: 'platform', location: 'node_modules/ultralight-platform/dist'}
    ]
  },

  // Non-functional test suite(s) to run in each browser
  suites: ['tests/unit/tests'],

  // Functional test suite(s) to run in each browser once non-functional tests are completed
  functionalSuites: [/* 'myPackage/tests/functional' */],

  // A regular expression matching URLs to files that should not be included in code coverage analysis
  excludeInstrumentation: /^(?:tests|node_modules|bower_components)\//
});
