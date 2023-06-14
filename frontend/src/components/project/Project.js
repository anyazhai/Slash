import { useState } from "react";

import Headerbar from "../Headerbar";
import Topbar from "./Topbar";
import Column from "./Column";
import { Container, Draggable } from "react-smooth-dnd";

export default function Project() {
    const [columndata, setColumndata] = useState([
            {
                id: "column1",
                name: "column1"
            },
            {
                id: "column2",
                name: "column2"
            },
            {
                id: "column3",
                name: "column3"
            },
        ]
    )

    const onColumnDrop = (dropResult) => {
        console.log(dropResult)
    }

    return (
        <div >

            <Headerbar />

            <div className="container">
                <div className="background">
                    <h2 className="project-name">Project-name</h2>

                    <Topbar />
                </div>

                <section className="column-section">
                    <Container
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    getChildPayload={index => columndata[index]}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                    }} > 

                    {
                        columndata && columndata.map((column, index) => {
                            return (
                                <Draggable>
                                    <Column column_name = {column.name}/>
                                </Draggable>
                            )
                        })
                    }
                    
                    </Container>
                    
                    <button>Add column</button>
                </section>
            </div>
        </div>
    );
}