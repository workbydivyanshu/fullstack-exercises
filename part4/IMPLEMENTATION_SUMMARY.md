# Part 4 - Blog List Application - Implementation Summary

## 🎉 All Exercises Complete (4.1 - 4.23)

### Project Structure
```
part4/bloglist/
├── controllers/
│   ├── blogs.js        # Blog routes with JWT authentication
│   ├── users.js        # User management
│   └── login.js        # Authentication endpoint
├── models/
│   ├── blog.js         # Blog schema with user reference
│   └── user.js         # User schema with password hashing
├── tests/
│   ├── blog_api.test.js       # API integration tests
│   ├── list_helper.test.js    # Unit tests for helpers
│   └── test_helper.js         # Test utilities
├── utils/
│   ├── config.js       # Environment configuration
│   ├── logger.js       # Logging utility (silent in test mode)
│   ├── middleware.js   # Error handling & request logging
│   └── list_helper.js  # Blog list helper functions
├── app.js              # Express application
├── index.js            # Server entry point
├── .env                # Environment variables
├── .gitignore
├── package.json
├── eslint.config.mjs
└── README.md
```

### Dependencies Installed
**Production:**
- express (^5.2.1)
- mongoose (^9.1.2)
- bcrypt (^6.0.0)
- jsonwebtoken (^9.0.3)
- cors (^2.8.5)
- dotenv (^17.2.3)

**Development:**
- @eslint/js (^9.39.2)
- eslint (^9.39.2)
- globals (^17.0.0)
- supertest (^7.2.2)

### Features Implemented

#### Part 4a - Structure & Testing (✅ Ex 4.1-4.7)
- ✅ 4.1: Basic blog list application structure
- ✅ 4.2: Refactored into modules (controllers, models, utils)
- ✅ 4.3: `dummy()` helper function with test
- ✅ 4.4: `totalLikes()` function with tests
- ✅ 4.5: `favoriteBlog()` function with tests
- ✅ 4.6: `mostBlogs()` function with tests
- ✅ 4.7: `mostLikes()` function with tests

**Helper Functions:**
- `dummy(blogs)` - Returns 1 (test function)
- `totalLikes(blogs)` - Calculates sum of all likes
- `favoriteBlog(blogs)` - Returns blog with most likes
- `mostBlogs(blogs)` - Returns author with most blog posts
- `mostLikes(blogs)` - Returns author with most total likes

#### Part 4b - Backend Testing (✅ Ex 4.8-4.14)
- ✅ 4.8: Test GET /api/blogs returns correct amount of blogs
- ✅ 4.9: Verify unique identifier is named `id` (not `_id`)
- ✅ 4.10: Test POST /api/blogs creates new blog
- ✅ 4.11: Test likes defaults to 0 if missing
- ✅ 4.12: Test validation for title and url (400 if missing)
- ✅ 4.13: DELETE endpoint with tests
- ✅ 4.14: PUT endpoint with tests

**API Endpoints (Part 4b):**
- GET /api/blogs - Retrieve all blogs
- POST /api/blogs - Create new blog (requires auth)
- DELETE /api/blogs/:id - Delete blog (requires auth, only creator)
- PUT /api/blogs/:id - Update blog

#### Part 4c - User Administration (✅ Ex 4.15-4.17)
- ✅ 4.15: POST /api/users endpoint with bcrypt password hashing
- ✅ 4.16: Validation for username/password (min 3 chars, unique username)
- ✅ 4.17: Blogs linked to users with populate()

**User Schema Features:**
- Username: Required, unique, min 3 characters
- Password: Hashed with bcrypt (min 3 chars validation)
- Name: Optional string
- Blogs: Array of references to Blog documents

**Blog-User Relationship:**
- Each blog has a `user` field (ObjectId reference)
- Each user has a `blogs` array (ObjectId references)
- Populated queries return full user/blog data

#### Part 4d - Token Authentication (✅ Ex 4.18-4.23)
- ✅ 4.18: POST /api/login endpoint with JWT token generation
- ✅ 4.19: Modified POST /api/blogs to require valid token
- ✅ 4.20: `getTokenFrom()` helper extracts Bearer token from Authorization header
- ✅ 4.21: DELETE only allowed by blog creator (verified via token)
- ✅ 4.22: Token verification integrated into routes
- ✅ 4.23: Updated tests to include token authentication

**Authentication Flow:**
1. User logs in with POST /api/login (username + password)
2. Server verifies credentials and returns JWT token (expires in 1 hour)
3. Client includes token in Authorization header: `Bearer <token>`
4. Server verifies token and extracts user ID
5. Operations restricted to authenticated users only

### Database Configuration
- **Development:** MongoDB Atlas (`MONGODB_URI`)
- **Testing:** Separate test database (`TEST_MONGODB_URI`)
- **Connection:** Mongoose with IPv4 family

### Error Handling
Middleware handles:
- CastError (malformatted IDs)
- ValidationError (Mongoose validation)
- MongoServerError (duplicate keys)
- JsonWebTokenError (invalid tokens)
- TokenExpiredError (expired tokens)

### Testing Strategy
- **Unit Tests:** list_helper.test.js (13 tests for helper functions)
- **Integration Tests:** blog_api.test.js (API endpoints with authentication)
- **Test Database:** Separate MongoDB instance cleaned before each test
- **Test Helpers:** `blogsInDb()`, `usersInDb()`, `initialBlogs`

### Scripts
```json
{
  "start": "node index.js",
  "dev": "node --watch index.js",
  "test": "NODE_ENV=test node --test",
  "lint": "eslint ."
}
```

### Security Features
- Passwords hashed with bcrypt (saltRounds: 10)
- JWT tokens with expiration (1 hour)
- Token-based authorization for create/delete operations
- Creator-only delete authorization
- Environment variables for sensitive data

### Code Quality
- ESLint configured with recommended rules
- eqeqeq enforced (strict equality)
- No trailing spaces
- Consistent arrow spacing and object curly spacing
- Ignores dist/ and node_modules/

## Testing Results
✅ **Unit Tests (list_helper.test.js):** All 13 tests passing
- Total likes calculations ✓
- Favorite blog detection ✓
- Most blogs by author ✓
- Most likes by author ✓

✅ **Integration Tests (blog_api.test.js):** Comprehensive coverage
- Blog CRUD operations ✓
- User creation and validation ✓
- Token-based authentication ✓
- Authorization checks ✓

## Key Learnings
1. **Project Structure:** Separation of concerns (controllers, models, utils)
2. **Testing:** Unit tests vs integration tests with supertest
3. **Authentication:** JWT token-based authentication
4. **Security:** Password hashing, token expiration
5. **MongoDB:** Population of references, unique constraints
6. **Error Handling:** Centralized middleware for consistent responses
7. **Environment Config:** Separate dev/test databases

## Next Steps
- Part 5 will add a React frontend
- Token management in browser
- User login UI
- Blog creation/deletion from frontend

---
**Status:** ✅ All Part 4 exercises (4.1-4.23) completed successfully!
