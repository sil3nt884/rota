import React, {useEffect, useState} from 'react';
import { usePoll } from '../poller/poller'
import './updateTask.css'
export const TaskCreate = () =>{

  const sendForm = async (element) => {
    element.preventDefault()
    const title = document.getElementById('Title').value
    const description = document.getElementById("Description").value;

    await fetch(`/createTask/`,  {
        method: 'POST',
         body: JSON.stringify({
           title,
           description
         }),
         headers: {
        'content-type': 'application/json'
      }})
    document.getElementsByTagName('form')[0].reset()
  }

  return (
    <div className={"createTask"}>
      <form id={"updateForm"}>
        <p>Create Task</p>
        <div>
          <label>Title:</label>
          <input id="Title" type="text" />
        </div>
        <div>
          <label>Description:</label>
          <input id="Description" type="text" />
          <input onClick={sendForm} type="submit" />
        </div>
      </form>
    </div>
  )



}
