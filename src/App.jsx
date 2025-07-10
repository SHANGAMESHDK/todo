import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add Task
  const addTask = () => {
    if (newTask) {
      const num = toDo.length + 1;
      const newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  };

  // Delete Task
  const deleteTask = (id) => {
    const newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Mark as Done
  const markDone = (id) => {
    const newTasks = toDo.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setToDo(newTasks);
  };

  // Cancel Update
  const cancelUpdate = () => {
    setUpdateData('');
  };

  // Change Task
  const changeTask = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  // Update Task
  const updateTask = () => {
    const filtered = toDo.filter((task) => task.id !== updateData.id);
    setToDo([...filtered, updateData].sort((a, b) => a.id - b.id));
    setUpdateData('');
  };

  return (
    <div className="container App">
      <br />
      <h2>TO-DO</h2>
      <br />

      {/* Input Section */}
      {updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData.title}
                onChange={changeTask}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-success mr-2" onClick={updateTask}>
                Update
              </button>
              <button className="btn btn-lg btn-warning" onClick={cancelUpdate}>
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg "
                placeholder='Enter a Task....'
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-success" onClick={addTask}>
                Import Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}

      {/* Task List */}
      {toDo.length === 0 ? (
        <p>💩💩💩</p>
      ) : (
        toDo
          .sort((a, b) => a.id - b.id)
          .map((task, index) => (
            <div className="col taskBg" key={task.id}>
              <div className={task.status ? 'done' : ''}>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>

              <div className="iconsWrap">
                <span onClick={() => markDone(task.id)} title="Completed / Not Completed">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>

                {!task.status && (
                  <span
                    onClick={() =>
                      setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status,
                      })
                    }
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}

                <span onClick={() => deleteTask(task.id)} title="Delete">
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default App;
