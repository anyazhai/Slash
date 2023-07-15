import { createImageFromInitials } from './ProfileImage';

export default function Headerbar() {
    return (
        <div className="header-bar">
        <h1>Slash</h1>

        {/* <div className="profile-image">
            CS
        </div> */}

        <button className="btn btn-secondary">Logout</button>

        <div className="img-padding">
                <img
                    id="img-preview"
                    src={
                        // imgSrc.length <= 0 ?
                        createImageFromInitials(50, 'Chaithanya S', "#e34211")
                        // : imgSrc
                    }
                    alt="profile-pic"
                />
            </div>
        </div>

        
    );
}