"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builder = exports.describe = exports.aliases = exports.command = void 0;
const commands = {
    r: "route",
    c: "component",
    ctx: "context",
};
exports.command = "generate <command> [path]";
exports.aliases = ["g"];
exports.describe = `Generates ${commands.r}, ${commands.c} and ${commands.ctx}.`;
const builder = (yargs) => {
    return yargs.commandDir("generate");
};
exports.builder = builder;
