import React, {useEffect, useState} from 'react';
import { usePoll } from '../poller/poller'
import './updateTask.css'
export const TaskUpdate = () =>{

  let { data }  = usePoll('/task', 1000)
  const  { assignedTask  , unassignedTask, done } = data
  let allTask = []
  if(assignedTask && unassignedTask) {
    allTask = [...assignedTask, ...unassignedTask, ...done]
  }

  const [taskId, setTaskId] = useState(undefined)


  function getBuffer(fileData) {
    return function(resolve) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileData);
      reader.onload = function() {
        const arrayBuffer = reader.result
        resolve(arrayBuffer);
      }
    }
  }


  function respondToVisibility(element, callback) {
    const options = {
      root: document.documentElement,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry.intersectionRatio > 0);
      });
    }, options);

    observer.observe(element);
  }



  const sendForm = async (element) => {
    element.preventDefault()
    const id = document.getElementById('id').value
    const state = document.getElementById("state").value;
    const assigneeID = document.getElementById("assignee").value;
    const image = document.getElementById("image").files
    const file = image[0]
    const body = {
      state,
      assigneeID,
    }
    const jsonString = JSON.stringify(body, null, 0)
    const textEncoded = new TextEncoder()
    let readFile
    let fileBytes = [0]
    if(file) {
      readFile = new Promise(getBuffer(file))
      fileBytes  = await readFile
    }
    const jsonByte = new Int8Array(textEncoded.encode(jsonString).buffer)
    const bytes  = [jsonByte.length,...jsonByte,new Int8Array(fileBytes)]
    await fetch(`/updateTask/${id}/`,  {
        method: 'PATCH',
         body: bytes,
         headers: {
        'content-type': 'application/octet-stream'
      }})
    document.getElementsByTagName('form')[0].reset()
  }

  const getTask = (element) => {
    const index = element.target.selectedIndex
    const options = element.target.options
    const value = options[index]
    setTaskId(value.value)
  }


  return (
    <div className={"updateTask"}>

      <form id={"updateForm"}>
        <p>Update Task</p>
        <div>
          <label>Task ID:</label>
          <select onLoad={getTask} onChange={getTask} id={"taskId"}>
            {allTask.length ? allTask.map(({id}) => {
              return <option id={'id'} value={id}> {id} </option>
            }): "...loading"}
          </select>
          {taskId ? allTask
            .filter(({id}) => id === taskId)
            .map(task => {
              return <div>
                <span>
                  <div>
                     <ul>
                        {Object.keys(task)
                          .map(e => {
                            return <li id={"id"}>{`${e}:${task[e]}`}</li>
                          })}
                     </ul>
                  </div>

                </span>
              </div>
            }): "no id selected"}
        </div>

        <div>
          <label>Assignee:</label>
          <input id="assignee" type="text" />

        </div>
        <div>
          <label>State:</label>
          <input id="state" type="text" />

        </div>
        <div>
          <label>Image:</label>
          <input id="image"  type="file" />
        </div>
        <div>
          <input onClick={sendForm} type="submit" />
        </div>
      </form>
    </div>
  )



}
