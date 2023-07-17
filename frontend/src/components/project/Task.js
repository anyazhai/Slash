import { createImageFromInitials } from '../ProfileImage';

export default function Task({ task }) {
  return (
    <div className="task">
      <div className="task-flex">
        <h4>{task.name}</h4>
        <div className={`${task.priority}`}>{task.priority}</div>
      </div>
      <div className="task-type">{task.type}</div>
      {/* <div className="assigned-to">
                <img
                    id="img-preview"
                    src={createImageFromInitials(50, 'Chaithanya S', "#e34211")}
                    alt="profile-pic"
                />
            </div> */}
    </div>
  );
}
