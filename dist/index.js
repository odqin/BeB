#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const generate_1 = __importDefault(require("./commands/generate"));
const program = new commander_1.Command();
program
    .name('BeB')
    .description('CLI tool to generate a backend project using Express and MongoDB')
    .version('1.0.0');
program
    .command('init')
    .description('Initialize the CLI tool')
    .action(init_1.initCLI);
program
    .command('generate')
    .description('Generate a new backend project structure')
    .argument('<project-name>', 'Name of the project to create')
    .action(generate_1.default);
program.parse(process.argv);
