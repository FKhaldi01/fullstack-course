# Full Stack Open — Course Context

> Created: 2026-09-17
> Source: https://fullstackopen.com

## Course Overview

- **Title**: Full Stack Open (University of Helsinki)
- **Focus**: Modern web development with JavaScript — React, Node.js, REST, GraphQL, TypeScript, React Native, CI/CD, containers, databases
- **Cost**: Free (certificates and ECTS credits available)
- **Structure**: 14 parts (0–14), each ~15–20 hours
- **Prerequisites**: Good programming skills (100–200 hrs practice), basic web/db knowledge, Git basics. No JS experience required.

## Tech Stack (Current)

| Layer | Technology |
|-------|-----------|
| Frontend | React, Zustand, React Router, esbuild |
| Backend | Node.js v22, Express v5 |
| Database | Relational databases (Part 13) |
| Mobile | React Native / Expo (Part 10) |
| API | REST + GraphQL (Part 8) |
| CI/CD | GitHub Actions (Part 11) |
| Containers | Docker (Part 12) |
| SSR | Next.js (Part 14) |

## Parts & Completion

### Core Course (Parts 0–5) — 5 credits (CSM141081)

| Exercises | Credits | Grade |
|-----------|---------|-------|
| 75 | 1 | |
| 135 | 2 | |
| 165 | 3 | |
| 195 | 4 | |
| 225 | 5 | |

- Parts 1–4: Do **all non-asterisk** exercises first; asterisk exercises count toward grade
- Parts 5–13: No asterisk exercises

### Extensions

| Part | Topic | Credits | Status |
|------|-------|---------|--------|
| 6 | Extension 1 | 1 cr | 135+ exercises for parts 0–7 |
| 7 | Extension 2 | 1 cr | 150+ exercises for parts 0–7 |
| 8 | GraphQL | 1 cr | Moved to courses.mooc.fi |
| 9 | TypeScript | 1 cr | Moved to courses.mooc.fi |
| 10 | React Native | 2 cr | Moved to courses.mooc.fi |
| 11 | CI/CD | 1 cr | Moved to courses.mooc.fi |
| 12 | Containers | 1 cr | Moved to courses.mooc.fi |
| 13 | Relational DBs | 1 cr | Moved to courses.mooc.fi |
| 14 | Next.js | — | courses.mooc.fi |

### Full Stack Project
- 5, 7, or 10 credits (1 cr ≈ 17.5 hrs)
- React and/or Node (React Native also possible)
- Team of 1–3

### Interview Promise
- Terveystalo and Smartly.io offer job interviews for 14+10 credits
- Must be Finland resident

## Submission System
- URL: https://studies.cs.helsinki.fi/stats/courses/fullstackopen
- Submit via GitHub + mark done on submission system
- Add `mluukkai` as collaborator for private repos
- Submit **one part at a time** — can't resubmit after
- Plagiarism detection is active

## Key Setup Requirements

| Tool | Version/Notes |
|------|---------------|
| Browser | Chrome (recommended) or Firefox Developer |
| Editor | Visual Studio Code |
| Node.js | v22 (parts 0–6, 8); v20.11.0 (part 10); v18.13.0 (others) |
| npm | Auto-installed with Node |
| Git | Must be installed |

## Recent Major Changes

- **Part 14** (25 Apr 2026): New part added
- **Part 10** (21 Apr 2026): Expo version updated
- **Part 7** (5 Apr 2026): Webpack → esbuild, error boundaries, monorepo
- **Part 6** (5 Apr 2026): Redux → Zustand
- **Part 5** (31 Mar 2026): React Router + style libs moved here
- **Parts 9, 11–13** (Mar 2026): Content updated, moved to new platform
- **Part 8** (3 Jan 2026): Apollo Server v5, Apollo Client v4
- **Part 4** (13 Aug 2025): Express v5, express-async-errors removed

---

## Part 0 — Fundamentals of Web Apps (Summary)

### Key Concepts Covered

1. **HTTP GET** — Browser fetches HTML + resources from server. Status 200 = success. Content-Type headers tell browser how to render.

2. **Traditional Web Apps** — Server generates HTML dynamically. Browser is "dumb" — just renders. Example: Express template strings.

3. **AJAX** — JavaScript fetches data (JSON) from server without full page reload. Uses XMLHttpRequest or fetch.

4. **Single-Page Apps (SPA)** — One HTML page. All rendering done in browser via JavaScript. Form submission intercepted with `e.preventDefault()`, data sent as JSON.

