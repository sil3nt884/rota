import React, {useEffect, useState} from 'react';
import { usePoll } from '../poller/poller'
import './updateTask.css'
export const AssigneeCreate = () =>{

  const sendForm = async (element) => {
    element.preventDefault()
    const name = document.getElementById('Name').value

    await fetch(`/createAssignee`,  {
        method: 'POST',
         body: JSON.stringify({
           name,
         }),
         headers: {
        'content-type': 'application/json'
      }})
    document.getElementsByTagName('form')[0].reset()
  }

  return (
    <div className={"createAssignee"}>
      <form id={"updateForm"}>
        <p>Create Assignee</p>
        <div>
          <label>Name:</label>
          <input id="Name" type="text" />
          <input onClick={sendForm} type="submit" />
        </div>
      </form>
    </div>
  )



}
