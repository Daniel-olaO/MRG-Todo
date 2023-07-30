# MRG-todo app(sever)

This is a server for the MRG-todo app. It is a simple to-do app that allows users to create, read, update and delete todos. It also allows users to mark todos as complete or incomplete.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Path](#path)
- [Demo](#demo)
- [Tools](#tools)
- [Author](#author)
- [references](#references)

# Installation

use npm install to install all dependencies

```bash
npm install
```

create a .env file in the root directory and add the following:

```bash
touch .env
```

add the following to the .env file

```bash
DB_CONNECTION_URL=your_mongodb_url
```

use npm run test to run tests

```bash
npm run test
```

use npm start to start the server

```bash
npm start
```

# Path

- GET /api/task- get all tasks
- GET /api/task/:\_id - get a task by id
- POST /api/create-task - create a task
- PUT /api/update-task/:\_id - update a task
- PUT /api/complete-task/:\_id - update a task status
- DELETE /api/delete-task/:\_id - delete a task

# Demo

link: x

# Tools

This server was developed with the following tools: Node, Express, MongoDB, TypeScript, Jest

# Author

MRG-todo app was created by:

### Daniel Adedeji

- [Github](https://github.com/Daniel-olaO)
