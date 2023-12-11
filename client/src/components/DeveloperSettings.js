import { useContext, useState } from "react";
import { UserContext } from "../containers/UserFetcher";
import { generateAPIKey, deleteAPIKey } from "../api/Developers";

import {Button, Modal, Form } from 'react-bootstrap';

export default function DeveloperSettings() {
    const { user, setUser } = useContext(UserContext);
    const [apiKey, setAPIKey] = useState(); // only stores new API key
    const [modalOpen, setModalOpen] = useState(false);

    const apiKeyExists = user && user.clientId; // it was preveiously created

    const onGenerate = () => {
        generateAPIKey()
            .then(({ clientId, apiKey}) => {
                setUser({ ...user, clientId });
                setAPIKey(apiKey);
                setModalOpen(true);
            })
            .catch(error => {
                // To-Do: displayError
                console.log(error);
            })
    };

    const onErase = () => {
        deleteAPIKey(user.clientId)
            .then(() => {
                setUser({ ...user, clientId: undefined });
            })
            .catch(error => {
                // To-Do: displayError
                console.log(error);
            })
    };

    const handleModalClose = () => {
        setModalOpen(false);
    }

    return (
        <>
            <h5 className="mb-0 mt-5">Developer Settings</h5>
            <div className="list-group mb-5 mt-4 shadow">
                <div className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-2">API Key</strong>
                            <p className="text-muted mb-0 mt-1">
                                {user && user.clientId
                                    ?  (
                                        <>
                                            <strong>ClientId: </strong>
                                            <span>{user.clientId}</span>
                                        </>
                                    )
                                    : "Generate an API Key to use our API as a developer"
                                }
                            </p>
                        </div>
                        <div className="col-auto">
                            <div className="custom-control custom-switch">
                                <Button
                                    variant="secondary"
                                    onClick={!apiKeyExists ? onGenerate : onErase}
                                >
                                    {apiKeyExists ? "Erase" : "Generate"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>

            <ApiKeyModal
                apiKey={apiKey}
                clientId={user.clientId}
                show={modalOpen}
                handleClose={handleModalClose}
            />
        </>
    );
}

function ApiKeyModal({apiKey, clientId, handleClose, show = true}) {

    const copy = (event) => {
        const id = event.target.id;
        if (id === "copy-apiKey") {
            navigator.clipboard.writeText(apiKey);
            // alert("API Key copied!");
        } else if (id === "copy-clientId") {
            navigator.clipboard.writeText(clientId);
            // alert("ClientId copied!");
        }
    };

    return (

        <Modal show={show} >
          <Modal.Header >
            <Modal.Title>API Key Generated</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <p>Store your API key in a secure location. You will be able to retrieve it again.</p>
            <label htmlFor="apikey"><b>API Key</b></label>
            <div style={{display: "flex"}}>
                <Form.Control type="text" disabled
                    className="form-control"
                    value={apiKey}
                />
                <Button variant="secondary" onClick={copy} id="copy-apiKey">Copy</Button>
            </div>

            <label htmlFor="apikey"><b>ClientId</b></label>
            <div style={{display: "flex"}}>
                <Form.Control type="text" disabled
                    className="form-control"
                    value={clientId}
                />
                <Button variant="secondary" onClick={copy} id="copy-clientId">Copy</Button>
            </div>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>Close</Button>
            
          </Modal.Footer>
        </Modal>

    );
} 