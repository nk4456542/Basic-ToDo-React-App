import React, { useRef, useState } from 'react';
import './App.css';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const inputTask = useRef(null);

  const addTask = () => {
    if (!todoList.includes(currentTask) && currentTask !== "") {
      setTodoList([...todoList, { task: currentTask, completed: false }]);
    }
    inputTask.current.value = "";
    setCurrentTask("");
  }

  const deleteTask = (taskToDelete) => {
    setTodoList(todoList.filter((item) => {
      return item.task !== taskToDelete;
    }));
  }

  return (
    <div className="App">
      <h1 style={{ color: "wheat" }}>To-Do List</h1>
      <div>
        <input
          ref={inputTask}
          onChange={(event) => { return setCurrentTask(event.target.value) }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              return addTask();
            }
          }}
          type="text"
          placeholder="Add Task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <hr />
      <div>
        <ul>
          {
            todoList.map((val, index) => {
              return (
                <div id="task" key={index}>
                  <li>{val.task}</li>
                  <button>Completed</button>
                  <button onClick={() => deleteTask(val.task)}>Delete</button>
                  {
                    val.completed ? (
                      <h1 style={{ color: "white" }}>Task Completed</h1>
                    ) : (
                        <h1 style={{ color: "white" }}>Task Not Completed</h1>
                      )
                  }
                </div>
              )
            })
          }
        </ul>
      </div>
    </div >
  );
}

export default App;
