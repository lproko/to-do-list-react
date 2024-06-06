# To-Do List App

This is a simple To-Do List application built with React and Chakra UI. The app allows users to create, edit, delete, and search for to-do items. The data is stored and managed using a local REST endpoint provided by json-server.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)

## Features

- Add new to-do items with details like category, assignee, priority, description, and completion target date.
- Edit and delete existing to-do items.
- Search to-do items by any field.
- Local REST API for data management.

## Prerequisites

- Node.js (v18.x or later recommended)
- npm (v7.x or later recommended)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lproko/to-do-list-react.git
   git checkout master
   cd to-do-list-react

   ```

2. Install dependencies for the React app:
   cd todolist
   npm install

3. Install json-server globally (if not already installed):
   npm install -g json-server

## Running the App

# Start the JSON Server

- The json-server will act as your local REST API. Run the following command to start it:

  ```bash
   npm start

  ```

- By default, this will start the server at http://localhost:3000

# Start the React App

- In a separate terminal window/tab, start the React development server:
  ```bash
  npm run dev
  ```
- This will start the app at http://localhost:5173
