import React from "react";
import "./InProgress.css";

function InProgress({
  socket,
  open,
  setOpen,
  inProcess,
  setInProcess,
  completed,
  setCompleted,
}) {
  async function moveTask(e) {
    let id = e.target.dataset.id;
    let arr;
    for (let i of inProcess) {
      if (i[0] == id) {
        arr = i;
        break;
      }
    }
    let open1 = inProcess.filter((open) => open[0] != id);
    setInProcess([...open1]);
    setCompleted([...completed, arr]);
    await socket.emit("send", {
      open,
      inProcess: [...open1],
      completed: [...completed, arr],
    });
  }
  async function moveBack(e) {
    let id = e.target.dataset.id;
    let arr;
    for (let i of inProcess) {
      if (i[0] == id) {
        arr = i;
        break;
      }
    }
    let open1 = inProcess.filter((open) => open[0] != id);
    setInProcess([...open1]);
    setOpen([...open, arr]);
    await socket.emit("send", {
      open: [...open, arr],
      inProcess: [...open1],
      completed,
    });
  }
  return (
    <div className="inprocess">
      <header>InProgress</header>
      <div>
        {inProcess.length > 0 &&
          inProcess.map((data) => (
            <div className="task2">
              <button data-id={data[0]} onClick={moveBack}>
                Back
              </button>
              {data[1]}
              <button data-id={data[0]} onClick={moveTask}>
                next
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default InProgress;
