import React, { useRef, useState } from 'react';
import './App.css';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const inputTask = useRef(null);

  const addTask = () => {
    if (!todoList.some((el) => { return el.task === currentTask }) && currentTask !== "") {
      setTodoList([...todoList, { task: currentTask, completed: false }]);
    }
    inputTask.current.value = "";
    setCurrentTask("");
  }

  const deleteTask = (taskToDelete) => {
    setTodoList(todoList.filter((taskObject) => {
      return taskObject.task !== taskToDelete;
    }));
  };

  const completeTask = (taskToComplete) => {
    setTodoList(
      todoList.map((taskObject) => {
        return taskObject.task === taskToComplete
          ? { task: taskToComplete, completed: true }
          : { task: taskObject.task, completed: taskObject.completed ? true : false }
      })
    );
  };

  return (
    <div className="App">
      <h1 style={{ color: "wheat" }}>To-Do List</h1>
      <div>
        <input
          ref={inputTask}
          onChange={(event) => { return setCurrentTask(event.target.value) }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTask();
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
                  <div id="btns">
                    <button onClick={() => completeTask(val.task)}>Completed</button>
                    <button onClick={() => deleteTask(val.task)}>Delete</button>
                    <div>
                      {
                        val.completed ? (
                          <div className="taskComplete" style={{ backgroundColor: "#00df6c", color: "black" }}>Task Completed</div>
                        ) : (
                            <div className="taskComplete">Task Not Completed</div>
                          )
                      }
                    </div>
                  </div>
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
