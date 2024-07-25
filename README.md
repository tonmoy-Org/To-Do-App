# To-Do App

A simple and efficient To-Do application built with React and Redux, allowing users to manage their tasks effectively. The app supports adding, updating, completing, and deleting tasks, along with a user-friendly interface.

## Features

- **Add Tasks**: Easily add new tasks to your list.
- **Edit Tasks**: Update existing tasks with new details.
- **Complete Tasks**: Mark tasks as complete or incomplete.
- **Delete Tasks**: Remove tasks from your list.
- **Task Counters**: Displays total tasks and completed tasks.

## Technologies Used

- **Frontend**: React, Redux, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Styling**: Material-UI
- **Notifications**: React-Toastify

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/todo-app.git
    cd todo-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. The app will be available at `http://localhost:3000`.

## Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    npm start
    ```

4. The backend server will be running at `http://localhost:5000`.

## Usage

1. **Add a Task**:
    - Enter the task description in the input field.
    - Click the "Add" button to add the task to the list.

2. **Edit a Task**:
    - Click the edit icon next to the task you want to edit.
    - Modify the task description in the input field.
    - Click the "Update" button to save changes.

3. **Complete/Incomplete a Task**:
    - Click the checkbox icon next to the task to mark it as complete or incomplete.

4. **Delete a Task**:
    - Click the delete icon next to the task you want to remove.

## API Endpoints

- **GET /api/tasks**: Retrieve all tasks.
- **POST /api/tasks/newTask**: Add a new task.
- **PUT /api/tasks/update-tasks/:id**: Update a task.
- **DELETE /api/tasks/tasks-delete/:id**: Delete a task.
- **PUT /api/tasks/complete/:id**: Mark a task as complete or incomplete.

## Screenshots

### Main View

![Main View](screenshots/main-view.png)

### Adding a Task

![Adding a Task](screenshots/add-task.png)

### Editing a Task

![Editing a Task](screenshots/edit-task.png)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

This project is licensed under the MIT License.
