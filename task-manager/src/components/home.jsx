import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      text: taskText,
      priority: taskPriority,
      dueDate: taskDueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
    setTaskPriority('low');
    setTaskDueDate('');
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div style={{ backgroundColor: '#d7c49e', height: '100vh' }}>
      <nav className="navbar" style={{ backgroundColor: '#8b5a2b', height: '100vh', position: 'fixed', width: '250px', paddingTop: '10px' }}>
        <div className="text-center">
          <a className="navbar-brand" href="#" style={{ color: 'white', fontSize: '1.5em' }}>
            <img src="https://via.placeholder.com/40" alt="Profile" style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }} />
            Hello, User
          </a>
        </div>
        <div className="nav flex-column">
          <a className="nav-link" href="#"><i className="fas fa-plus"></i> Add Task</a>
          <a className="nav-link" href="#"><i className="fas fa-search"></i> Search</a>
          <a className="nav-link" href="#"><i className="fas fa-calendar-alt"></i> Upcoming Tasks</a>
        </div>
      </nav>

      <div className="container" style={{ marginLeft: '270px', padding: '20px' }}>
        <h1 className="text-center" style={{ marginBottom: '30px', color: '#8b5a2b' }}>Task Manager</h1>

        <form className="form-inline justify-content-center mb-4" onSubmit={addTask}>
          <input type="text" className="form-control mr-2" value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder="Enter a new task" required />
          <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="form-control mr-2">
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input type="date" className="form-control mr-2" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>

        <div className="text-center mb-4">
          <button className="btn btn-outline-primary" onClick={() => setFilter('all')}>All Tasks</button>
          <button className="btn btn-outline-primary" onClick={() => setFilter('active')}>Active Tasks</button>
          <button className="btn btn-outline-primary" onClick={() => setFilter('completed')}>Completed Tasks</button>
        </div>

        <div className="row">
          {filteredTasks.map((task, index) => (
            <div className="col-md-4" key={index}>
              <div className={`card task-card ${task.completed ? 'completed' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">{task.text}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Priority: {task.priority}</h6>
                  <p className="card-text">Due Date: {task.dueDate || 'No due date'}</p>
                  <button className="btn btn-success" onClick={() => toggleComplete(index)}>
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteTask(index)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;