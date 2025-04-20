import { useState } from "react";
import styled from "styled-components"

const Container = styled.div`
background-color: lightyellow;
padding: 10px;
border-radius: 5px;
`;
const Heading = styled.h2`
color: darkgoldenrod;
font-size: 24px;
`;

function TaskTrackerWithStyle() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false, isEditing: false },
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  // Add new task
  const addTask = () => {
    if (newTaskText.trim() === "") return;
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      completed: false,
      isEditing: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  // Toggle complete/incomplete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Enable editing
  const startEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  // Handle editing change
  const handleEditChange = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Save edited task
  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
  };

  // Delete task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container>
      <Heading>Task Tracker</Heading>
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleEditChange(task.id, e.target.value)}
                />
                <button onClick={() => saveTask(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <button onClick={() => startEditing(task.id)}>Edit</button>
              </>
            )}
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default TaskTrackerWithStyle;