5. **DOM API** — `document.createElement`, `appendChild`, `getElementById` — programmatic page manipulation.

6. **Event Handlers / Callbacks** — `onreadystatechange`, `onsubmit` — browser invokes functions at appropriate times.

7. **CSS** — Style sheets define appearance. Classes and IDs target elements. Changes in DevTools are temporary.

8. **HTTP POST** — Forms submit data to server. Server responds with redirect (302) or JSON (SPA).

### Example Application
- Homepage: https://studies.cs.helsinki.fi/exampleapp (traditional)
- Notes: https://studies.cs.helsinki.fi/exampleapp/notes (AJAX)
- SPA: https://studies.cs.helsinki.fi/exampleapp/spa (single-page)

### Part 0 Exercises (0.1–0.6)
- 0.1: HTML tutorial (Mozilla) — not submitted
- 0.2: CSS tutorial (Mozilla) — not submitted
- 0.3: HTML forms tutorial (Mozilla) — not submitted
- 0.4: Create Mermaid diagram for adding a note (traditional app)
- 0.5: Diagram for SPA page load
- 0.6: Diagram for adding a note in SPA

---

## Progress Tracker

| Part | Status | Exercises Done | Notes |
|------|--------|---------------|-------|
| 0 | ✅ Completed | 0.1–0.6 | Summary only |
| 1 | ✅ Completed | 1.1–1.14 | Counter, Unicafe, Anecdotes |
| 2 | ✅ Completed | 2.1–2.20 | Phonebook with server, styling |
| 3a | ✅ Completed | 3.1–3.8 | GET/POST/PUT/DELETE, morgan logging, validation |
| 3b | ✅ Completed | 3.9–3.11 | Frontend connected, production build, deployment setup |
| 3c | ✅ Completed | 3.12–3.18 | MongoDB Atlas, Mongoose, database operations, error handler, mongo.js CLI |
| 3d | ✅ Completed | 3.19–3.25 | Input validation, ESLint setup |
| 4 | Not started | | |
| 5 | Not started | | |
| 6+ | Not started | | |

---

## Previous Work

### 2026-09-17 — Part 0 Completed
- Read Part 0 general info + fundamentals of web apps
- Key concepts: HTTP GET/POST, DOM API, AJAX, SPA, JSX basics, CSS

### 2026-09-17 — Part 1a + 1b + 1c + 1d — Completed (Exercises 1.1–1.14)
- **Vite setup** — `npm create vite@latest part1 -- --template react`, `npm install`, `npm run dev`
- **Components** — Arrow functions returning JSX, `export default` required
- **JSX** — Compiles to `React.createElement()`. Curly braces `{}` embed JS expressions. Self-closing tags need `/ >`.
- **Props** — Pass data via `props` object. String literals vs JS expressions (expressions need `{}`).
- **Key rules**:
  - Component names must start with **capital letter**
  - Must have **one root element** (use `<>...</>` fragment or single div)
  - **Never render objects** directly — only primitives
  - Keep **console open** at all times
  - **Small steps** — one component at a time
- **JavaScript**: `const` vs `let`, `concat()` (immutable), `map()`, destructuring, object literals, arrow functions, `this` binding
- **Exercises 1.1–1.5** — **IMPLEMENTED & VERIFIED** in `/Users/firas/src/projects/fullstack-course/part1/src/`:
  - `App.jsx` — course data as single nested object with `parts` array
  - `components/Header.jsx` — displays course name
  - `components/Part.jsx` — displays part name + exercises
  - `components/Content.jsx` — renders 3 Part components from parts array
  - `components/Total.jsx` — sums exercises from parts array
  - **Output verified**: "Half Stack application development", 3 parts (10, 7, 14 exercises), total 31

### 2026-09-17 — Part 1c — Component State, Event Handlers
- **Component helper functions** — Functions defined inside component to compute derived values (e.g., `bornYear()`)
- **Destructuring** — Extract props directly: `const { name, age } = props` or `const Hello = ({ name, age }) => ...`
- **Page re-rendering** — `root.render()` re-renders component; `setInterval()` for periodic updates
- **useState hook** — `const [counter, setCounter] = useState(0)` returns [state, setState]
- **Event handling** — `onClick={() => setCounter(counter + 1)}` (arrow function, NOT `setCounter(counter + 1)`)
- **Lifting state up** — State in parent component, passed down via props to children
- **Refactoring** — Use destructuring in components: `const Display = ({ counter }) => <div>{counter}</div>`
- **Event handler convention** — `onSomething` for props that take functions, `handleSomething` for function definitions

