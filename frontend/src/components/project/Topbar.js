export default function Topbar() {
  return (
    <div className="topbar">
      <ul>
        <li>Board</li>
        <li>List</li>
        <li>Settings</li>
      </ul>

      <div>
        <div className="shared-with inline-block">
          <div>
            CS
          </div>
          <div>
            +
          </div>
        </div>

        <button className="inline-block" id="filter">Filter</button>
      </div>
    </div>
  );
}
