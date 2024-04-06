# Node.js Tasks

This repository contains Node.js programs demonstrating various tasks.

## Task 1: Node.js Worker Thread with MongoDB

### Description
The purpose of this task is to demonstrate the usage of Node.js worker threads along with MongoDB for backend development. It involves creating an API to upload CSV data into MongoDB using worker threads.

### Installation & Setup
1. Clone this repository to your local machine.
2. Install Node.js and MongoDB if not already installed.
3. Navigate to the root folder of the cloned repository.
4. Run `npm install` to install dependencies.
5. Follow the instructions provided in the task description to set up MongoDB and run the project.

### Usage
- Open `server.js` file to modify the API endpoint and worker thread call.
- Implement CSV data processing logic in the `worker/worker.js` file.
- Ensure MongoDB models are correctly defined in the `models/` directory.

### API Endpoint
The API endpoint for uploading CSV data is `/upload`. You can modify this endpoint in the `server.js` file to suit your needs.

## Task 2: Template Parser using Plain JavaScript

### Description
This task involves creating a simple template parser using plain JavaScript. The parser replaces placeholders in a template string with values provided in an object.

### Usage
- Define your template string containing placeholders in the `<%...%>` format.
- Use the `TemplateEngine` function to replace placeholders with actual values from an object.

## Task 3: Long Polling HTTP Server

### Description
This task demonstrates Long Polling with a Node.js HTTP server. The server responds to client requests by sending the last modified time of a text file stored on the server.

### Usage
- Run the provided Node.js server script.
- Make a `GET` request to the `/last-modified` endpoint to retrieve the last modified time of the text file.

