export default function DeveloperSettings() {
    return (
        <>
            <h5 className="mb-0 mt-5">Developer Settings</h5>
            <div className="list-group mb-5 mt-4 shadow">
                <div className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-2">API Key</strong>
                            <p className="text-muted mb-0">Generate an API Key to use our API as a developer</p>
                        </div>
                        <div className="col-auto">
                            <div className="custom-control custom-switch">
                                <button className="btn btn-primary btn-sm">Generate</button>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    );
}