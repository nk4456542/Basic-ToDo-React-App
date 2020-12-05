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
          : { task: taskToComplete, completed: false }
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
                  <button onClick={() => completeTask(val.task)}>Completed</button>
                  <button onClick={() => deleteTask(val.task)}>Delete</button>
                  <div className="taskComplete">
                    {
                      val.completed ? (
                        <span>Task Completed</span>
                      ) : (
                          <span>Task Not Completed</span>
                        )
                    }
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
