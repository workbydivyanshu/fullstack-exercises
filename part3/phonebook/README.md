# Phonebook Backend

Full Stack Open 2024 - Part 3 Exercises (with MongoDB)

## Live Demo

🔗 **Deployed Application:** [Phonebook on Render](https://fullstack-phonebook-YOUR_ID.onrender.com)

*Note: Update the link above after deploying to Render*

## MongoDB Atlas Setup (Part 3c)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier - M0, AWS, any region)
3. Under Security → Database Access, create a database user with password
4. Under Security → Network Access, add `0.0.0.0/0` to allow all IPs
5. Under Database → Connect → Drivers, get your connection string
6. Create a `.env` file in the project root:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/phonebookApp?retryWrites=true&w=majority
   PORT=3001
   ```

## Command-line Database Tool (Exercise 3.12)

```bash
# Add a person to the database
node mongo.js <password> "Name Here" "123-456789"

# List all persons in the database
node mongo.js <password>
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/persons | Get all phonebook entries |
| GET | /api/persons/:id | Get a single entry |
| POST | /api/persons | Add a new entry |
| PUT | /api/persons/:id | Update an entry |
| DELETE | /api/persons/:id | Delete an entry |
| GET | /info | Show phonebook info |

## Running Locally

```bash
npm install
npm start
```

Server runs on port 3001 by default.

## Environment Variables

- `MONGODB_URI` - MongoDB Atlas connection string (required)
- `PORT` - Server port (defaults to 3001)
