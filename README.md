# User & Categories API Project

## Introduction
This project is a RESTful API built using Node.js and Express. It connects to a MySQL database and is designed to manage two main entities: **Users** and **Categories**. The API provides full CRUD functionality, validation for user inputs, pagination, search capabilities, and includes a documentation page for all endpoints.

---

## Features
### User Functionalities:
- Full **CRUD operations** for both **Users** and **Categories**.
- **Search**: Filter users by their name.
- **Pagination**: Use `limit` and `offset` parameters to paginate results.

### Additional Features:
- The root page (`index.js`) contains documentation for all available API endpoints in HTML.

---

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v20 or later)
- **MySQL Database**
- **Postman** (or any API testing tool)

---

## Installation
To get started with the project, follow these steps:

### Step 1: Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/BackendWeb2.git
```

Navigate into the project directory:

```bash
cd BackendWeb2
```

### Step 2: Install Dependencies
Install the required Node.js dependencies:

```bash
npm install
```

### Step 3: Set Up the MySQL Database
1. **Create a MySQL database** for the project. You can do this via a GUI like **phpMyAdmin** or using the MySQL CLI.
2. Use the following SQL script to create the required tables:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);
```

3. Make sure your database is running and accessible.

### Step 4: Configure Environment Variables
1. Create a `.env` file in the root of the project.
2. Add the following variables (replace placeholders with your actual credentials):

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

### Step 5: Start the Server
Run the following command to start the server:

```bash
node index.js
```

The server will start on the specified port (default: `3000`).

### Step 6: Test the API
You can now test the API endpoints using Postman or any other API testing tool. Visit the API documentation at:

```
http://localhost:3000/
```

---

## Usage
- **Users**:
  - Create, Read, Update, and Delete users.
  - Search users by name or id.
  - Paginate results using `limit` and `offset` parameters.
- **Categories**:
  - Manage categories with full CRUD functionality as you can do for users.

---

## Notes
- Ensure your database is running and accessible before starting the server.
- For production use, consider securing your `.env` file and sensitive data.

---

## License
This project is open-source and available under the MIT License.

 ## Acknowledgments
This project was made possible with the support of the following resources and tools:

- **ChatGPT by OpenAI**: For providing guidance on structuring the README and giving assistance in solving errors and addressing challenges throughout the development process.
- **Postman**: For testing API endpoints efficiently. ([https://www.postman.com/](https://www.postman.com/))
- **GitHub**: For version control and repository hosting.
