"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import dbStorage from "@/utils/dbstorage";

// 1. Define the structure of a single task
interface Task {
  id: number;
  title: string;
  content: string;
  color: string;
  icon: number;
  deadline: string; // Use string since you are using .toISOString()
  completed?: boolean;
}

// 2. Define the structure of your state object
interface TaskState {
  task?: Task[];
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<TaskState>({
    task: [
      {
        id: 1,
        title: "Sample Task",
        content: "This is a sample task. You can edit or delete it.",
        color: "#4CAF50",
        icon: 1,
        deadline: new Date().toISOString(),
        completed: false,
      }
    ]
  });
  const [filter, setFilter] = useState<"today" | "tomorrow" | "all" | "calendar">("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const [newTask, setNewTask] = useState<Omit<Task, "id" | "completed">>({
    title: "",
    content: "",
    color: "#4CAF50",
    icon: 1,
    deadline: new Date().toISOString().slice(0, 16),
  });

  const loadTasks = async () => {
    const user = await dbStorage.getSelfId();
    await dbStorage.loadJSONData("nursync", "tasks", user.id, "taskList", null);
    setTasks(dbStorage.getJSONData() as TaskState);
    setInitialized(true);
  };

  const storeTasks = async () => {
    const user = await dbStorage.getSelfId();
    await dbStorage.storeJSONData("nursync", "tasks", user.id, "taskList", null, ["#all"], [], []);
  };

  const reloadTasks = async () => {
    const freshData = dbStorage.getJSONData<TaskState>();
    setTasks({
      ...freshData,
      task: [...(freshData?.task ?? [])] // Create a new array reference
    });
  }

  // 🔹 Load from localStorage or default
  useEffect(() => {
    loadTasks();
  }, []);


  // Add new task
  const postTask = async () => {
    if (!newTask.title.trim()) return;
    const task: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    };
    dbStorage.pushJSONData(["task"], task);

    await storeTasks();
    reloadTasks();
    setShowForm(false);
    setNewTask({
      title: "",
      content: "",
      color: "#4CAF50",
      icon: 1,
      deadline: new Date().toISOString().slice(0, 16),
    });
  };

  // Toggle complete
  const toggleComplete = async (id: number) => {
    dbStorage.updateJSONData(["task"], (t) => t.id === id, { completed: !tasks.task?.find((t) => t.id === id)?.completed });
    await storeTasks();
    reloadTasks();
  };

  // Delete
  const deleteTask = async (id: number) => {
    dbStorage.popJSONData(["task"], (t) => t.id === id);
    await storeTasks();
    reloadTasks();
  };

  // Filtering
  const filteredTasks = tasks.task?.filter((task) => {
    if (filter === "all") return true;
    const taskDate = new Date(task.deadline);
    const today = new Date();
    if (filter === "today") return taskDate.toDateString() === today.toDateString();
    if (filter === "tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return taskDate.toDateString() === tomorrow.toDateString();
    }
    if (filter === "calendar" && selectedDate)
      return taskDate.toISOString().slice(0, 10) === selectedDate;
    return true;
  });

  const taskList = tasks?.task ?? [];

  const progress =
    taskList?.length > 0
      ? Math.round((taskList.filter((t) => t.completed).length / taskList.length) * 100)
      : 0;

  const getContrastColor = (bgColor: string) => {
    const c = (bgColor ?? "#000000").substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    return luma > 150 ? "black" : "white";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2vw",
        paddingBottom: "16vw",
        fontFamily: "Arial, sans-serif",
        color: "black",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Task Manager
      </motion.h1>

      {/* Filter Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        {["today", "tomorrow", "all"].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #888",
              backgroundColor: filter === key ? "#4CAF50" : "#eee",
              color: filter === key ? "white" : "black",
              cursor: "pointer",
            }}
          >
            {key === "today" ? "Today" : key === "tomorrow" ? "Tomorrow" : "All"}
          </button>
        ))}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setFilter("calendar");
          }}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Progress Bar */}
      <div style={{ width: "100%", maxWidth: "500px", marginBottom: "16px" }}>
        <div style={{ marginBottom: "4px", fontSize: "14px" }}>Progress: {progress}%</div>
        <div
          style={{
            width: "100%",
            background: "#ddd",
            height: "18px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              height: "100%",
              backgroundColor: "#4CAF50",
            }}
          />
        </div>
      </div>

      {/* Task List */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <AnimatePresence>
          {filteredTasks?.map((task) => {
            const textColor = getContrastColor(task.color);
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: task.color,
                  color: textColor,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </div>
                  <div style={{ fontSize: "13px" }}>{task.content}</div>
                  <div style={{ fontSize: "11px", opacity: 0.8 }}>
                    {new Date(task.deadline).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button
                    onClick={() => toggleComplete(task.id)}
                    style={{
                      backgroundColor: task.completed ? "#bbb" : "#222",
                      color: "white",
                      border: "none",
                      padding: "5px 8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      backgroundColor: "#ff5555",
                      color: "white",
                      border: "none",
                      padding: "5px 8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add Task */}
      <div style={{ marginTop: "24px" }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowForm((prev) => !prev)}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "28px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          +
        </motion.button>
      </div>

      {/* Task Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              marginTop: "16px",
              backgroundColor: "white",
              border: "2px solid #4CAF50",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={{
                width: "100%",
                marginBottom: "8px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Content"
              value={newTask.content}
              onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
              style={{
                width: "100%",
                marginBottom: "8px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="color"
              value={newTask.color}
              onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
              style={{
                width: "100%",
                marginBottom: "8px",
                padding: "6px",
              }}
            />
            <input
              type="number"
              placeholder="Icon #"
              min={1}
              max={1}
              value={newTask.icon}
              onChange={(e) =>
                setNewTask({ ...newTask, icon: Number(e.target.value) })
              }
              style={{
                width: "100%",
                marginBottom: "8px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="datetime-local"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "1vw",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={postTask}
              style={{
                width: "100%",
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Enter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
