import React, { useState, useRef } from "react";
import "./Open.css";

function Open({ socket, open, setOpen, inProcess, setInProcess, completed }) {
  const [count, setCount] = useState(0);
  const data = useRef();
  function insertTask() {
    let task = data.current.value;
    if (task != "") {
      let num = count;
      setCount(count + 1);
      setOpen([...open, [num, task]]);
      socket.emit("send", {
        open: [...open, [count, task]],
        inProcess,
        completed,
        room: 1,
      });
      data.current.value = "";
    }
  }
  async function moveTask(e) {
    let id = Number(e.target.dataset.id);
    let arr;
    for (let i of open) {
      if (i[0] == id) {
        arr = i;
        break;
      }
    }
    let open1 = open.filter((data) => data[0] != id);
    setOpen([...open1]);
    setInProcess([...inProcess, arr]);
    await socket.emit("send", {
      open: [...open1],
      inProcess: [...inProcess, arr],
      completed,
    });
  }

  return (
    <div className="open">
      <header>Open</header>
      <div>
        {open.length > 0 &&
          open.map((open) => (
            <div className="task">
              {open[1]}
              <button data-id={open[0]} onClick={moveTask}>
                next
              </button>
            </div>
          ))}
      </div>
      <div className="input">
        <input type="text" ref={data} />
        <button onClick={insertTask}>Add Task</button>
      </div>
    </div>
  );
}

export default Open;
