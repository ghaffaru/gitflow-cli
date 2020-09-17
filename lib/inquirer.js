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
    },


    askRepositoryDetails: () => {
        const argv = require('minimist')(process.argv.slice(2))

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Please enter the name of your repository',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: (value) => {
                    if (value.length) {
                        return true
                    } else {
                        return 'Please enter  a unique name for the repository';
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                default: argv._[1] || null,
                message: 'Provide optional description'
            },
            {
                type: 'input',
                name: 'visibility',
                message: 'Public or Private Repo',
                choices: ['public', 'private'],
                default: 'public'
            }
        ];
        return inquirer.prompt(questions);
    }
}