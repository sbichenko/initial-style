// Karma configuration
// Generated on Mon Jul 13 2015 20:43:58 GMT+0300 (EEST)

module.exports = function(config) {
    var configuration = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine-jquery', 'jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/jasmine-jquery/vendor/jquery/jquery.js',
            'initial-style.js',
            'tests/spec.js',
            {pattern: 'tests/*.html', watched: true, served: true, included: false}
        ],


        // list of files to exclude
        exclude: [],
        plugins: [
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-jasmine-jquery',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-sauce-launcher'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
        // config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome',
            'Firefox'
        ],

        customLaunchers: {
            'SL_Chrome': {
                base: 'SauceLabs',
                browserName: 'chrome'
            },
            'SL_FireFox': {
                base: 'SauceLabs',
                browserName: 'firefox'
            }
        },

        sauceLabs: {
            testName: 'Web App Unit Tests',
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
            username: process.env.SAUCE_USERNAME,
            accessKey: process.env.SAUCE_ACCESS_KEY,
            startConnect: false,
            connectOptions: {
                port: 5757,
                logfile: 'sauce_connect.log'
            }
        },

        captureTimeout: 0,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    };

    if(process.env.TRAVIS){
        configuration.browsers = ['SL_Chrome', 'SL_FireFox'];
    }

    config.set(configuration);
};
