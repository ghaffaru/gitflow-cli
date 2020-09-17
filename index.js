const gitflow = require('commander');

const chalk = require('chalk')

const figlet = require('figlet')

const clear = require('clear');

const files = require('./lib/files');

const github = require('./lib/github_credentials');

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
 

gitflow.parse(process.argv);

if (!gitflow.args.length) {
    gitflow.help()
}