### 2026-09-17 — Part 1b — JavaScript Fundamentals
- **Variables**: `const` (constant reference, not immutable data), `let` (reassignable). Avoid `var`.
- **Arrays**: `const` array can still be mutated (push, etc.). `concat()` creates new array (functional/immutable style preferred in React). `map()` transforms array into new array. Destructuring: `[first, second, ...rest] = arr`.
- **Objects**: Defined with object literals `{ key: value }`. Access via dot notation or brackets `obj[key]`. Can add properties dynamically. Values can be any type (including nested objects/arrays).
- **Functions**: Arrow functions preferred. `p => p * p` (single param, single expression, implicit return). `function` keyword also available but not used in this course.
- **`this` keyword**: Value depends on **how** a method is called, not where it's defined. Arrow functions don't have their own `this` — don't use them as object methods. `bind()` can fix `this` binding.
- **Classes**: ES6 `class` syntax exists but is syntactic sugar over prototypal inheritance. Not used in this course (React Hooks replace class components).
- **Exercises 1.3–1.5**: Refactor courseinfo app — individual variables → objects → array of objects → single nested object with `course.parts` array.

### 2026-09-17 — Part 1d — Multiple Components with State (Exercises 1.6–1.14)
- **Multiple components with state** — State can be in one or multiple components
- **Unicafe app** (exercises 1.6–1.11):
  - `components/Statistics.jsx` — displays feedback statistics (total, average, positive %)
  - `components/Button.jsx` — reusable button component
  - State management: 4 useState hooks (one per feedback option + one for total)
  - Conditional rendering: "No feedback given" when total=0
- **Anecdotes app** (exercises 1.12–1.14):
  - `components/Anecdotes.jsx` — array of 6 programming anecdotes
  - Random anecdote display with vote system
  - Most voted anecdote display
  - Voting: increment vote count, track most voted
- **All components in `/Users/firas/src/projects/fullstack-course/part1/src/components/`**

### 2026-09-17 — Part 2a — Rendering Data Structure (Exercises 2.1–2.5)
- **Map and reduce** — `map()` transforms array, `reduce()` computes single value
- **Multiple courses** — Refactor course data to array of course objects
- **Component composition** — `Content` renders multiple `Part` components via `map()`
- **Keys** — Use unique identifiers as `key` prop (e.g., `course.name`)
- **Exercises 2.1–2.5** — **IMPLEMENTED** in `part1/src/App.jsx`:
  - Course data as array of course objects with `name` and `parts` arrays
  - `Part` component receives `part` object via destructuring
  - `Total` component uses `reduce()` to sum exercises
  - `Content` component maps over courses to render `Part` components

### 2026-09-17 — Part 2b — Phonebook Part 1: Local State (Exercises 2.6–2.10)
- **useState for form data** — `newName`, `newNumber` state variables
- **Form submission** — `onSubmit` with `preventDefault()`, validate inputs
- **Duplicate name handling** — Check if name exists, ask user to confirm replacement
- **Component extraction** — `PersonForm`, `Person`, `Persons`, `Filter` components
- **Controlled components** — Input values tied to state, `onChange` handlers
- **Exercises 2.6–2.10** — **IMPLEMENTED** in `part1/src/`:
  - `components/PersonForm.jsx` — form with name/number inputs
  - `components/Person.jsx` — displays name, number, delete button
  - `components/Persons.jsx` — maps over persons array
  - `components/Filter.jsx` — search input for filtering by name
  - `App.jsx` — local state management, create/delete operations

### 2026-09-17 — Part 2c — Phonebook Step 6: Fetch Data from Server (Exercise 2.11)
- **useEffect for side effects** — Fetch data from server on component mount
- **Axios** — HTTP library for server communication (`npm install axios`)
- **Promise chaining** — `.then()` to handle async responses
- **Server setup** — JSON Server (`npm install json-server --save-dev`)
- **db.json** — Mock backend data file with phonebook entries
- **Exercise 2.11** — **IMPLEMENTED**:
  - `App.jsx` — useEffect fetches persons from `http://localhost:3001/persons`
  - `db.json` — 4 phonebook entries with id, name, number
  - `package.json` — `"server": "json-server -p 3001 db.json"` script

