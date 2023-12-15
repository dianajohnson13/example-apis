import { useContext, useState, useEffect } from "react";
import { UserContext } from "../containers/UserFetcher";
import { getUserTasks, createTask } from "../api/Tasks";

export default function Dashboard() {
    const { user } = useContext(UserContext);

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({title:"", description: ""});

    const onAdd = (event) => {
      event.preventDefault();
      createTask(newTask).then((task) => {
        setTasks([...tasks, task])
        clearState();
      })
      .catch(error => {
        console.log(error.error);
      });
    }

    useEffect(() => {
      getUserTasks()
          .then((data) => {
             setTasks(data.tasks);
          })
          .catch((error) => {
              console.error(error)
          });
    }, [])

    const clearState = () => {
      setNewTask({title:"", description: ""});
    }
      
    const handleTextInputChange = (event) => {
      const { value, name } = event.target;
  
      switch (name) {
        case "task-title":
          setNewTask({...newTask, title: value});
          break;
        // case "task-description":
        //   setNewTask({...newTask, description: value});
      }
    }

    return user ? (
      <div>
          <h1 className="m-4 text-center">{user.name ? `Welcome ${user.name}!` : "Welcome!"}</h1>
      
          <div className="container mb-4">
          <h2>Add a New Task</h2>
            <form className="container" onSubmit={onAdd}>
            <label htmlFor="task-title"><b>Task</b></label>
                  <br/>
              <div className="row">
                <div className="col">

                  <input className="form-control" type="text" name="task-title" value={newTask.title || ""} required onChange={handleTextInputChange} />
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary" role="submit">Add</button>
                </div>
              </div>
            </form>
          </div>

          <div className="container">
              <h2>My Tasks</h2>
              {tasks.length === 0 ? <p>You don't have any tasks</p> : (

                tasks.map(task => {
                  return (
                    <div className="container">
                        <div className="list-group  mt-3 p-2 shadow">
                          <strong>{task.title}</strong>
                          <p>{task.description}</p>
                        </div>
                      </div>
                  );
                })
              )}
          </div>
      </div>
    ) : null;
  }