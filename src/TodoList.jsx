import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Edit a task
  const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newText.trim();
      setTasks(updatedTasks);
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };


};

export default TodoList;
