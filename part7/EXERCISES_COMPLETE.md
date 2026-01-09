# Part 7 Exercises - Complete Implementation

This document provides a comprehensive overview of all Part 7 exercises (7.1-7.21) completed in the Full Stack Open course.

## Overview

Part 7 focuses on advanced React concepts including:
- React Router for navigation
- Custom hooks for code reusability
- State management with Redux
- Advanced styling
- Extended functionality for the bloglist application

All 21 exercises have been successfully implemented across multiple applications.

---

## Exercises 7.1-7.3: React Router (routed-anecdotes)

**Location:** `/part7/routed-anecdotes/`

### 7.1: Routed Anecdotes, step 1
Implemented React Router to add navigation to the anecdotes application. The application now has separate views for:
- Anecdote list
- Creating new anecdotes
- About page

**Key Implementation:**
- Installed `react-router-dom`
- Wrapped app in `<Router>` component
- Used `<Routes>` and `<Route>` for view routing
- Implemented `<Link>` components for navigation menu

### 7.2: Routed Anecdotes, step 2
Added individual anecdote view accessible by clicking on an anecdote from the list.

**Key Implementation:**
- Created parameterized route `/anecdotes/:id`
- Used `useParams()` hook to extract anecdote ID from URL
- Implemented `Anecdote` component to display single anecdote details

### 7.3: Routed Anecdotes, step 3
Implemented notification system that displays after creating a new anecdote.

**Key Implementation:**
- Used `useNavigate()` hook for programmatic navigation
- Redirects user to home page after successful anecdote creation
- Shows notification for 5 seconds with anecdote title

**Files Modified:**
- `src/App.jsx` - Main routing logic
- `src/hooks/index.js` - (prepared for next exercises)

---

## Exercises 7.4-7.8: Custom Hooks

### 7.4-7.6: Anecdotes and Hooks (routed-anecdotes)

**Location:** `/part7/routed-anecdotes/src/hooks/`

**7.4:** Simplified the anecdote creation form using custom `useField` hook.

**7.5:** Added reset functionality to clear all form fields with a single button.

**7.6:** Fixed React warning about invalid `reset` prop by destructuring it from spread attributes.

**Key Implementation:**
```javascript
const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => setValue(event.target.value)
  const reset = () => setValue('')
  return { type, value, onChange, reset }
}

// Usage with spread (excluding reset):
const { reset: contentReset, ...contentInput } = content
<input {...contentInput} />
```

**Files:**
- `src/hooks/index.js` - Custom hooks implementation
- `src/App.jsx` - Updated CreateNew component to use hooks

### 7.7: Country Hook

**Location:** `/part7/custom-hooks/country-hook/`

Implemented `useCountry` custom hook that fetches country data from REST Countries API.

**Key Implementation:**
- Created custom hook using `useEffect` for API calls
- Handles successful and failed fetch attempts
- Returns country data with `found` status flag
- Uses `https://studies.cs.helsinki.fi/restcountries/api/name/{name}` endpoint

**Files Created:**
- `src/App.jsx` - Main application
- `package.json` - Project dependencies
- `vite.config.js` - Vite configuration

### 7.8: Ultimate Hooks

**Location:** `/part7/custom-hooks/ultimate-hooks/`

Created `useResource` hook for managing backend communication for notes and persons.

**Key Implementation:**
```javascript
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data)
    })
  }, [baseUrl])
  
  const create = (resource) => {
    axios.post(baseUrl, resource).then(response => {
      setResources(resources.concat(response.data))
    })
  }
  
  return [resources, { create }]
}
```

**Features:**
- Fetches all resources on mount
- Provides `create` service for adding new resources
- Works with json-server backend
- Reusable for multiple resource types (notes, persons)

**Files:**
- `src/App.jsx` - Uses useResource for notes and persons
- `db.json` - JSON server data

---

## Exercises 7.9-7.21: Extended Bloglist Application

**Location:** `/part7/bloglist-frontend/`

### 7.9: Prettier Configuration ✅

Prettier is already configured in the project with:
- `.prettierrc` - Prettier configuration
- `.prettierignore` - Files to ignore
- Integration with ESLint

### 7.10-7.13: Redux State Management

Implemented comprehensive Redux state management using Redux Toolkit.

**Reducers Created:**
1. **blogReducer** - Manages blog posts
   - `setBlogs` - Initialize blogs
   - `appendBlog` - Add new blog
   - `updateBlogInState` - Update existing blog
   - `removeBlogFromState` - Delete blog
   - `likeBlog` - Increment likes
   - `addComment` - Add comment to blog

2. **userReducer** - Manages logged-in user
   - `setUser` - Set current user
   - `clearUser` - Logout
   - `loginUser` - Login with credentials
   - `logoutUser` - Logout and clear storage
   - `initializeUser` - Load user from localStorage

3. **usersReducer** - Manages all users list
   - `setUsers` - Load all users
   - `initializeUsers` - Fetch users from backend

4. **notificationReducer** - Manages notifications (already existed)

**Store Configuration:**
```javascript
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
});
```

**Files:**
- `src/reducers/blogReducer.js`
- `src/reducers/userReducer.js`
- `src/reducers/usersReducer.js`
- `src/store.js` - Updated to include all reducers

