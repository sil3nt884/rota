import './nav.css'
export const NavBar = () =>{

  let clickCount = 1

  const displayUpdate = async () => {
    const taskUpdate = document.getElementsByClassName("updateTask")[0]
    taskUpdate.style.display = "block"
    console.log('clickCount', clickCount)
    if(clickCount % 2 === 0) {
      taskUpdate.style.display = 'none'
    }
    clickCount++
  }

  return (
    <div>
      <nav>
        <ol>
          <li className="crumb"><a href="#">Home</a></li>
          <li className="crumb"><a href="#">Create Assignee</a></li>
          <li className="crumb"><a href="#">Create Task</a></li>
          <li className="crumb"><a onClick={displayUpdate} href="#">Update Task</a></li>
        </ol>
      </nav>
    </div>
  )
}
