import { useEffect, useState } from 'react'
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem("TASKS")
    if(localValue == null) {
      return []
    }
    else{
    return JSON.parse(localValue)
    }
  })
  
  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
  }, [tasks])
  
  const addTask = () => {
    if (newTask.trim() === "") return
    setTasks([...tasks, { text: newTask, completed: false }])
    setNewTask("")
  }

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
  }

  const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text)
    if (newText !== null) {
      const updatedTasks = [...tasks]
      updatedTasks[index].text = newText.trim()
      setTasks(updatedTasks)
    }
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <>
    
   <div className="container mt-5 text-center">
   <div className="card p-4  mb-5 text-center bg-secondary text-light ">
            <h3>Task Done</h3>
            <p>Keep it up</p>
            <div className="progress-circle">
                <span id="taskProgress">{tasks.filter(task => task.completed).length} / {tasks.length}</span>
            </div>
        </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? "text-decoration-line-through" : ""}`}
          >

            <span onClick={() => toggleTask(index)}>⬜ {task.text}</span>
            <div>
              <button className="btn btn-warning btn-sm mx-1" onClick={() => editTask(index)}>
                ✏
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
         </div>
    </>
  )
}
export default App