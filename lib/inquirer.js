const inquirer = require('inquirer');

const minimist = require('minimist');

const files = require('./files');

module.exports = {
    askGithubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your github username or email',
                validate: (value) => {
                    if (value.length) {
                        return true
                    }else {
                        return 'Please enter your github username or email'
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your github password',
                validate: (value) => {
                    if (value.length) {
                        return true
                    }else {
                        return 'Please enter your github password'
                    }
                }
            }

        ]

        return inquirer.prompt(questions);
    }
}