"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const readline_1 = require("readline");
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const templatesDir = path_1.default.join(__dirname, '../templates/project');
// Function to create a loading animation
function createLoadingAnimation() {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let index = 0;
    let intervalId;
    const start = (text) => {
        process.stdout.write('\x1B[?25l'); // Hide cursor
        intervalId = setInterval(() => {
            const frame = frames[index = ++index % frames.length];
            process.stdout.write(`\r${frame} ${text}`);
        }, 80);
    };
    const stop = () => {
        clearInterval(intervalId);
        process.stdout.write('\r\x1B[K'); // Clear line
        process.stdout.write('\x1B[?25h'); // Show cursor
    };
    return { start, stop };
}
async function promptUser(question) {
    const rl = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
async function generateProject(projectName) {
    try {
        console.log(`Generating project: ${projectName}`);
        // Ask user to choose between CommonJS and TypeScript
        const projectType = await promptUser('Choose project type:\n1. CommonJS\n2. TypeScript\nEnter your choice (1 or 2): ');
        let templatePath;
        if (projectType === '1') {
            console.log('Creating CommonJS project...');
            templatePath = path_1.default.join(templatesDir, 'commonjs');
        }
        else if (projectType === '2') {
            console.log('Creating TypeScript project...');
            templatePath = path_1.default.join(templatesDir, 'typescript');
        }
        else {
            console.log('Invalid choice. Defaulting to TypeScript...');
            templatePath = path_1.default.join(templatesDir, 'typescript');
        }
        console.log(`Using templates from: ${templatePath}`);
        // Check if templates directory exists
        try {
            await fs_1.promises.access(templatePath);
            console.log(`Templates directory exists at: ${templatePath}`);
        }
        catch (err) {
            console.error(`ERROR: Templates directory not found at: ${templatePath}`);
            console.error(`Current directory: ${__dirname}`);
            console.error(`Error details:`, err);
            return;
        }
        const projectPath = path_1.default.join(process.cwd(), projectName);
        // Check if directory already exists
        try {
            await fs_1.promises.access(projectPath);
            console.error(`Error: Directory ${projectName} already exists.`);
            return;
        }
        catch (err) {
            // Directory doesn't exist, which is what we want
        }
        // Create project directory
        console.log(`Creating project directory: ${projectPath}`);
        await fs_1.promises.mkdir(projectPath, { recursive: true });
        // Copy template files
        console.log(`Copying template files...`);
        await copyTemplateFiles(templatePath, projectPath);
        // Ensure package.json and .env.example are copied
        await ensureSpecialFilesExist(templatePath, projectPath);
        console.log(`\nProject ${projectName} created successfully! 🚀`);
        // Ask if the user wants to install dependencies
        const installDeps = await promptUser('Would you like to install dependencies now? (y/n): ');
        if (installDeps.toLowerCase() === 'y') {
            try {
                // Start loading animation for npm install
                console.log(`\nInstalling dependencies...\n`);
                const loader = createLoadingAnimation();
                loader.start('Installing packages... This might take a minute');
                // Change directory to project and install dependencies
                await execAsync(`cd "${projectPath}" && npm install`);
                // Stop loading animation
                loader.stop();
                console.log(`\n✅ Dependencies installed successfully! 📦`);
                // Ask if the user wants to start the application
                const startApp = await promptUser('Would you like to start the application now? (y/n): ');
                if (startApp.toLowerCase() === 'y') {
                    console.log(`\nStarting application...\n`);
                    // Use spawn instead of exec to properly handle stdio inheritance
                    const { spawn } = require('child_process');
                    console.log(`\nStarting server in ${projectPath}...\n`);
                    // Change directory to the project path
                    process.chdir(projectPath);
                    // Spawn npm start process with stdio inheritance
                    const child = spawn('npm', ['start'], {
                        stdio: 'inherit',
                        shell: true
                    });
                    // Handle process exit
                    child.on('close', (code) => {
                        console.log(`\nServer process exited with code ${code}`);
                    });
                    return;
                }
            }
            catch (error) {
                console.error('Error installing dependencies:', error);
            }
        }
        console.log(`\nNext steps:`);
        console.log(`  cd ${projectName}`);
        console.log(`  npm install    (if you haven't already)`);
        console.log(`  npm start      (to start the server)`);
        console.log(`\nHappy coding! 💻\n`);
    }
    catch (error) {
        console.error('Error generating project:', error);
    }
}
async function copyTemplateFiles(src, dest) {
    try {
        const entries = await fs_1.promises.readdir(src, { withFileTypes: true });
        for (const entry of entries) {
            const srcPath = path_1.default.join(src, entry.name);
            const destPath = path_1.default.join(dest, entry.name);
            if (entry.isDirectory()) {
                await fs_1.promises.mkdir(destPath, { recursive: true });
                await copyTemplateFiles(srcPath, destPath);
            }
            else {
                try {
                    await fs_1.promises.copyFile(srcPath, destPath);
                    console.log(`Copied: ${entry.name}`);
                }
                catch (err) {
                    console.error(`Error copying ${srcPath}:`, err);
                }
            }
        }
    }
    catch (error) {
        console.error(`Error reading directory ${src}:`, error);
        throw error;
    }
}
async function ensureSpecialFilesExist(templatePath, projectPath) {
    const specialFiles = [
        'package.json',
        '.env.example',
        '.gitignore',
        'README.md'
    ];
    for (const file of specialFiles) {
        const srcFile = path_1.default.join(templatePath, file);
        const destFile = path_1.default.join(projectPath, file);
        try {
            // Check if source file exists
            await fs_1.promises.access(srcFile);
            // Check if destination file was already copied
            try {
                await fs_1.promises.access(destFile);
                console.log(`${file} already exists in project.`);
            }
            catch (_a) {
                // File doesn't exist in destination, copy it
                await fs_1.promises.copyFile(srcFile, destFile);
                console.log(`Special file copied: ${file}`);
            }
        }
        catch (err) {
            console.error(`Special file ${file} not found in template.`);
        }
    }
}
exports.default = generateProject;
