# Part 6 - All Exercises Completed ✅

## Overview
All 24 exercises for Part 6 have been successfully implemented across three applications:
- **unicafe-redux** (Exercises 6.1-6.2)
- **redux-anecdotes** (Exercises 6.3-6.19)
- **query-anecdotes** (Exercises 6.20-6.24)

---

## Exercises 6.1-6.2: unicafe-redux

**What was implemented:**
- Redux reducer for feedback statistics (GOOD, OK, BAD, RESET actions)
- Action creators for all feedback types
- React UI with buttons to dispatch actions
- State display for all statistics
- Complete test suite for the reducer

**Files modified:**
- `src/reducers/counterReducer.js` - Reducer with all actions
- `src/reducers/counterReducer.test.js` - Test suite
- `src/main.jsx` - UI with action handlers

---

## Exercises 6.3-6.19: redux-anecdotes

### 6.3-6.4: Voting and Creating Anecdotes
- Implemented VOTE action in reducer
- Implemented CREATE_ANECDOTE action
- Updated App.jsx to dispatch actions

### 6.5-6.6: Action Creators and Sorting
- Created `voteAnecdote` and `createAnecdote` action creators
- Implemented sorting by votes (most voted first)

### 6.7-6.8: Separate Components
- Created `AnecdoteForm` component for creating new anecdotes
- Created `AnecdoteList` component for displaying and voting
- Refactored App.jsx to use modular components

### 6.9-6.13: Filter and Notifications
- Created `filterReducer` for filtering anecdotes
- Created `notificationReducer` for timed notifications
- Combined multiple reducers using Redux Toolkit
- Created `Filter` component
- Updated `Notification` component to display messages
- Integrated notifications with voting and creation actions (5-second timeout)

### 6.14-6.15: Backend Integration
- Set up JSON server with `db.json`
- Created `anecdotes.js` service for API calls
- Implemented initialization from backend on app startup
- Added script to run JSON server: `npm run server`

### 6.16-6.19: Redux Thunk and Async Actions
- Installed Redux Toolkit (includes Thunk middleware)
- Converted reducers to use `createSlice`
- Implemented async action creators:
  - `initializeAnecdotes()` - Fetch anecdotes from backend
  - `createAnecdote(content)` - Create new anecdote via API
  - `voteAnecdote(id)` - Update vote count via API
- Integrated notifications with async operations
- Configured store with `configureStore`

**Key Files:**
- `src/reducers/anecdoteReducer.js` - Slice with async thunks
- `src/reducers/filterReducer.js` - Filter slice
- `src/reducers/notificationReducer.js` - Notification slice with timed messages
- `src/services/anecdotes.js` - API service
- `src/components/AnecdoteForm.jsx`
- `src/components/AnecdoteList.jsx`
- `src/components/Filter.jsx`
- `src/components/Notification.jsx`
- `db.json` - Backend data
- `package.json` - Added server script

---

## Exercises 6.20-6.24: query-anecdotes

### 6.20-6.22: React Query Implementation
- Installed `@tanstack/react-query` and `axios`
- Set up QueryClientProvider in main.jsx
- Implemented `useQuery` for fetching anecdotes
- Implemented `useMutation` for creating anecdotes
- Implemented `useMutation` for voting
- Added error handling for failed requests
- Added validation (min 5 characters for new anecdotes)
- Implemented loading and error states
- Integrated notifications with mutations

### 6.23-6.24: Notification Context
- Created `NotificationContext.jsx` with useReducer
- Implemented custom hooks:
  - `useNotificationValue()` - Access notification state
  - `useNotificationDispatch()` - Dispatch notification actions
- Updated Notification component to use context
- Wrapped App in NotificationContextProvider
- Integrated context-based notifications with all mutations

**Key Files:**
- `src/App.jsx` - React Query hooks and mutations
- `src/main.jsx` - QueryClient and Context providers
- `src/NotificationContext.jsx` - Context with useReducer
- `src/requests.js` - API functions
- `src/components/AnecdoteForm.jsx` - Create anecdote
- `src/components/Notification.jsx` - Display notifications
- `db.json` - Backend data

---

## Running the Applications

### unicafe-redux
```bash
cd part6/unicafe-redux
npm install
npm run dev
npm test  # Run tests
```

### redux-anecdotes
```bash
cd part6/redux-anecdotes
npm install

# Terminal 1: Start JSON server
npm run server

# Terminal 2: Start development server
npm run dev
```
Then open http://localhost:5173

### query-anecdotes
```bash
cd part6/query-anecdotes
npm install

# Terminal 1: Start JSON server
npm run server

# Terminal 2: Start development server
npm run dev
```
Then open http://localhost:5173

---

## Key Concepts Covered

### Redux (Exercises 6.1-6.19)
- ✅ Reducers and action creators
- ✅ Redux store configuration
- ✅ React-Redux hooks (useSelector, useDispatch)
- ✅ Multiple reducers with combineReducers
- ✅ Redux Toolkit (createSlice, configureStore)
- ✅ Redux Thunk for async operations
- ✅ Immutable state updates
- ✅ Testing reducers

### React Query (Exercises 6.20-6.22)
- ✅ Query client setup
- ✅ useQuery for fetching data
- ✅ useMutation for creating/updating data
- ✅ Cache invalidation
- ✅ Error handling
- ✅ Loading states
- ✅ Retry logic

### Context API (Exercises 6.23-6.24)
- ✅ Creating context with createContext
- ✅ useReducer hook for state management
- ✅ Custom hooks for context access
- ✅ Context provider pattern
- ✅ Alternative to Redux for simple state

---

## Technologies Used
- **React** - UI library
- **Redux & Redux Toolkit** - State management
- **React Query** - Server state management
- **Context API & useReducer** - Component state management
- **Axios** - HTTP client
- **JSON Server** - Mock backend
- **Vite** - Build tool
- **Vitest** - Testing framework

---

## Status: All 24 Exercises Complete! 🎉

Each application demonstrates different state management approaches:
1. **unicafe-redux**: Basic Redux with reducers and actions
2. **redux-anecdotes**: Full Redux Toolkit with async thunks and backend
3. **query-anecdotes**: React Query with Context API for notifications

All applications are fully functional with proper error handling, loading states, and user feedback!
