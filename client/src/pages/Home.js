export default function Home() {
  return (
    <div>
<div className="mt-5 text-center">
          <h1>Welcome to Taskerly!</h1>
          <p className="w-50 mx-auto mt-3">Task Management Made Simple.<br/> Elevate Your Efficiency. Amplify Your Success.</p>
          <div className="mt-5">
          <a href="/signup"><button className="btn btn-secondary m-1">Sign Up</button></a>
          <a href="/login"><button className="btn btn-primary m-1">Log In</button></a>
          </div>
        </div>
    </div>
  );
}