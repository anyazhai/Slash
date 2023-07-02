import { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";

import Task from "./Task"
import AddTask from "./AddTask";
import AddColumn from "./AddColumn";

export default function Column({column}){
    console.log(column)

    const [taskdata, setTaskdata] = useState([])

    const [display, setDisplay] = useState(false)

    const onCardDrop = (dropResult) => {
        console.log("inside cardDrop" , dropResult)
    }

    return (
        <div className="column-card">
            <h4 className="column-drag-handle">{column.name}</h4>
                <Container
                    groupName="col"
                    onDrop={onCardDrop}
                    getChildPayload={index => taskdata[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                    // onDragStart={e => console.log("drag started", e)}
                    // onDragEnd={e => console.log("drag end", e)}
                    // onDragEnter={() => {
                    //   console.log("drag enter:", column.id);
                    // }}
                    // onDragLeave={() => {
                    //   console.log("drag leave:", column.id);
                    // }}
                    // onDropReady={p => console.log('Drop ready: ', p)}
                >
                    {
                        taskdata && taskdata.map((task) => {
                            return (
                                <Draggable>
                                    <Task />
                                </Draggable>
                            )
                        })
                    }
                
                </Container> 
            <button onClick={() => setDisplay(true)} className="add-task-btn">Add task</button>
            

            {display && <AddTask />}

        </div>
    )
}