### 2026-09-17 — Part 2d — Phonebook Step 7: Create, Update, Delete (Exercises 2.12–2.15)
- **POST to create** — `axios.post()` to add new person to server
- **PUT to update** — `axios.put()` to update existing person
- **DELETE to remove** — `axios.delete()` to remove person from server
- **Service module pattern** — Extract backend communication to separate module
- **Object spread syntax** — Immutable updates: `{ ...person, number: newNumber }`
- **Exercises 2.12–2.15** — **IMPLEMENTED** in `part1/src/`:
  - `services/persons.js` — backend communication module (getAll, create, update, remove)
  - `App.jsx` — handleSubmit creates via `personService.create()`, handleDelete removes via `personService.remove()`
  - Duplicate name handling: asks user to confirm replacement, uses `personService.update()` with PUT

### 2026-09-17 — Part 2e — Phonebook Styling (Exercises 2.16–2.20)
- **CSS styling** — Add styles to phonebook app
- **Search input styling** — Style the filter input
- **Toggle all/important** — Toggle button for showing all vs important persons
- **Exercises 2.16–2.20** — **IMPLEMENTED**:
  - CSS styles added to phonebook components
  - Search input styled with border, padding, margin
  - Toggle button for filtering all vs important persons

---

## Part 3a — Server with Express (Exercises 3.1–3.8)
- **Express framework** — `npm install express`, create server with `app.get()`, `app.post()`, etc.
- **RESTful API** — GET (read), POST (create), PUT (update), DELETE (remove)
- **JSON responses** — `response.json()` to return data
- **Status codes** — 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 204 (No Content)
- **Morgan logging** — `npm install morgan`, `app.use(morgan('tiny'))`
- **Exercises 3.1–3.8** — **IMPLEMENTED** in `part3/index.js`:
  - Express server with REST API for phonebook
  - GET `/api/persons` — list all
  - POST `/api/persons` — create new
  - PUT `/api/persons/:id` — update
  - DELETE `/api/persons/:id` — remove
  - GET `/info` — display time + contact count
  - Morgan logging enabled

## Part 3b — Deploying Apps to the Internet (Exercises 3.9–3.11)
- **Production build** — `npm run build` creates `dist/` folder
- **Serve static files** — `app.use(express.static('dist'))`
- **Deployment** — Render, Heroku, or similar platforms
- **Environment variables** — `process.env.PORT`, `process.env.NODE_ENV`
- **Exercises 3.9–3.11** — **IMPLEMENTED**:
  - Frontend connected to backend API
  - Production build configured
  - Deployment setup for Render

## Part 3c — MongoDB with Mongoose (Exercises 3.12–3.18)
- **MongoDB Atlas** — Cloud-hosted MongoDB (free tier)
- **Mongoose** — ODM for MongoDB (`npm install mongoose dotenv`)
- **Schema definition** — `new mongoose.Schema({ name: String, number: String })`
- **Model creation** — `mongoose.model('Person', personSchema)`
- **Database operations**:
  - `Person.find({})` — find all
  - `Person.findById(id)` — find by ID
  - `Person.findByIdAndDelete(id)` — delete by ID
  - `Person.findOne({ name })` — find by name
  - `person.save()` — save new/updated document
- **Error handling middleware** — Express error handler with `CastError` detection
- **Environment variables** — `.env` file with `MONGODB_URI` and `PORT`
- **CLI helper** — `mongo.js` for command-line phonebook operations
- **Exercises 3.12–3.18** — **IMPLEMENTED**:
  - `models/person.js` — Mongoose schema with toJSON transform
  - `index.js` — rewritten to use MongoDB for all CRUD
  - `mongo.js` — CLI helper for exercise 3.12
  - `.env` — environment variables (gitignored)
  - Error handler middleware for CastError

## Part 3d — Validation and ESLint (Exercises 3.19–3.25)
- **Input validation** — Check required fields, format validation
- **Phone number format** — `XX-XXX...` pattern validation
- **Name uniqueness** — Check before creating
- **ESLint** — `npm install --save-dev @eslint/js globals`
- **ESLint config** — `eslint.config.mjs` for Node.js
- **Exercises 3.19–3.25** — **IMPLEMENTED**:
  - `validateName()` — name must be ≥ 3 characters
  - `validateNumber()` — phone number format validation
  - ESLint configuration for Node.js project

---

## Notes & Decisions

_(Add notes about your approach, blockers, decisions here)_
