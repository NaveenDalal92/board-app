import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Open from "./Open";
import InProgress from "./InProgress";
import Completed from "./Completed";

const socket = io.connect("http://localhost:3001");

function App() {
  const [open, setOpen] = useState([]);
  const [inProcess, setInProcess] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    socket.emit("join", { room: 1 });
  }, []);

  useEffect(() => {
    socket.on(
      "update",
      (data) => {
        if (data.open.length > 0) {
          setOpen(data.open);
        } else {
          setOpen([]);
        }
        if (data.inProcess.length > 0) {
          setInProcess(data.inProcess);
        } else {
          setInProcess([]);
        }
        if (data.completed.length > 0) {
          setCompleted(data.completed);
        } else {
          setCompleted([]);
        }
      },
      [socket]
    );
  });

  return (
    <div className="head">
      <header>RoomName</header>
      <div className="tasks">
        <Open
          socket={socket}
          open={open}
          setOpen={setOpen}
          inProcess={inProcess}
          setInProcess={setInProcess}
          completed={completed}
        ></Open>
        <InProgress
          socket={socket}
          open={open}
          setOpen={setOpen}
          inProcess={inProcess}
          setInProcess={setInProcess}
          completed={completed}
          setCompleted={setCompleted}
        ></InProgress>
        <Completed
          socket={socket}
          open={open}
          completed={completed}
          setCompleted={setCompleted}
          inProcess={inProcess}
          setInProcess={setInProcess}
        ></Completed>
      </div>
    </div>
  );
}

export default App;
