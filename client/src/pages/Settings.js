
export default function Settings() {

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                    <h2 className="h3 mb-4 mt-4 page-title">Settings</h2>
                    <hr />
                    <div className="my-4">

                        <h5 className="mb-0 mt-4">My Profile</h5>
                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-sm-2 mb-1">
                                    <strong>Name</strong>
                                </div>
                                <div className="col-sm">
                                    My name
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2 mb-1">
                                    <strong>Email</strong>
                                </div>
                                <div className="col-sm">
                                    My email
                                </div>
                            </div>
                        </div>

                        <h5 className="mb-0 mt-5">Developer Settings</h5>
                        <div className="list-group mb-5 mt-4 shadow">
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <strong className="mb-2">Generate an API Key</strong>
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

                    
                    </div>
                </div>
            </div>
        </div>
    );
}