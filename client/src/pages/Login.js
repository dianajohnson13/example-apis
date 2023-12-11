import { useState } from 'react';

import { login } from '../api/Auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const clearState = () => {
    setEmail("");
    setPassword("");
    setError("")
    setLoading(false);
  }
    
  const handleTextInputChange = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    login({
      email,
      password
    }).then((user) => {
      clearState();
      navigate(`/home/${user.userId}`);
    })
    .catch(error => {
      setPassword("");
      setError(error.message)
      setLoading(false);
    });
  }

  return (
    <div>
      <form className='mt-5 py-4 px-5 shadow auth-form' onSubmit={handleSubmit}>
              <h1>Log In</h1>
              <p>To get started, please log in</p>

              <div className="required mb-2">
                <label htmlFor="email"><b>Email</b></label>
                <br/>
                <input className="form-control" type="text" name="email" value={email || ""} required onChange={handleTextInputChange} />
              </div>

              <div className="required">
                <label htmlFor="password"><b>Password</b></label>
                <br/>
                <input className="form-control" type="password" name="password" value={password || ""} required onChange={handleTextInputChange} />
              </div>
              <div className="auth-form-footer">
                  <button
                    className="btn btn-primary mt-4"
                    type="submit"
                    disabled={loading || !email.length || !password.length}
                  >
                    {loading ? "Loading..." : "Log In"}
                  </button>
            </div>
              {/* temp error position */}
              {error && <p>{error}</p>} 
              <p className='mt-2'>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
}

{/* <Form.Control type="text" disabled
className="form-control"
value={clientId}
/>
<Button variant="secondary" onClick={copy} id="copy-clientId">Copy</Button> */}