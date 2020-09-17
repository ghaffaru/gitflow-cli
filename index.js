#!/usr/bin/env node
const gitflow = require('commander');

const chalk = require('chalk')

const figlet = require('figlet')

const clear = require('clear');

const files = require('./lib/files');

const github = require('./lib/github_credentials');

const create_a_repo = require('./lib/create_a_repo');
const { setGithubCredentials } = require('./lib/github_credentials');
const { create } = require('lodash');

gitflow
    .command('init')

    .description('Draw the app banner')

    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync('gitflow-cli', {horizontalLayout: 'full'})));

    })

gitflow
    .command('octocheck')

    .description('Check github credentials')

    .action( async () =>  {
        let token = github.getStoredGithubToken();

        if (!token) {
            token = await github.setGithubCredentials();

        }

        console.log(token);
    })
 

gitflow
        .command('create_repo')
        .description('Create a new repo on github')
        .action(async() => {
            const getGithubToken = async () => {
                let token = github.getStoredGithubToken();
                if (token) {
                    return token;
                }

                token = await setGithubCredentials();

                return token
            }
            try {
                const token = await getGithubToken();

                github.githubAuth(token);

                const url = await create_a_repo.createRemoteRepo();

                await create_a_repo.createGitignore();

                const complete = await create_a_repo.setupRepository(url);

                if (complete) {

                    console.log(chalk.green('All done!'));

                }

            }
            catch (err)  {
                if (err) {
                    switch(err.status) {
                        case 401:
                            console.log(chalk.red('Could not login you in'));
                            break;
                        case 422:
                            console.log(chalk.red('Rep already exists'));
                            break;
                        
                        default: 
                            console.log(err);
                            break;

                    }
                }
            }
        })

gitflow.parse(process.argv);

if (!gitflow.args.length) {
    gitflow.help()
}