"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

//components
import CustomAlert from "@/components/CustomAlert";

//utils
import dbStorage from "@/utils/dbstorage"

export default function NurSyncProfile() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const closeAlert = () => {
    setIsAlertOpen(false);
  };
  const customAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  const tasks = [
    { title: "Complete Nursing Informatics Module", status: "Done" },
    { title: "Review Anatomy Flashcards", status: "Pending" },
    { title: "Attend Clinical Simulation", status: "In Progress" },
    { title: "Submit Research Paper Draft", status: "Pending" },
  ];

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "Loading..",
    lastname: "Loading..",
    middlename: "Loading..",
    university: "Loading..",
    studentid: "Loading..",
    emailaddress: "Loading..",
    username: "Loading..",
    password: "Loading..",
  });

  const originalData = { ...formData };

  useEffect(() => {
    getUserInfo();
  }, []);


  const getUserInfo = async () => {
    const data = await dbStorage.getSelfId();
    //alert(data);
    const res = await dbStorage.getItem(
      'nursync',
      'user',
      data,
      null,
      null
    );
    
    if (res) {
      //alert(JSON.stringify(res));
      setFormData({
        firstname: res?.nursync?.user?.firstname ?? "",
        lastname: res?.nursync?.user?.lastname ?? "",
        middlename: res?.nursync?.user?.middlename ?? "",
        university: res?.nursync?.user?.university ?? "",
        studentid: res?.nursync?.user?.studentid ?? "",
        emailaddress: res?.nursync?.user?.emailaddress ?? "",
        username: res?.nursync?.user?.username ?? "",
        password: res?.nursync?.user?.password ?? "",
      });
    }
  };

  const updateUserInfo = async () => {
    try {
      const readId = await dbStorage.getSelfId();
      var updateUsername;
      if (readId !== formData.username) {
        updateUsername = await dbStorage.setSelfId(formData.username);
      }
      const updatePassword = await dbStorage.setSelfPassword(formData.password);
      //alert(JSON.stringify(formData));
      if (updateUsername || updatePassword) {
        const removeModel = await dbStorage.removeItem(
          'nursync',
          'user',
          readId,
          null,
          null
        );
        if (removeModel) {
          const newModel = await dbStorage.setItem(
            'nursync',
            'user',
            formData.username,
            ["firstname", "lastname", "middlename", "university", "studentid", "emailaddress", "password", "username"],
            [formData.firstname, formData.lastname, formData.middlename, formData.university, formData.studentid, formData.emailaddress, formData.password, formData.username],
            ["#all"],
            [formData.username],
            [formData.username]
          );
          //alert(JSON.stringify(newModel));
          if (newModel) {
            customAlert('Updated Successfully.');
          }
        }
      } else {
        const newModel = await dbStorage.setItem(
          'nursync',
          'user',
          formData.username,
          ["firstname", "lastname", "middlename", "university", "studentid", "emailaddress", "password", "username"],
          [formData.firstname, formData.lastname, formData.middlename, formData.university, formData.studentid, formData.emailaddress, formData.password, formData.username],
          ["#all"],
          [formData.username],
          [formData.username]
        );
        
        alert(JSON.stringify(newModel));
        if (newModel) {
          customAlert('Updated Successfully.');
        }
      }
    } catch (error) {
      customAlert(error instanceof Error ? error.message : String(error));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    padding: "1vw 0 0 7vw",
    color: "black",
  };

  const cardStyle: React.CSSProperties = {
    border: "0.12vw solid #bdbdbd",
    borderRadius: "0.8vw",
    background: "#ffffff",
    padding: "2vw",
    marginBottom: "2vw",
    boxShadow: "0 0.5vw 1vw rgba(0,0,0,0.08)",
    color: "black",
    width: "36vw",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8vw",
    margin: "0.5vw 0",
    borderRadius: "0.4vw",
    border: "0.12vw solid #bdbdbd",
    fontSize: "1.1vw",
    color: "black",
    background: editMode ? "#ffffff" : "#f5f5f5",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "1.2vw",
    marginTop: "0.8vw",
    fontWeight: "bold",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "1vw 2vw",
    border: "0.12vw solid #bdbdbd",
    borderRadius: "0.5vw",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "1.2vw",
    color: "black",
    marginRight: "1vw",
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "#1b5e20";
      case "In Progress":
        return "#f57f17";
      default:
        return "#b71c1c";
    }
  };

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER PROFILE */}
      <div style={{ textAlign: "center", marginBottom: "2vw", color: "black" }}>
        <div
          style={{
            width: "10vw",
            height: "10vw",
            margin: "auto",
            backgroundImage: "url('./default.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
            border: "0.5vw solid #1b5e20",
          }}
        ></div>

        <h1 style={{ fontSize: "2vw", margin: "1vw 0" }}>
          {formData.lastname}, {formData.firstname} {formData.middlename}
        </h1>
      </div>

      {/* FLEX LAYOUT */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2vw", flexWrap: "wrap" }}>

        {/* PERSONAL INFO CARD */}
        <motion.div style={cardStyle} whileHover={{ scale: 1.02 }}>
          <h3 style={{ fontSize: "1.6vw", marginBottom: "1vw" }}>Personal Information</h3>

          {/* FORM FIELDS */}
          {Object.keys(formData).map((key, index) => (
            <div key={index}>
              <label style={labelStyle}>{key.toUpperCase()} 
                <span style={{ fontSize: "1vw", color: "#757575" }}>{key === "username" ? " (cannot be changed)" : ""}</span>
              </label>
              <input
                style={inputStyle}
                type={key === "password" ? "password" : "text"}
                name={key}
                value={formData[key as keyof typeof formData]}
                disabled={!editMode || key === "username"}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* EDIT / SAVE BUTTONS */}
          <div style={{ marginTop: "1.5vw" }}>
            {!editMode ? (
              <button style={buttonStyle} onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  style={{ ...buttonStyle, borderColor: "#1b5e20" }}
                  onClick={() => {
                    setEditMode(false);
                    updateUserInfo();
                  }}
                >
                  Save
                </button>
                <button
                  style={{ ...buttonStyle, borderColor: "#b71c1c" }}
                  onClick={() => {
                    setFormData(originalData);
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* TASKS CARD */}
        <motion.div style={cardStyle} whileHover={{ scale: 1.02 }}>
          <h3 style={{ fontSize: "1.6vw", marginBottom: "1vw" }}>Defined Tasks</h3>

          {tasks.map((task, i) => (
            <motion.div
              key={i}
              style={{
                margin: "1vw 0",
                background: "#fafafa",
                padding: "1vw",
                borderRadius: "0.5vw",
                borderLeft: `0.6vw solid ${statusColor(task.status)}`,
                display: "flex",
                justifyContent: "space-between",
              }}
              whileHover={{ scale: 1.01 }}
            >
              <span style={{ fontSize: "1.2vw", color: "black" }}>{task.title}</span>
              <span
                style={{
                  fontSize: "1vw",
                  fontWeight: "bold",
                  color: statusColor(task.status),
                }}
              >
                {task.status}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* FOOTER BUTTONS */}
      <div style={{ textAlign: "center", marginTop: "3vw" }}>
        <button style={buttonStyle}>Privacy and Policies</button>
        <button style={buttonStyle}>Data Retention Summary</button>
      </div>
      <CustomAlert message={alertMessage} isOpen={isAlertOpen} onClose={closeAlert} />
    </motion.div>
  );
}
