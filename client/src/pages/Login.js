import { useState } from 'react';
import { storeAuth } from '../utils/Auth';

const login = async (user) => {
  const resp = await fetch("/api/auth/login", {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (resp.ok) {
    return resp.json().then(data => {
      storeAuth(data);
      return;
    });
  } else {
    return resp.json().then(data => {
      throw new Error(data.error || "Something went wrong");
    });
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

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
    }).then(() => {
      clearState();
      // reroute to appropriate page
    })
    .catch(error => {
      console.log(error)
      setPassword("");
      setError(error.message)
      setLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <h1>Log In</h1>
            <p>Please complete this form to log in to your account.</p>

            <div className="required">
              <label htmlFor="email"><b>Email</b></label>
              <br/>
              <input className="form-control" type="text" name="email" value={email || ""} required onChange={handleTextInputChange} />
            </div>

            <div className="required">
              <label htmlFor="password"><b>Password</b></label>
              <br/>
              <input className="form-control" type="password" name="password" value={password || ""} required onChange={handleTextInputChange} />
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading || !email.length || !password.length}
              >
                {loading ? "Loading..." : "Log In"}
              </button>
            </div>
            {/* temp error position */}
            {error && <p>{error}</p>} 
            {/* no account? sign up */}
        </div>
    </form>
  );
}