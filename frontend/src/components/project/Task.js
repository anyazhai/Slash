

export default function Task({task}){
    console.log(task)

    return (
        <div className="task">
            <h4>{task.name}</h4>
            <div className="task-type">{task.type}</div>
            <div className="priority">{task.priority}</div>
            {/* <div className="assigned-to">Asigned to</div> */}
        </div>
    )
}