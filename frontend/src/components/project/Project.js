import Headerbar from "../Headerbar";
import Topbar from "./Topbar";
import Column from "./Column";

export default function Project() {
    return (
        <div >

            <Headerbar />

            <div className="container">
                <h2 className="project-name">Project-name</h2>

                <Topbar />

                <section className="column-section">
                    <Column />
                    <Column />
                    <Column />
                    <button>Add column</button>
                </section>
            </div>
        </div>
    );
}