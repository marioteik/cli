"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
exports.command = 'hello <name>';
exports.desc = 'Prints hello world with the given name.';
const builder = (yargs) => {
    yargs.positional('name', {
        type: 'string',
        desc: 'The name to include in the hello message',
    });
};
exports.builder = builder;
const handler = async (args) => {
    console.log(`Hello ${args.name} duh!`);
};
exports.handler = handler;
