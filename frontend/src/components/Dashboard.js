import Headerbar from "./Headerbar";
import ProjectCard from "./ProjectCard";

export default function Dashboard() {
    return (
        <div >
            <Headerbar />

            <div>
            <h2>Your Projects</h2>
            <button>Create</button>
            </div>
            <div>
                <ProjectCard />
            </div>
        </div>
    );
}