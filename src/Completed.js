import React from "react";
import "./Completed.css";

function Completed({
  socket,
  open,
  completed,
  setCompleted,
  inProcess,
  setInProcess,
}) {
  async function moveTask(e) {
    let id = e.target.dataset.id;
    let arr;
    for (let i of completed) {
      if (i[0] == id) {
        arr = i;
        break;
      }
    }
    let open1 = completed.filter((open) => open[0] != id);
    setCompleted([...open1]);
    setInProcess([...inProcess, arr]);
    await socket.emit("send", {
      open,
      inProcess: [...inProcess, arr],
      completed: [...open1],
    });
  }

  return (
    <div className="completed">
      <header>Completed</header>
      <div>
        {completed.length > 0 &&
          completed.map((data) => (
            <div className="task3">
              <button data-id={data[0]} onClick={moveTask}>
                Previous
              </button>
              {data[1]}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Completed;
