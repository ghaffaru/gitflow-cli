const gitflow = require('commander');

const chalk = require('chalk')

const figlet = require('figlet')

const clear = require('clear');

const files = require('./lib/files');

gitflow
    .command('init')

    .description('Draw the app banner')

    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync('gitflow-cli', {horizontalLayout: 'full'})));

    })

gitflow.parse(process.argv);

if (!gitflow.args.length) {
    gitflow.help()
}