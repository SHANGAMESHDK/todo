import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AnimatePresence, motion } from "framer-motion" ;
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { firestore } from './firebase';
import './todo.css';
import AxiosInstance from './components/AxiosInstance';

function Abc() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  const fetchTasks = async () => {
    const newone = await getDocs(collection(firestore, "tasks"));
    const tasks = newone.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setToDo(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask) {
      const newEntry = {
        title: newTask,
        
      };
      await addDoc(collection(firestore, "tasks"), newEntry);
      setNewTask('');
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(firestore, "tasks", id));
    fetchTasks();
  };

  const markDone = async (id, currentStatus) => {
    await updateDoc(doc(firestore, "tasks", id), {
      status: !currentStatus
    });
    fetchTasks();
  };

  const cancelUpdate = () => {
    setUpdateData('');
  };

  const changeTask = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  const updateTask = async () => {
    await updateDoc(doc(firestore, "tasks", updateData.id), {
      title: updateData.title
    });
    setUpdateData('');
    fetchTasks();
  };

  const logoutUser = async () => {
      
      const response = await AxiosInstance.post('logoutall/');
      console.log('Logout response:', response.data);
      window.location.href = 'https://todo000.netlify.app/';
  };

  return (
    <div className="container App">
      <br />
      <h1>TO-DO List</h1>
      <br />
      <div className="col-auto">
              <motion.button 
                whileHover={{ scale: 1.1 } }  
                whileTap={{ scale: 0.9 } } 
                className="btn btn-lg btn-success" 
                onClick={logoutUser}>
                Logout
              </motion.button>
            </div>
      
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
              <br/><br/>
              <motion.input
                whileHover={{ scale: 1.02 } }
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg "
                placeholder='Enter a Task....'
              />
            </div>
            <div className="col-auto">
              <br/><br/>
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
                    whileTap={{ scale: 0.7 } } 
                    onClick={() => markDone(task.id)} 
                    title="Completed / Not Completed">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </motion.span>

                  {!task.status && (
                    <motion.span
                      whileHover={{ scale: 1.3 } }  
                      whileTap={{ scale: 0.7 } }
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
                    whileTap={{ scale: 0.7 } }
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

function Home() {


  const logoutUser = async () => {
    
      const response = await AxiosInstance.post('logoutall/');
      console.log('Logout response:', response.data);
      window.location.href = 'http://localhost:5173/ ';
  };

  return (
    <div className={"myBackground"}> 
      <Box className={"whiteBox"}>
    
                    
        <Box className={"title"} fontSize={40} justifyContent={'center'} textAlign={'center'}  >Successfully Loged In </Box>
        <Box className={"logout_item"} padding={13}>
        
          <Button type="submit" variant="contained" className={"aButton"} onClick={logoutUser}>Logout</Button>
        </Box>
      </Box>
    </div>
    
  )
}
export default Abc;
