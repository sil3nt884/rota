import React from 'react';
import {TaskCard} from './componets/task'
import {TaskUpdate} from './componets/taskUpdate'
import {NavBar} from './componets/nav'




export default function  () {



  return <div>
    <NavBar></NavBar>
    <TaskCard/>
    <TaskUpdate/>
  </div>

}
