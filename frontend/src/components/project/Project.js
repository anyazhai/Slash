import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Draggable } from "react-smooth-dnd";

import Headerbar from "../Headerbar";
import Topbar from "./Topbar";
import Column from "./Column";
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const COLUMN_URL = '/column'
export default function Project() {
    const location = useLocation();
    const data = location.state.project.project;

    const api = useAxios();
    const { user } = useAuth();

    const [columndata, setColumndata] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        api.get(
            COLUMN_URL + `?board_id=${data.id}`,
            {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access}`,
                },
            },
        )
        .then((response) => {
                setColumndata(response.data.response);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
        });
    }, [user.access]);


    const onColumnDrop = (dropResult) => {
        console.log(dropResult)
    }

    return (
        <div >

            <Headerbar />

            <div className="container">
                <div className="background">
                    <h2 className="project-name">{data.name}</h2>

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
                                <Draggable key={column.id}>
                                    <Column column= {column}/>
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