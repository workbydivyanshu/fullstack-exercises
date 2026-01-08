# Blog List Application - Part 4

This is a blog list backend application built as part of the Full Stack Open course Part 4.

## Features

- RESTful API for managing blog posts
- User authentication with JWT tokens
- Password hashing with bcrypt
- MongoDB database integration
- Comprehensive test suite
- ESLint code quality checks

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
TEST_MONGODB_URI=your_test_mongodb_connection_string
PORT=3003
SECRET=your_secret_key
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create a new blog (requires authentication)
- `DELETE /api/blogs/:id` - Delete a blog (requires authentication, only creator)
- `PUT /api/blogs/:id` - Update a blog

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

### Login
- `POST /api/login` - Login and receive token

## Exercises Completed

### Part 4a (Exercises 4.1-4.7)
- ✅ 4.1: Blog list, step 1 - Basic structure
- ✅ 4.2: Blog list, step 2 - Refactored into modules
- ✅ 4.3: Helper functions and unit tests, step 1 - dummy function
- ✅ 4.4: Helper functions and unit tests, step 2 - totalLikes
- ✅ 4.5: Helper functions and unit tests, step 3 - favoriteBlog
- ✅ 4.6: Helper functions and unit tests, step 4 - mostBlogs
- ✅ 4.7: Helper functions and unit tests, step 5 - mostLikes

### Part 4b (Exercises 4.8-4.14)
- ✅ 4.8: Blog list tests, step 1 - GET /api/blogs
- ✅ 4.9: Blog list tests, step 2 - Verify id property
- ✅ 4.10: Blog list tests, step 3 - POST creates new blog
- ✅ 4.11: Blog list tests, step 4 - Likes defaults to 0
- ✅ 4.12: Blog list tests, step 5 - Validation for title and url
- ✅ 4.13: Blog list expansions, step 1 - DELETE endpoint
- ✅ 4.14: Blog list expansions, step 2 - PUT endpoint

### Part 4c (Exercises 4.15-4.17)
- ✅ 4.15: Blog list expansion, step 3 - User creation
- ✅ 4.16: Blog list expansion, step 4 - User validation
- ✅ 4.17: Blog list expansion, step 5 - Blogs linked to users

### Part 4d (Exercises 4.18-4.23)
- ✅ 4.18: Blog list expansion, step 6 - Token authentication
- ✅ 4.19: Blog list expansion, step 7 - Token-based blog creation
- ✅ 4.20: Blog list expansion, step 8 - tokenExtractor middleware
- ✅ 4.21: Blog list expansion, step 9 - Delete only by creator
- ✅ 4.22: Blog list expansion, step 10 - userExtractor middleware
- ✅ 4.23: Blog list expansion, step 11 - Tests with token authentication
