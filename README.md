# BeB

This CLI tool generates a fully organized backend project structure using Express and MongoDB. It provides a simple command-line interface to create a new project with all the necessary files and configurations.

## Features

- **Project Structure**: Automatically creates a well-organized directory structure for your Express and MongoDB application.
- **Configuration Files**: Generates essential configuration files, including database connection settings and environment variables.
- **Middleware**: Includes authentication and error handling middleware to streamline your development process.
- **Controllers and Services**: Sets up templates for controllers and services to help you manage your application logic effectively.
- **TypeScript Support**: The generated project is fully compatible with TypeScript, ensuring type safety and better development experience.
- **CommonJS Support**: The generated project is also can be in the old javascript for the OGs

## Installation
You can install the CLI via [npm](https://www.npmjs.com/package/source-beb) or yarn:
```bash
npm install -g source-beb
```
```bash
yarn global add source-beb
```

## Usage

To generate a new Backend project using BeB, run the following command:

```bash
# Initialize the CLI tool
beb init
```

```bash
# Generate a new project
beb generate <project-name>
```

Replace `<project-name>` with the desired name for your new project.

Then Choose Between CommonJS and TypeScript by type `1` Or `2`

## Project Structure

The generated project will have the following structure:

### TypeScript Version
```
<project-name>
├── src
│   ├── config
│   │   ├── database.ts
│   │   └── index.ts
│   ├── controllers
│   │   └── index.ts
│   ├── middleware
│   │   ├── auth.ts
│   │   └── error.ts
│   ├── models
│   │   └── index.ts
│   ├── routes
│   │   └── index.ts
│   ├── services
│   │   └── index.ts
│   ├── utils
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### CommonJS Version
```
<project-name>
├── src
│   ├── config
│   │   ├── database.js
│   │   └── index.js
│   ├── controllers
│   │   └── index.js
│   ├── middleware
│   │   ├── auth.js
│   │   └── error.js
│   ├── models
│   │   └── index.js
│   ├── routes
│   │   └── index.js
│   ├── services
│   │   └── index.js
│   ├── utils
│   │   └── index.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```


## Contributing
If you have suggestions or improvements, feel free to open issues or pull requests. We welcome contributions!

## Bugs and Issues

If you encounter any bugs or issues, please open an issue on the [GitHub repository](https://github.com/odqin/BeB).


Created with ❤️ by [Odqin](https://github.com/odqin/)


[![npm](https://img.shields.io/npm/v/source-beb)](https://www.npmjs.com/package/source-beb)
[![npm](https://img.shields.io/npm/l/source-beb)](https://www.npmjs.com/package/source-beb)
[![npm](https://img.shields.io/npm/dt/source-beb)](https://www.npmjs.com/package/source-beb)
[![github](https://img.shields.io/github/last-commit/odqin/BeB)](https://github.com/odqin/BeB)
