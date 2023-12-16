import DeveloperSettings from '../components/DeveloperSettings';
import UserSettings from '../components/UserSettings';

export default function Settings() {
    return (
        <div className="col-lg-10 mx-auto">
            <h2 className="h3 mb-4 mt-4 page-title">Settings</h2>
            <hr />
            <div className="my-4">
            <UserSettings/>
            <DeveloperSettings />
            </div>
        </div>
    );
}