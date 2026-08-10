# Part 1 Implementation Plan: Course Information (Exercises 1.1 - 1.2)

## Overview
Set up the initial React application for Part 1 of the Full Stack Open course using Vite, clean up standard boilerplate files, and implement Exercises 1.1 and 1.2.

---

## Step 1: Project Setup
- Directory structure: `part1/courseinfo`
- Initialize Vite app with React & JavaScript template:
  ```bash
  cd part1
  npx -y create-vite@latest courseinfo --template react
  cd courseinfo
  npm install
  ```
- Remove unwanted boilerplate:
  - `src/App.css`
  - `src/index.css`
  - `src/assets/`

---

## Step 2: Boilerplate Cleanup & Main Setup
- **`src/main.jsx`**:
  ```jsx
  import ReactDOM from 'react-dom/client'
  import App from './App'

  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  ```

---

## Step 3: Exercise 1.1 - Course Information, Step 1
Refactor `App.jsx` to split the monolithic UI into 3 reusable components:
- `Header`: Renders course title.
- `Content`: Renders parts and exercise numbers.
- `Total`: Renders total number of exercises.

---

## Step 4: Exercise 1.2 - Course Information, Step 2
Refactor `Content` component to use a helper `Part` component:
- `Part`: Renders individual part name and exercise count.
- `Content`: Renders 3 `<Part />` elements.

---

## Component Architecture (Target App.jsx Structure)
- **`Header(props)`**: `<h1>{props.course}</h1>`
- **`Part(props)`**: `<p>{props.part} {props.exercises}</p>`
- **`Content(props)`**: Renders `<Part>` for part1, part2, part3.
- **`Total(props)`**: `<p>Number of exercises {props.total}</p>`
- **`App`**: Holds state/variables (`course`, `part1`, `exercises1`, etc.) and renders `<Header>`, `<Content>`, `<Total>`.

---

## Step 5: Verification & Testing
- Run dev server (`npm run dev`) to verify rendering.
- Run `npm run build` to ensure clean build with no compilation errors.
