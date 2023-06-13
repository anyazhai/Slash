import Headerbar from "./Headerbar";
import {Link} from "react-router-dom"


export default function Dashboard() {
    return (
        <div >
            <Headerbar />

            <div className="project-section">
            
            <div className="flex">
                <h2>Your Projects</h2>
                <button className="btn">Create</button>
            </div>

            <section className="project-list">

                <Link to="/project">
                    <div className="project-cover-card">
                        <h3>Project name</h3>
                    </div>
                </Link>
                <div className="project-cover-card">
                    <h3>Project name</h3>
                </div>
                <div className="project-cover-card">
                    <h3>Project name</h3>
                </div>
            </section >
            
            
            </div>
            
        </div>
    );
}