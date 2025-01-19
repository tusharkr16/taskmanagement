# Collaborative Task Management System

## Project Title: Collaborative Task Management System

### Description
The Collaborative Task Management System allows multiple users to create, assign, and manage tasks within various projects. This web-based platform helps teams stay organized and efficient by providing tools to track tasks, assign them to users, and manage project details. The application includes user registration, authentication, task and project management, and various filtering and search features.

---

## Features

1. **User Registration and Authentication**:
   - Users can register with their name, email, and password.
   - Authentication is implemented using JWT (JSON Web Tokens).
   - Only authenticated users can access the platform.

2. **Project Management**:
   - Users can create, edit, and delete projects.
   - Each project has the following details:
     - Title
     - Description
     - Creation Date
     - Project Owner

3. **Task Management**:
   - Users can create, edit, delete, and assign tasks to users within a project.
   - Task details include:
     - Task Title
     - Description
     - Status (To-Do, In Progress, Completed)
     - Deadline
     - Assigned User
   - Tasks are displayed grouped by their status.

4. **User Dashboard**:
   - Displays all projects and tasks assigned to the user.
   - Includes a task summary with total tasks, completed tasks, etc.

5. **Search and Filters**:
   - Users can search for tasks by title or description.
   - Tasks can be filtered by status, deadline, and assigned user.

---

## Tech Stack

- **Frontend**:
  - React.js (Functional components and hooks)
  - React Router for navigation
  - Responsive design for usability across devices
  - Form validation for user input

- **Backend**:
  - Node.js and Express.js
  - RESTful API for user authentication and CRUD operations

- **Database**:
  - MongoDB for storing:
    - User information
    - Project and task data

- **Authentication**:
  - JSON Web Tokens (JWT) for user authentication and authorization

---

## Installation

### Prerequisites

Make sure you have the following installed:
- Node.js and npm
- MongoDB (or use MongoDB Atlas for cloud hosting)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
