import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import {AnimatePresence, motion } from "framer-motion" ;

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  
  useEffect(() => {
    const savedTasks = localStorage.getItem('toDoList');
  if (savedTasks) {
    setToDo(JSON.parse(savedTasks));
  }
  }, []);
  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDo));
  }, [toDo]);

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
      <h1>TO-DO</h1>
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
              <motion.button
                whileHover={{ scale: 1.1 } }  
                whileTap={{ scale: 0.9 } } 
                className="btn btn-lg btn-success mr-2" 
                onClick={updateTask}>
                Update
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 } }  
                whileTap={{ scale: 0.9 } } 
                className="btn btn-lg btn-warning" 
                onClick={cancelUpdate}>
                Cancel
              </motion.button>
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
              <motion.button 
                whileHover={{ scale: 1.1 } }  
                whileTap={{ scale: 0.9 } } 
                className="btn btn-lg btn-success" 
                onClick={addTask}>
                Import Task
              </motion.button>
            </div>
          </div>
          <br />
        </>
      )}

      {/* Task List */}
      {toDo.length === 0 ? (
        <motion.h3 whileHover={{ scale: 1.3, y:20}}>💩💩💩</motion.h3>
      ) : (
        <AnimatePresence>
          {toDo  
            .sort((a, b) => a.id - b.id)
            .map((task, index) => (
              <motion.div 
                initial={{ opacity: 0, y: -70 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
                className="col taskBg" 
                key={task.id}>
                <div className={task.status ? 'done' : ''}>
                  <motion.span  whileHover={{ scale: 1.5 }} className="taskNumber">{index + 1}</motion.span>
                  <motion.span whileHover={{ scale: 0.97 }} className="taskText">{task.title}</motion.span>
                </div>

                <div className="iconsWrap">
                  <motion.span 
                    whileHover={{ scale: 1.3 } }  
                     
                    onClick={() => markDone(task.id)} 
                    title="Completed / Not Completed">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </motion.span>

                  {!task.status && (
                    <motion.span
                      whileHover={{ scale: 1.3 } }  
                      
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
                    </motion.span>
                  )}

                  <motion.span 
                    whileHover={{ scale: 1.3 } }  
                    
                    onClick={() => deleteTask(task.id)} 
                    title="Delete">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence> 
      )}
    </div>
  );
}

export default App;