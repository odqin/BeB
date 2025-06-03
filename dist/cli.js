"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generate_1 = __importDefault(require("./commands/generate"));
const init_1 = require("./commands/init");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .description('CLI tool to generate a backend project using Express and MongoDB');
program
    .command('generate <projectName>')
    .description('Generate a new backend project structure')
    .action((projectName) => {
    (0, generate_1.default)(projectName);
});
program
    .command('init')
    .description('Initialize the CLI tool')
    .action(() => {
    (0, init_1.initCLI)();
});
program.parse(process.argv);
