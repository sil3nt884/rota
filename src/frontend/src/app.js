import React from 'react';
import {TaskCard} from './componets/task'
import {TaskUpdate} from './componets/taskUpdate'
import {NavBar} from './componets/nav'
import './app.css'
import {TaskCreate} from './componets/taskCreate';
import {AssigneeCreate} from './componets/assigneeCreate';
import useNotifications from './poller/useNotications';




export default function  () {
  useNotifications()
  return <div>
    <NavBar></NavBar>
    <AssigneeCreate/>
    <TaskCard/>
    <TaskCreate/>
    <TaskUpdate/>
  </div>

}

