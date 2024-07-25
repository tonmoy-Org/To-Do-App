import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Container, Box, Typography, Badge, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTask, deleteTask, completeTask, setTasks, updateTask } from '../../redux/taskSlice';

const ToDoApp = () => {
    const [task, setTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [loading, setLoading] = useState(false);
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const fetchTasks = async () => {
        try {
            const response = await fetch('https://to-do-mongoose-server-two.vercel.app/api/tasks');
            const tasks = await response.json();
            dispatch(setTasks(tasks));
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [dispatch]);

    const notify = (type, message) => {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'info':
                toast.info(message);
                break;
            case 'warn':
                toast.warn(message);
                break;
            default:
                toast(message);
        }
    };

    const handleAddTask = async () => {
        if (task.trim() !== '') {
            setLoading(true);
            const newTask = { task };
            try {
                const response = await fetch('https://to-do-mongoose-server-two.vercel.app/api/tasks/newTask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const savedTask = await response.json();
                dispatch(addTask(savedTask));
                setTask('');
                notify('success', 'Task added successfully!');
            } catch (error) {
                console.error('Failed to add task:', error);
                notify('error', 'Failed to add task');
            } finally {
                setLoading(false);
                fetchTasks();
            }
        }
    };

    const handleUpdateTask = async () => {
        if (task.trim() !== '' && currentTaskId) {
            setLoading(true);
            const updatedTask = { task };
            try {
                const response = await fetch(`https://to-do-mongoose-server-two.vercel.app/api/tasks/update-tasks/${currentTaskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedTask),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const savedTask = await response.json();
                dispatch(updateTask(savedTask));
                setTask('');
                setIsEditing(false);
                setCurrentTaskId(null);
                notify('success', 'Task updated successfully!');
            } catch (error) {
                console.error('Failed to update task:', error);
                notify('error', 'Failed to update task');
            } finally {
                setLoading(false);
                fetchTasks();
            }
        }
    };

    const handleDeleteTask = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`https://to-do-mongoose-server-two.vercel.app/api/tasks/tasks-delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            dispatch(deleteTask(id));
            notify('success', 'Task deleted successfully!');
        } catch (error) {
            console.error('Failed to delete task:', error);
            notify('error', 'Failed to delete task');
        } finally {
            setLoading(false);
            fetchTasks();
        }
    };

    const handleCompleteTask = async (id) => {
        setLoading(true);
        const taskToUpdate = tasks.find((task) => task._id === id);
        const updatedTask = { completed: !taskToUpdate.completed };
        try {
            const response = await fetch(`https://to-do-mongoose-server-two.vercel.app/api/tasks/complete/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            dispatch(completeTask(result));
            notify('success', `Task ${updatedTask.completed ? 'completed' : 'marked as incomplete'} successfully!`);
        } catch (error) {
            console.error('Failed to complete task:', error);
            notify('error', 'Failed to complete task');
        } finally {
            setLoading(false);
            fetchTasks();
        }
    };

    const handleEditTask = (task) => {
        setIsEditing(true);
        setCurrentTaskId(task._id);
        setTask(task.task);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
        setCurrentTaskId(null);
        setTask('');
    };

    const completedTasksCount = tasks.filter(task => task.completed).length;
    const totalTasksCount = tasks.length;

    return (
        <Container maxWidth="sm" sx={{ borderRadius: 2, boxShadow: 3, p: 4, bgcolor: '#9f80d067' }}>
            <ToastContainer />
            <Typography variant="h5" component="h1" gutterBottom align="center">
                TO DO List
            </Typography>
            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                <TextField
                    label={isEditing ? "Update task" : "Add a new task"}
                    value={task}
                    variant="standard"
                    onChange={(e) => setTask(e.target.value)}
                    fullWidth
                    sx={{ mr: 2, borderRadius: 1 }}
                />
                <Button
                    variant="contained"
                    onClick={isEditing ? handleUpdateTask : handleAddTask}
                    disabled={loading}
                    sx={{ bgcolor: '#6a43a9' }}
                >
                    {loading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : isEditing ? 'Update' : 'Add'}
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Badge badgeContent={totalTasksCount} color="success">
                    <Typography variant="body2">Total Tasks</Typography>
                </Badge>
                <Badge badgeContent={completedTasksCount} color="secondary">
                    <Typography variant="body2">Completed</Typography>
                </Badge>
            </Box>
            <Box elevation={3} sx={{ maxHeight: '400px', overflow: 'auto', padding: 1 }}>
                <List>
                    {tasks.map((task) => (
                        <ListItem
                            key={task._id}
                            sx={{
                                borderRadius: 1,
                                mb: 1,
                                boxShadow: 1,
                                p: 1,
                            }}
                            secondaryAction={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton edge="end" aria-label="complete" onClick={() => handleCompleteTask(task._id)} disabled={loading}>
                                        {task.completed ? <CheckBoxIcon color='success' /> : <CheckBoxOutlineBlankIcon />}
                                    </IconButton>
                                    {isEditing && currentTaskId === task._id ? (
                                        <IconButton edge="end" aria-label="close" onClick={handleCloseEdit} disabled={loading}>
                                            <CloseIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task)} disabled={loading}>
                                            <EditIcon color='secondary' />
                                        </IconButton>
                                    )}
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task._id)} disabled={loading}>
                                        <DeleteIcon color='error' />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemText primary={task.task} sx={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default ToDoApp;
