import { useContext } from "react";
import { UserContext } from "../containers/UserFetcher";

export default function UserSettings() {
    const { user } = useContext(UserContext);

    return (
        <>
            <h5 className="mb-0 mt-4">My Profile</h5>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-sm-2 mb-1">
                        <strong>Name</strong>
                    </div>
                    <div className="col-sm">
                        {user.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2 mb-1">
                        <strong>Email</strong>
                    </div>
                    <div className="col-sm">
                        {user.email}
                    </div>
                </div>
            </div>
        </>
    );
}