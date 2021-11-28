import React from 'react';
import {TaskCard} from './componets/task'
import {TaskUpdate} from './componets/taskUpdate'




export default function  () {

  const displayUpdate = () => {
    const taskUpdate = document.getElementsByClassName("updateTask")[0]
    taskUpdate.style.display = "block"
  }

  return <div>
    <button onClick={displayUpdate}>Update Task </button>
    <TaskCard/>
    <TaskUpdate/>
  </div>

}
