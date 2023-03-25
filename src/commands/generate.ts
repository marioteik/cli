import * as yargs from 'yargs';

const commands = {
    r: "route",
    c: "component",
    ctx: "context",
};

export const command = "generate <command> [path]";
export const aliases = ["g"];
export const describe = `Generates ${commands.r}, ${commands.c} and ${commands.ctx}.`;

export const builder = (yargs: yargs.Argv) => {
    return yargs.commandDir("generate");
};
