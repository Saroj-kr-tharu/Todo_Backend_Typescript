"# Todo Backend TypeScript API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org/)

A robust and scalable Todo application backend built with TypeScript, Express.js, and MySQL. This RESTful API provides comprehensive task management functionality with user authentication, JWT tokens, and a well-structured architecture following best practices.

## 🚀 Features

### 🔐 Authentication & Security
- **User Registration & Login** with email validation
- **JWT Token Authentication** for secure API access
- **Password Hashing** using bcrypt for enhanced security
- **Token Verification** middleware for protected routes

### 📝 Task Management
- **CRUD Operations** for tasks (Create, Read, Update, Delete)
- **Task Status Management**: `pending`, `inProgress`, `completed`
- **Priority Levels**: `low`, `medium`, `high`
- **Due Date Tracking** for better task organization
- **User-specific Tasks** with proper authorization

### 🏗️ Architecture & Design
- **TypeScript** for type safety and better developer experience
- **Layered Architecture**: Controllers → Services → Repositories
- **Sequelize ORM** with TypeScript support
- **Database Migrations** for version control
- **Input Validation** middlewares
- **Error Handling** with structured responses

## 📋 Table of Contents

- [Installation](#-installation)
- [Configuration](#-configuration)
- [Database Setup](#-database-setup)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠️ Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **MySQL** (v8 or higher)
- **npm** or **yarn**

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saroj-kr-tharu/Todo_Backend_Typescript.git
   cd Todo_Backend_Typescript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8000

# JWT Configuration
PRIVATEJWT=your_super_secure_jwt_secret_key_here

# Database Configuration (Optional - uses config.json by default)
DB_USERNAME=root
DB_PASSWORD=12345
DB_DATABASE=todo_typescript_DB
DB_HOST=127.0.0.1
DB_DIALECT=mysql
```

### Database Configuration

The application uses `src/config/config.json` for database configuration:

```json
{
  "development": {
    "username": "root",
    "password": "12345",
    "database": "todo_typescript_DB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

## 🗄️ Database Setup

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE todo_typescript_DB;
   ```

2. **Run Migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

3. **Run Seeders (Optional)**
   ```bash
   npx sequelize-cli db:seed:all
   ```

### Database Schema

#### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| username | STRING | User's display name |
| email | STRING | Unique email address |
| password | STRING | Hashed password |
| createdAt | DATE | Account creation timestamp |
| updatedAt | DATE | Last update timestamp |

#### Tasks Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| user_id | INTEGER | Foreign key to Users table |
| title | STRING | Task title |
| description | TEXT | Detailed task description |
| status | ENUM | `pending`, `inProgress`, `completed` |
| priority | ENUM | `low`, `medium`, `high` |
| due_date | DATE | Task deadline |
| createdAt | DATE | Task creation timestamp |
| updatedAt | DATE | Last update timestamp |

## 🚀 Usage

### Development Mode
```bash
npm start
```

This command will:
- Compile TypeScript to JavaScript
- Start the server with nodemon for auto-reload
- Watch for file changes

### Production Build
```bash
# Compile TypeScript
npx tsc

# Start production server
node dist/index.js
```

The server will start on `http://localhost:8000` (or your configured PORT).

## 📡 API Endpoints

### Base URL
```
http://localhost:8000/api/v1
```

### Health Check
```http
GET /api/v1/ping
```
**Response:**
```json
{
  "message": "Auth Server is good to GO"
}
```

### 🔐 Authentication Endpoints

#### User Registration
```http
POST /api/v1/auth/signup
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Successfully to Signup",
  "success": true,
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  },
  "err": {}
}
```

#### User Login
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Token Verification
```http
GET /api/v1/auth/veriyToken
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

### 📝 Task Management Endpoints

#### Create Task
```http
POST /api/v1/task/add
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "user_id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "priority": "high",
  "due_date": "2024-12-01"
}
```

#### Get All Tasks
```http
GET /api/v1/tasks
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

#### Get Task by ID
```http
GET /api/v1/task/getByID?id=1
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

#### Update Task
```http
PATCH /api/v1/task/update
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "id": 1,
  "title": "Updated task title",
  "status": "completed",
  "priority": "medium"
}
```

#### Delete Task
```http
DELETE /api/v1/task/delete
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "id": 1
}
```

## 📁 Project Structure

```
src/
├── config/
│   ├── config.json              # Database configuration
│   └── server-config.ts         # Server and JWT configuration
├── Controllers/
│   ├── taskController.ts        # Task route handlers
│   └── userControllers.ts       # User authentication handlers
├── Middlewares/
│   ├── taskMiddlewares.ts       # Task validation middleware
│   └── userMiddlewares.ts       # User validation & auth middleware
├── migrations/
│   ├── 20251124050324-create-users.js    # Users table migration
│   └── 20251124050405-create-tasks.js    # Tasks table migration
├── models/
│   ├── index.ts                 # Sequelize models index
│   ├── tasks.ts                 # Task model definition
│   └── users.ts                 # User model definition
├── Repository/
│   ├── CurdRepo.ts              # Base CRUD repository
│   ├── tasksRepo.ts             # Task data access layer
│   └── userRepo.ts              # User data access layer
├── Routes/
│   ├── index.ts                 # Main router
│   └── rotues/
│       └── index.ts             # API route definitions
├── seeders/                     # Database seeders
├── Services/
│   ├── CurdService.ts           # Base service layer
│   ├── taskService.ts           # Task business logic
│   └── userService.ts           # User business logic
├── utlis/
│   ├── bcrypt_helper.ts         # Password hashing utilities
│   └── jwtHelps.ts              # JWT token utilities
└── index.ts                     # Application entry point
```

## 🛠️ Technologies

### Core Technologies
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Web application framework

### Database & ORM
- **[MySQL](https://www.mysql.com/)** - Relational database
- **[Sequelize](https://sequelize.org/)** - Promise-based ORM
- **[Sequelize CLI](https://github.com/sequelize/cli)** - Migration and seeding

### Authentication & Security
- **[JSON Web Tokens (JWT)](https://jwt.io/)** - Stateless authentication
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Password hashing

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Nodemon](https://nodemon.io/)** - Development auto-restart
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variables

### Utilities
- **[body-parser](https://www.npmjs.com/package/body-parser)** - Request parsing
- **[cors](https://www.npmjs.com/package/cors)** - Cross-origin resource sharing

## 📜 Scripts

```bash
# Development
npm start                 # Start development server with hot reload

# Database
npx sequelize-cli db:migrate         # Run database migrations
npx sequelize-cli db:migrate:undo    # Rollback last migration
npx sequelize-cli db:seed:all        # Run all seeders

# Code Quality
npx eslint src/                      # Lint TypeScript files
npx prettier --write src/            # Format code

# Build
npx tsc                             # Compile TypeScript to JavaScript
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add proper error handling
- Include input validation
- Update documentation for API changes

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Saroj Kumar Tharu**
- GitHub: [@Saroj-kr-tharu](https://github.com/Saroj-kr-tharu)

## 🙏 Acknowledgments

- Thanks to the TypeScript and Node.js communities
- Express.js team for the excellent framework
- Sequelize team for the powerful ORM

---

⭐ **Star this repository if you found it helpful!**
" 
