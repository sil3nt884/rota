import React, {useEffect} from 'react';
import { usePoll } from '../poller/poller'

export const TaskCard = () =>{

  let { data }  = usePoll('/task', 1000)
  const  { assignedTask  , unassignedTask } = data
  console.log(assignedTask, unassignedTask)
  return (
    <div>
      {assignedTask ? assignedTask.map(({title, description, state, assignee, image }) => {
        const imageSrc = `data:image/png;base64,${image}`
        return (
          <div>
            <p> Title:  {`${title}`}</p>
            <p> Description:  {`${description}`}</p>
            <p> state:  {`${state}`}</p>
            <p> assignee:  {`${assignee}`}</p>
            <img src={imageSrc}></img>
          </div>
        )
      }): "loading.."}
      {unassignedTask ? unassignedTask.map(({title, description, image, state, assignee }) => {
        const imageSrc = `data:image/png;base64,${image}`
        return (
          <div>
            <p> Title:  {`${title}`}</p>
            <p> Description:  {`${description}`}</p>
            <p> state:  {`${state}`}</p>
            <p> assignee:  {`${assignee}`}</p>
            <img src={imageSrc}></img>
          </div>
        )
      }): "loading..."}
    </div>
  )

}
