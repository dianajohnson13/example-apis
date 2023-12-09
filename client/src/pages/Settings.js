import DeveloperSettings from '../components/DeveloperSettings';
import UserSettings from '../components/UserSettings';

export default function Settings() {
    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                <h2 className="h3 mb-4 mt-4 page-title">Settings</h2>
                <hr />
                <div className="my-4">
                <UserSettings/>
                <DeveloperSettings />
                </div>
            </div>
        </div>
    );
}