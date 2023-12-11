import { useState } from 'react';
import { signup } from '../api/Users';
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
    
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
    }).then(() => {
      setLoading(false);
      navigate("/login");
    })
    .catch(error => {
      console.log(error)
      setError(error.message)
      setLoading(false);
    });
  }

  return (
    <div>
    <form className='mt-5  py-4 px-5 shadow auth-form' onSubmit={handleSubmit}>
        <div>
            <h1>Sign Up</h1>
            <p>To get started, create your account</p>

            <div className="required mb-2">
              <label htmlFor="name"><b>Name</b></label>
              <br/>
              <input className="form-control" type="text" name="name" value={name || ""} required onChange={handleTextInputChange}/>
            </div>

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

            <div  className="auth-form-footer">
              <button
                className="btn btn-primary mt-4"
                type="submit"
                disabled={loading || !name.length || !email.length || !password.length}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            {/* temp error position */}
            {error && <p>{error}</p>} 
            <p className='mt-2'>Already have an account? <a href="/login">Log In</a></p>
        </div>
    </form>
    </div>
  );
}