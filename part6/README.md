# Part 6 - State Management

This directory contains exercises for Part 6 of the Full Stack Open course, focusing on advanced state management in React applications.

## Topics Covered

- **Part 6a**: Flux-architecture and Redux
- **Part 6b**: Many reducers
- **Part 6c**: Communicating with server in a Redux application
- **Part 6d**: React Query, useReducer and the context

## Exercise Structure

### Exercises 6.1-6.2: unicafe-redux
**Directory**: `unicafe-redux/`

A simplified version of the unicafe feedback application from Part 1, reimplemented using Redux for state management.

**Topics**:
- Redux basics
- Reducers
- Pure functions and immutability
- Testing reducers

**Running**:
```bash
cd unicafe-redux
npm install
npm run dev    # Start development server
npm test       # Run tests
```

### Exercises 6.3-6.19: redux-anecdotes
**Directory**: `redux-anecdotes/`

An anecdote voting application built with Redux, covering the full spectrum of Redux development.

**Exercise Breakdown**:
- **6.3-6.8**: Basic Redux implementation
  - Action creators
  - Multiple components with Redux
  - Anecdote voting and creation
- **6.9-6.13**: Many reducers
  - Combined reducers
  - Filter functionality
  - Notification system
- **6.14-6.19**: Backend communication
  - JSON Server setup
  - Asynchronous actions with Redux Thunk
  - Fetching and storing data from backend

**Running**:
```bash
cd redux-anecdotes
npm install
npm run dev     # Start development server (port 5173)
npm run server  # Start JSON server (port 3001)
npm test        # Run tests
```

### Exercises 6.20-6.24: query-anecdotes
**Directory**: `query-anecdotes/`

Alternative implementation of the anecdote application using React Query, useReducer, and Context API instead of Redux.

**Topics**:
- React Query library for server state management
- useQuery and useMutation hooks
- useReducer hook for state management
- React Context API
- Notification system with Context

**Running**:
```bash
cd query-anecdotes
npm install
npm run dev     # Start development server (port 5173)
npm run server  # Start JSON server (port 3001)
```

## Key Concepts

### Redux
- **Store**: Single source of truth for application state
- **Actions**: Plain objects describing what happened
- **Reducers**: Pure functions that specify how state changes
- **Dispatch**: Method to send actions to the store
- **Subscribe**: Method to listen for state changes

### React Query
- **Server state management**: Handles fetching, caching, and updating server data
- **useQuery**: Hook for fetching data
- **useMutation**: Hook for creating/updating data
- **Automatic refetching**: Keeps data fresh and synchronized

### State Management Patterns
- **Flux architecture**: Unidirectional data flow
- **Redux Thunk**: Middleware for async actions
- **Context API**: Built-in React solution for passing data through component tree
- **useReducer**: React hook for complex local state management

## Notes

- All exercises build upon previous ones within their respective directories
- JSON Server is used to simulate a backend REST API
- Redux DevTools extension is recommended for debugging Redux applications
- React Query DevTools is included in the query-anecdotes project for debugging

## Resources

- [Redux documentation](https://redux.js.org/)
- [React Query documentation](https://tanstack.com/query/latest)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Full Stack Open Part 6](https://fullstackopen.com/en/part6)
