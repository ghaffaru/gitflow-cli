const octokit = require('@octokit/rest');

const _  = require('lodash');


const Configstore = require('configstore');

const pkg = require('../package.json');

const conf = new Configstore(pkg.name)

module.exports = {
    getInstance: () => {
        return octokit;
    },

    githubAuth: (token) => {
        octokit.authenticate({
            type: 'oauth',
            token: token
        })
    },

    getStoredGithubToken: () => {
        return conf.get('github_credentials.token');
    },

    setGithubCredentials: async () => {
        
    }
}

