# Todo List

A project-based todo list app built with vanilla JavaScript, CSS, and Webpack.

[Live Demo](https://anvar-khikmatov.github.io/to-do-list/)

## Features

- Create, edit, and delete projects
- Create, edit, and delete tasks within projects
- Tasks include title, description, due date, and priority
- Expand tasks to view full details
- Mark tasks as complete via checkbox
- Filter view: All, Upcoming, Important, Completed
- Data persists via localStorage
- Responsive design for mobile

## Tech Stack

- Vanilla JavaScript (ES Modules)
- CSS
- Webpack + webpack-dev-server
- html-webpack-plugin
- mini-css-extract-plugin



## Project Structure

```
src/
  index.js     Entry point, handles localStorage restore on load
  dom.js       All DOM manipulation and event listeners
  logic.js     App logic, data management, localStorage functions
  tasks.js     Task object factory
  style.css    All styles
```

## Getting Started

```bash
npm install
npm start
```

App runs on `http://localhost:8080`

## Build

```bash
npm run build
```

## Notes

- Uses ES module imports, must be served via webpack dev server
- localStorage key: `dataBase`
- Default project `Education` loads on first visit
- Data persists across sessions per browser
