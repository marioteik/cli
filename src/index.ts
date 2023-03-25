#!/usr/bin/env node
import * as yargs from 'yargs';
import * as path from 'path';

const argv = yargs
    .commandDir(path.join(__dirname, 'commands'))
    .help().argv;
