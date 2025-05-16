import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      showDatePicker: false,
      reminderDate: null,
      isDeleted: false, // Flag to track deletion
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const toggleDatePicker = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, showDatePicker: !task.showDatePicker }
          : task
      )
    );
  };

  const setReminderDate = (id, date) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, reminderDate: date } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isDeleted: true } : task
      )
    );
  };

  const getCurrentDateTime = () => {
    return new Date().toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2>Reminder to add</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="task"
            name="task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.isDeleted ? "deleted" : ""}`}
            >
              <div>
                <span>{task.text}</span>
                <button onClick={() => toggleDatePicker(task.id)}>
                  Reminder
                </button>
                {task.showDatePicker && (
                  <input
                    type="datetime-local"
                    onChange={(e) =>
                      setReminderDate(task.id, e.target.value)
                    }
                    value={task.reminderDate || ""}
                    min={getCurrentDateTime()}
                    className={
                      task.reminderDate &&
                      new Date(task.reminderDate) < new Date()
                        ? "past"
                        : ""
                    }
                  />
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                {task.reminderDate && (
                  <div className="reminder-date">
                    Reminder set for:{" "}
                    {new Date(task.reminderDate).toLocaleString()}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
