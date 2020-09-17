const _ = require('lodash');

const CLI = require('clui');

const Spinner = CLI.Spinner;

const fs = require('fs')

const inquirer = require('./inquirer');

const git = require('simple-git');

const gh = require('./github_credentials');

module.exports = {
    createRemoteRepo: async () => {
        const github = gh.getInstance();

        const answers = await inquirer.askRepositoryDetails();

        const data = {
            name: answers.name,
            description: answers.description,
            private: (answers.visibility == 'private')
        };
        const status = new Spinner('Creating remote repository...');
        status.start();
    

        try {
            const response = await github.repos.createForAuthenticatedUser(data);

            return response.data.ssh_url;
        }
        catch (err) {
            console.log(err);
            process.exit();
        }
        finally {
            status.stop()
        }
        
    },

    createGitignore: async () => {
        const fileList = _.without(fs.readdirSync('.'), '.git',  '.gitignore');

        if (fileList.length) {
            const answers = await inquirer.askIgnoreFiles(fileList);

            if (answers.ignore.length) {
                fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
            } else {
                touch('.gitignore');
            }
        }else {
            touch('.gitignore')
        }
    },

    setupRepository: async(url) => {
        try {
            await git
                    .init()
                    .add('.gitignore')
                    .add('./*')
                    .commit('Initial Commit')
                    .addRemote('origin', url)
                    .push('origin', master)
                    return true
        }
        catch (err) {
            console.log(err);
        }
    }
}