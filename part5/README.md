# Part 5: Blog List Frontend - Testing React Apps

This directory contains the complete implementation of Part 5 exercises for the Full Stack Open course, covering frontend development, testing, and end-to-end testing.

## Project Structure

```
part5/bloglist-frontend/
├── src/
│   ├── components/
│   │   ├── Blog.jsx                 # Blog component with toggle details
│   │   ├── Blog.test.jsx            # Blog component tests
│   │   ├── BlogForm.jsx             # Create new blog form
│   │   ├── BlogForm.test.jsx        # BlogForm component tests
│   │   ├── LoginForm.jsx            # Login form component
│   │   ├── Notification.jsx         # Notification message component
│   │   └── Togglable.jsx            # Reusable togglable component
│   ├── services/
│   │   ├── blogs.js                 # Blog API service
│   │   └── login.js                 # Login API service
│   └── App.jsx                      # Main application component
├── tests/
│   ├── blog_app.spec.js             # Playwright E2E tests
│   └── helper.js                    # E2E test helper functions
├── playwright.config.js              # Playwright configuration
├── testSetup.js                     # Vitest test setup
└── vite.config.js                   # Vite configuration with test setup
```

## Implemented Features

### Part 5a: Login in Frontend (Exercises 5.1-5.4)
- ✅ Login form with username and password fields
- ✅ Token-based authentication with backend
- ✅ User details saved to localStorage for persistent login
- ✅ Automatic token restoration on page reload
- ✅ Logout functionality
- ✅ Conditional rendering based on authentication state
- ✅ Error notifications for failed login attempts
- ✅ Success notifications for user actions

### Part 5b: Props.children and PropTypes (Exercises 5.5-5.12)
- ✅ Togglable component for hiding/showing content
- ✅ Blog creation form with toggle visibility
- ✅ Blog details (URL, likes, user) initially hidden
- ✅ View/hide button to toggle blog details
- ✅ Like button to increment blog likes
- ✅ Delete button (only visible to blog creator)
- ✅ Blogs sorted by number of likes (descending)
- ✅ PropTypes validation for all components
- ✅ ESLint configuration

### Part 5c: Testing React Apps (Exercises 5.13-5.16)
- ✅ Vitest and React Testing Library setup
- ✅ Blog component renders title and author by default
- ✅ Blog component hides URL and likes by default
- ✅ Blog details shown when view button is clicked
- ✅ Like button event handler called correctly
- ✅ BlogForm calls event handler with correct data

**Test Results:**
```
Test Files  2 passed (2)
Tests  4 passed (4)
```

### Part 5d: End-to-End Testing with Playwright (Exercises 5.17-5.23)
- ✅ Playwright configuration and setup
- ✅ Test helper functions (loginWith, createBlog)
- ✅ Login form is shown by default
- ✅ Login succeeds with correct credentials
- ✅ Login fails with wrong credentials
- ✅ Logged-in user can create new blog
- ✅ User can like a blog
- ✅ User who created blog can delete it
- ✅ Only creator can see delete button
- ✅ Blogs are ordered by number of likes

## Technical Implementation

### Authentication Flow
1. User submits login credentials
2. Backend validates and returns JWT token
3. Token saved to localStorage and set in Axios headers
4. All subsequent API requests include Authorization header
5. On page reload, token restored from localStorage

### State Management
- User state (logged-in user details)
- Blogs state (array of all blogs)
- Notification state (success/error messages)
- Form states (username, password, blog form fields)

### Component Architecture
- **App**: Main container, handles authentication and blog CRUD
- **LoginForm**: Controlled form for user login
- **BlogForm**: Controlled form for creating new blogs
- **Blog**: Displays blog with toggle details and actions
- **Togglable**: Reusable component for hiding/showing content
- **Notification**: Displays timed success/error messages

### API Services
```javascript
// blogs.js
- setToken(token)      // Set authorization token
- getAll()             // GET /api/blogs
- create(newObject)    // POST /api/blogs
- update(id, object)   // PUT /api/blogs/:id
- remove(id)           // DELETE /api/blogs/:id

// login.js
- login(credentials)   // POST /api/login
```

