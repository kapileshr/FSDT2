import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { supabase } from "../supabaseClient";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTasks(data);
    else console.error("Fetch error:", error.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const session = await supabase.auth.getSession();
    const userEmail = session?.data?.session?.user?.email;

    const { data, error } = await supabase.from("tasks").insert([
      {
        id: Date.now(),
        text: inputValue,
        is_deleted: false,
        reminder_date: null,
        email: userEmail, 
      },
    ]);

    if (!error) {
      setTasks([data[0], ...tasks]);
      setInputValue("");
    } else {
      console.error("Insert error:", error.message);
    }
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

  const setReminderDate = async (id, date) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ reminder_date: date })
      .eq("id", id);

    if (!error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, reminder_date: date } : task
        )
      );
    } else {
      console.error("Reminder update error:", error.message);
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .update({ is_deleted: true })
      .eq("id", id);

    if (!error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, is_deleted: true } : task
        )
      );
    } else {
      console.error("Delete error:", error.message);
    }
  };

  const getCurrentDateTime = () => {
    return new Date().toISOString().slice(0, 16);
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
          {tasks.map((task) =>
            !task.is_deleted ? (
              <li key={task.id} className="task-item">
                <div>
                  <span>{task.text}</span>
                  <button onClick={() => toggleDatePicker(task.id)}>
                    Reminder
                  </button>
                  {task.showDatePicker && (
                    <input
                      type="datetime-local"
                      onChange={(e) => setReminderDate(task.id, e.target.value)}
                      value={task.reminder_date || ""}
                      min={getCurrentDateTime()}
                      className={
                        task.reminder_date &&
                        new Date(task.reminder_date) < new Date()
                          ? "past"
                          : ""
                      }
                    />
                  )}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                  {task.reminder_date && (
                    <div className="reminder-date">
                      Reminder set for:{" "}
                      {new Date(task.reminder_date).toLocaleString()}
                    </div>
                  )}
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;