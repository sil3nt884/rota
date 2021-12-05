import './nav.css'
export const NavBar = () =>{

  let clickCount = 1
  let createClickCount =1
  let assigneeCreateCount = 1

  const displayUpdate = async () => {
    const taskUpdate = document.getElementsByClassName("updateTask")[0]
    taskUpdate.style.display = "block"
    if(clickCount % 2 === 0) {
      taskUpdate.style.display = 'none'
    }
    clickCount++
  }

  const displayCreate = async () => {
    const taskUpdate = document.getElementsByClassName("createTask")[0]
    taskUpdate.style.display = "block"
    if(createClickCount % 2 === 0) {
      taskUpdate.style.display = 'none'
    }
    createClickCount++
  }

  const displayAssigneeCreate = async () => {
    const taskUpdate = document.getElementsByClassName("createAssignee")[0]
    taskUpdate.style.display = "block"
    if(createClickCount % 2 === 0) {
      taskUpdate.style.display = 'none'
    }
    createClickCount++
  }


  return (
    <div>
      <nav>
        <ol>
          <li className="crumb"><a href="#">Home</a></li>
          <li className="crumb"><a href="#" onClick={displayAssigneeCreate}>Create Assignee</a></li>
          <li className="crumb"><a onClick={displayCreate} href="#">Create Task</a></li>
          <li className="crumb"><a onClick={displayUpdate} href="#">Update Task</a></li>
          <li className="crumb"><a onClick={displayUpdate} href="#">Update Task</a></li>
        </ol>
      </nav>
    </div>
  )
}
