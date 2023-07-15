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
        if(dropResult.removedIndex !== null){
            console.log("Task: " , dropResult)
        }

        if(dropResult.addedIndex !== null)
            console.log("Task: " , dropResult)
    }

    return (
        <div className="column-card">
            <div className="flex column-drag-handle">
                <button onClick={() => setDisplay(true)} className="btn-tertiary">+</button>
                <h4 className="">{column.name}</h4>
            </div>
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

            {display && <AddTask id={column.id}/>}

        </div>
    )
}