### 7.14-7.15: User Views with React Router

Implemented user management views showing blog creation statistics.

**7.14 - Users View:**
- Table showing all users
- Displays number of blogs created by each user
- Links to individual user pages

**7.15 - Individual User View:**
- Shows user's name
- Lists all blogs created by that user
- Uses `useParams()` to get user ID from URL

**Components:**
- `src/components/Users.jsx` - Users list with blog counts
- `src/components/User.jsx` - Individual user details
- Route: `/users` and `/users/:id`

### 7.16: Blog View

Created detailed view for individual blog posts.

**Features:**
- Displays blog title, author, URL
- Shows likes count with like button
- Shows who added the blog
- Remove button (only visible to creator)
- Clicking blog in list navigates to detail view

**Component:**
- `src/components/BlogView.jsx`
- Route: `/blogs/:id`
- Uses `useParams()` to extract blog ID
- Uses Redux dispatch for like and remove actions

### 7.17: Navigation

Implemented navigation menu for the application.

**Features:**
- Links to blogs list and users list
- Displays logged-in user's name
- Logout button
- Styled navigation bar with background color

**Component:**
- `src/components/Navigation.jsx`
- Used in main App component
- Styled with inline styles (background: #e0e0e0)

### 7.18-7.19: Comments

Added commenting functionality to blog posts.

**7.18 - Display Comments:**
- Backend endpoint: `POST /api/blogs/:id/comments`
- Displays list of comments under blog details
- Anonymous comments (not associated with users)

**7.19 - Add Comments:**
- Form to add new comments
- Comment input field
- Submit button to post comment
- Comments update immediately using Redux

**Implementation:**
- Updated `blogService.js` with `addComment` method
- Added `addComment` action to blogReducer
- Comment form in `BlogView` component
- Comments stored as array in blog object

### 7.20-7.21: Styling

Applied professional styling to improve the application's appearance.

**7.20 - Basic Styling:**
- Created `index.css` with comprehensive styles
- Styled buttons with hover effects
- Improved form input appearance
- Table styling for users list
- Link styling with hover effects

**7.21 - Extended Styling:**
- Navigation bar styling
- Blog list item styling with borders
- Consistent color scheme
- Responsive padding and margins
- Professional typography
- List styling without bullets
- Hover effects on interactive elements

**Styling Features:**
- Green buttons (#4CAF50)
- Gray navigation bar (#e0e0e0)
- Blue links (#0066cc)
- Bordered blog items
- Clean, professional look

**Files:**
- `src/index.css` - Main stylesheet
- `src/components/Navigation.jsx` - Inline navigation styles
- `src/components/BlogList.jsx` - Inline blog item styles

---

## Additional Components Created

### BlogList Component
- Displays all blogs sorted by likes (descending)
- Each blog is a link to detailed view
- Styled with borders and padding

### App.jsx Restructure
- Integrated React Router with Redux
- Uses `useEffect` to initialize state from Redux
- Routes for all views (home, users, user, blog)
- Conditional rendering based on authentication status
- Togglable blog creation form

### Main.jsx Updates
- Wrapped app in `BrowserRouter`
- Combined Redux Provider and Router
- Imported global CSS

---

## Services Updated

### blogs.js
- Added `addComment(id, comment)` method
- Supports POST requests to `/api/blogs/:id/comments`

### users.js (New)
- Created service for fetching all users
- GET request to `/api/users`

---

## Technical Highlights

### React Router Features Used:
- `BrowserRouter` - HTML5 history API routing
- `Routes` and `Route` - Route definition
- `Link` - Navigation links
- `useParams` - Extract URL parameters
- `useNavigate` - Programmatic navigation

### Redux Toolkit Features:
- `createSlice` - Simplified reducer creation
- Async thunks for API calls
- Immutable state updates
- Combined reducers in store

### Custom Hooks:
- `useField` - Form field management with reset
- `useCountry` - API data fetching
- `useResource` - Generic CRUD operations

---

## Dependencies Added

```json
{
  "react-router-dom": "^7.12.0",
  "@reduxjs/toolkit": "^2.11.2",
  "react-redux": "^9.2.0",
  "axios": "^1.9.0",
  "prettier": "^3.7.4"
}
```

---

## Summary

All 21 exercises in Part 7 have been successfully implemented:

✅ **7.1-7.3:** React Router with anecdotes app
✅ **7.4-7.6:** Custom useField hook with reset functionality
✅ **7.7:** useCountry hook for API integration
✅ **7.8:** useResource hook for backend communication
✅ **7.9:** Prettier configuration
✅ **7.10-7.13:** Redux state management (blogs, user, users, notifications)
✅ **7.14-7.15:** User views with React Router
✅ **7.16:** Individual blog view
✅ **7.17:** Navigation menu
✅ **7.18-7.19:** Comments functionality
✅ **7.20-7.21:** Professional styling

The applications demonstrate:
- Advanced React patterns
- State management with Redux
- Client-side routing
- Custom hooks
- Form handling
- API integration
- Modern styling techniques

All code follows best practices and is ready for production use.
