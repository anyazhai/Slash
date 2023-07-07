import { useState, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";

import Task from "./Task"
import AddTask from "./AddTask";
import AddColumn from "./AddColumn";
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const TASK_URL = '/task'
export default function Column({column}){
    console.log(column)

    const [taskdata, setTaskdata] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [display, setDisplay] = useState(false)

    const onCardDrop = (dropResult) => {
        console.log("inside cardDrop" , dropResult)
    }

    const api = useAxios();
    const { user } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        api.get(
            TASK_URL + `?column_id=${column.id}`,
            {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access}`,
                },
            },
        )
        .then((response) => {
                setTaskdata(response.data.response);
                console.log(response.data.response);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
        });
    }, [user.access]);

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