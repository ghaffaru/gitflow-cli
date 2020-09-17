const gitflow = require('commander');

const chalk = require('chalk')

const figlet = requre('figlet')

const clear = require('clear');

const files = require('./lib/files');

gitflow
    .command('init')

    .description('Draw the app banner')

    .