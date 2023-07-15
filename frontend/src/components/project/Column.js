import { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";

import Task from "./Task"
import AddTask from "./AddTask";
export default function Column({column}){

    const [display, setDisplay] = useState(false)
    const [dragData, setDragdata] = useState({
        dragStartColumn: -1,
        dragEndColumn: -1,
    })

    const onCardDrop = (dropResult) => {
        console.log("Task: " , dropResult)
    }

    return (
        <div className="column-card">
            <h4 className="column-drag-handle">{column.name}</h4>
            <Container
                    groupName="col"
                    onDrop={onCardDrop}
                    getChildPayload={index => column.tasks[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                    // onDragStart={e => console.log("drag started", e)}
                    // onDragEnd={e => console.log("drag end ", e)}
                    // onDragEnter={() => {
                    //   console.log("drag enter: ", column.id);
                    // }}
                    // onDragLeave={() => {
                    //   console.log("drag leave: ", column.id);
                    // }}
                    // onDropReady={p => console.log('Drop ready: ', p)}
                >
                    {
                        column.tasks && column.tasks.map((task) => {
                            return (
                                <Draggable>
                                    <Task task = {task}/>
                                </Draggable>
                            )
                        })
                    }
                
                </Container> 
            <button onClick={() => setDisplay(true)} className="add-task-btn">Add task</button>
            

            {display && <AddTask id={column.id}/>}

        </div>
    )
}