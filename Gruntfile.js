'use strict';

process.env.AWS_

const grunt = require('grunt');
grunt.loadNpmTasks('grunt-aws-lambda');

grunt.initConfig({
    lambda_invoke: {
        default: {},
    },

    lambda_deploy: {
        default: {
            arn: 'arn:aws:lambda:eu-west-1:541243713624:function:khux-wiki-scraper'
        },
    },

    lambda_package: {
        default: {},
    },
});

grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy']);