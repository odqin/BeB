"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTemplate = exports.createFile = exports.createDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createDirectory = (dirPath) => {
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true });
    }
};
exports.createDirectory = createDirectory;
const createFile = (filePath, content) => {
    fs_1.default.writeFileSync(filePath, content, { encoding: 'utf8', flag: 'w' });
};
exports.createFile = createFile;
const copyTemplate = (source, destination) => {
    const sourcePath = path_1.default.resolve(__dirname, source);
    const destPath = path_1.default.resolve(__dirname, destination);
    fs_1.default.copyFileSync(sourcePath, destPath);
};
exports.copyTemplate = copyTemplate;
