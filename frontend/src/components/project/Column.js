import { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";

import Task from "./Task"
import AddTask from "./AddTask";
import useColumn from '../../hooks/useColumn';

import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const UPDATE_POS_URL = '/position/update/'

export default function Column({col}){
    const { user } = useAuth();
    const api = useAxios();
    // const {columndata, setColumndata} = useColumn();

    const [display, setDisplay] = useState(false)

    const [column, setColumn] = useState(col);


    function RemoveItemById(id, array) {
        return array.filter((item) => item.id !== id)
    }


    function handleColumnData(taskArray){
        setColumn((prevData) =>  ({
            ...prevData,
            tasks: taskArray
            }))
    }

    let handletask;
    function addColumndata(payload, index, taskArray=null){
        let newArray = [];

        if(taskArray !== null){
            handletask = [...taskArray]
        }
        else{
            handletask = [...column.tasks]
        }

        for(let i = 0; i< handletask.length; i++){
            if(i < index){
                newArray[i] = handletask[i]
            }
            else if( i >= index){
                newArray[i+1] = handletask[i]
            }
        }
        newArray[index] = payload;

        setColumn((prevData) =>  ({
            ...prevData,
            tasks: newArray
            }))

        try{
            const apiResponse = api.post(
                UPDATE_POS_URL,
                JSON.stringify({
                task: payload.id,
                column: column.id, 
                position: index + 1
                }),
                {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${user.access}`,
                },
                },
            );
            // window.location.reload();
            console.log(apiResponse)
        } catch (err) {
            console.log(err)
        }
    }

    let taskArray;
    const onCardDrop = (dropResult) => {
        
        if(dropResult.removedIndex !== null && dropResult.addedIndex !== null ){
            taskArray = RemoveItemById(dropResult.payload.id, column.tasks);
            addColumndata(dropResult.payload, dropResult.addedIndex, taskArray)
        }

        else{
            if(dropResult.removedIndex !== null){
                taskArray = RemoveItemById(dropResult.payload.id, column.tasks);
                handleColumnData(taskArray)
            }
            if(dropResult.addedIndex !== null){
                addColumndata(dropResult.payload, dropResult.addedIndex)
            }
        }


    }

    return (
        <div className="column-card">
            <div className="flex column-drag-handle">
                <button onClick={() => setDisplay(true)} className="btn-tertiary">+</button>
                {column && <h4 className="">{column.name}</h4>}
            </div>
            {
                column && 
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
            }
            

            {display && <AddTask id={column.id}/>}

        </div>
    )
}