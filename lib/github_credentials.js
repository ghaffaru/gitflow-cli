const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();

const _  = require('lodash');


const Configstore = require('configstore');

const pkg = require('../package.json');
const inquirer = require('inquirer');

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
        const credentials = await inquirer.askGithubCredentials();

        octokit.authenticate(_.extend({type: 'basic'}, credentials));

    },

    registerNewToken: async () => {
        try {
            const response = await octokit.oauthAuthorization.createAuthorization({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'gitflow-cli: a cool tool for git automation'
            })
            
            const token = response.data.token;

            if (token) {
                conf.set('github_credentials.token', token);
                return token;
            } else {
                throw new Error('Missing Token', 'Could not authenticate');
            }
        }
        catch(err) {
            console.log(err);
        }
    }
}