### Testing Strategy

#### Unit/Component Tests (Vitest)
- Component rendering verification
- User interaction simulation
- Event handler validation
- Props verification

#### E2E Tests (Playwright)
- Full user workflows
- Multiple user scenarios
- Database reset between tests
- Visual verification

## Running the Application

### Prerequisites
- Node.js installed
- Backend server running on http://localhost:3003
- MongoDB connection configured

### Installation
```bash
npm install
```

### Development
```bash
# Start frontend (runs on http://localhost:5173)
npm run dev

# Backend should be running on port 3003
```

### Testing

#### Component Tests
```bash
npm test
```

#### E2E Tests
```bash
# Backend must be running in test mode
cd ../../../part4/bloglist
NODE_ENV=test npm run dev

# Run Playwright tests
cd ../../part5/bloglist-frontend
npm run test:e2e
```

### Linting
```bash
npm run lint
```

## Dependencies

### Production
- react: ^19.1.0
- react-dom: ^19.1.0
- axios: ^1.9.0
- prop-types: ^15.8.1

### Development
- vite: ^6.3.5
- @vitejs/plugin-react: ^4.4.1
- vitest: ^4.0.16
- @testing-library/react: ^16.3.1
- @testing-library/jest-dom: ^6.9.1
- @testing-library/user-event: ^14.6.1
- @playwright/test: ^1.49.2
- eslint: ^9.25.0

## Key Learnings

1. **Token-Based Authentication**: Implementing JWT authentication in React with localStorage
2. **Component Testing**: Using React Testing Library with Vitest
3. **E2E Testing**: Writing comprehensive Playwright tests
4. **Component Composition**: Using props.children for flexible components
5. **Refs and useImperativeHandle**: Accessing child component methods
6. **PropTypes**: Runtime type checking for React props
7. **Controlled Components**: Managing form state in React
8. **Conditional Rendering**: Showing/hiding UI based on state
9. **Array Sorting**: Sorting blogs by likes in descending order
10. **Test Database**: Setting up separate test environment

## Backend Integration

The frontend expects the following backend endpoints:

```
POST   /api/login              # User login
POST   /api/users              # Create user
GET    /api/blogs              # Get all blogs
POST   /api/blogs              # Create blog (requires auth)
PUT    /api/blogs/:id          # Update blog (requires auth)
DELETE /api/blogs/:id          # Delete blog (requires auth)
POST   /api/testing/reset      # Reset database (test mode only)
```

## Security Considerations

- Passwords never stored in state/localStorage
- JWT token stored in localStorage (XSS risk acknowledged)
- Token included in Authorization header as Bearer token
- User can only delete their own blogs
- Logout clears token from localStorage

## Exercise Completion Status

- ✅ Exercise 5.1: Login form functionality
- ✅ Exercise 5.2: Save user details to localStorage
- ✅ Exercise 5.3: Logged-in user can create blogs
- ✅ Exercise 5.4: Notification component
- ✅ Exercise 5.5: Togglable component for blog form
- ✅ Exercise 5.6: Blog form in togglable
- ✅ Exercise 5.7: View/hide button for blog details
- ✅ Exercise 5.8: Like button functionality
- ✅ Exercise 5.9: Sort blogs by likes
- ✅ Exercise 5.10: Delete blog button
- ✅ Exercise 5.11: Only creator can delete
- ✅ Exercise 5.12: PropTypes for components
- ✅ Exercise 5.13: Blog component test - default rendering
- ✅ Exercise 5.14: Blog component test - show details
- ✅ Exercise 5.15: Blog component test - like button
- ✅ Exercise 5.16: BlogForm component test
- ✅ Exercise 5.17: Playwright - login form shown
- ✅ Exercise 5.18: Playwright - login tests
- ✅ Exercise 5.19: Playwright - logged-in user can create blog
- ✅ Exercise 5.20: Playwright - like blog
- ✅ Exercise 5.21: Playwright - delete blog
- ✅ Exercise 5.22: Playwright - only creator sees delete
- ✅ Exercise 5.23: Playwright - blogs ordered by likes

**Total: 23/23 exercises completed**
