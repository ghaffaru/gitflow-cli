#!/usr/bin/env node

const Octokit = require('@octokit/rest');
const { createBasicAuth } = require("@octokit/auth-basic");
const _ = require("lodash");
const CLI = require("clui");
const Spinner = CLI.Spinner;

const Configstore = require("configstore");

const pkg = require("../package.json");
const inquirer = require("./inquirer");

const conf = new Configstore(pkg.name);

module.exports = {
  getInstance: () => {
    return octokit;
  },

  githubAuth: (token) => {
    // octokit.authenticate({
    //   type: "oauth",
    //   token: token,
    // });
    // octokit = new Octokit({
    //     auth: token
    //   });
  },

  getStoredGithubToken: () => {
    // conf.delete('github.token')
    return conf.get("github.token");
  },

  setGithubCredentials: async () => {
    
    const credentials = await inquirer.askGithubCredentials();
    const status = new Spinner("Authenticating you, please wait...");

    status.start();
    const auth = createBasicAuth({
      username: credentials.username,
      password: credentials.password,
      async on2Fa() {
        // TBD
      },
      token: {
        scopes: ["user", "public_repo", "repo", "repo:status"],
        note: "gitflow, the command-line tool for initalizing Git repos",
      },
    });

    try {
      const res = await auth();
      if (res.token) {
        conf.set("github.token", res.token);
        return res.token;
      } else {
        console.log('Github token was not found in the response');
        process.exit()
      }
    }catch (err) {
        console.log('Github token was not found in the response');
        process.exit()
    } 
    finally {
      status.stop();
    }

  },

};
