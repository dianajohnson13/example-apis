import { useState } from 'react';

const signup = async (newUser) => {
    const resp = await fetch("/api/users", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    if (resp.ok) {
      return resp.json();
    } else {
      console.log(resp)
      throw new Error('something went wrong');
    }
}

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
    
  const handleTextInputChange = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case "name":
        setName(value); 
        break;
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
    signup({
      name,
      email,
      password
    }).then(res => {
      // accept and do something
      console.log(res)
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
      setError(error.message)
      setLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <h1>Sign Up</h1>
            <p>Please complete this form to create an account.</p>

            <div className="required">
              <label htmlFor="name"><b>Name</b></label>
              <br/>
              <input className="form-control" type="text" name="name" value={name || ""} required onChange={handleTextInputChange}/>
            </div>

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

            <div class="col-12">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading || !name.length || !email.length || !password.length}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            {/* temp error position */}
            {error && <p>{error}</p>} 
            {/* Already have an account? login */}
        </div>
    </form>
  );
}