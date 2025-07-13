'use client';
import React, { useState } from 'react'; // Import useState from React
import UpdateUser from '../update-user/[id]/page';

const TodoList = () => {
  //const [counter, setCounter] = useState(0); // Correctly use useState
  const [taskList, setTaskList] = useState([]);
  const addNewTask = (e) => {
    if (e.code === 'Enter') {
     // console.log(e.target.value);

      const newTask = { text: e.target.value , complete : false};
      setTaskList([newTask, ...taskList]);
      e.target.value='';
    }
  };
  const deleteTask = (index) => {
    //console.log(index);

    const temp = taskList;
    temp.splice(index, 1);
    setTaskList([...temp]);
  }
  const UpdateUser = (index) => {
    //console.log(index);
    const temp=taskList;
    temp[index].complete = !temp[index].complete;
    setTaskList([...temp]);
  };

  return (
    <div className='min-h-screen bg-violet-300 py-10'>
        <h1 className='text-center font-bold text-3xl mt-5'>Todo list</h1>
        <div className='container mx-auto bg-white rounded-2xl'>
           <div className='p-5 border-2 border-violet-900 rounded-lg'>
           <input 
  type='text' 
  placeholder='Add new task' 
  className='w-full p-2 border border-gray-300 rounded' 
  onKeyDown={addNewTask} 
/>
           </div>
           <div></div>
        </div>
        <div className='p-5 border-2 border-violet-900 rounded-lg mt-5'>
          <h1 className='text-2xl font-bold mb-5'>Tasks</h1>{
            taskList.map((task,index)=>{
              return(
                <div key={index}className='border p-3 rounded-2xl mb-4'>
                  {task.complete ?<p>complete</p>:
                  <p>pending</p>}
                  <p className='text-xl'>{task.text}</p>
                 <div className='flex gap'><buttuon className='bg-violet-900 hover:bg-violet-400 active:bg-violet-300 text-white px-3 py-2 rounded-lg'onClick={()=>{deleteTask(index)}}>Delete</buttuon>
                 <button className={`${task.complete?'bg-red-700':'bg-amber-500'}`}
                  onClick={()=>{UpdateUser(index)}}>{task.complete?'undo':'Done'}</button></div>
                </div>
              )
            }

            )
          }
        </div>
    </div>
  );
};

export default TodoList;