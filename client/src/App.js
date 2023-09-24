import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();

    console.log(todos);
  }, []);

  const fetchTodos = async () => {
    fetch(`${API_BASE_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(`${API_BASE_URL}/todo/update/${id}`, {
      method: "PUT",
    }).then((res) => res.json());

    setTodos(
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.completed = data.completed;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(`${API_BASE_URL}/todo/delete/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    setTodos(todos.filter((todo) => todo._id !== data._id));
  };

  const addTodo = async () => {
    const data = await fetch(`${API_BASE_URL}/todo/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodo }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setNewTodo("");
    setPopupActive(false);
  }

  return (
    <div className="App">
      <h1>Welcome, Waleed</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.completed ? "is-complete" : "")}
            key={todo._id}
          >
            <div
              className="checkbox"
              onClick={() => completeTodo(todo._id)}
            ></div>
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              x
            </div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
     


      { popupActive ? (

<div className="popup">
<div className="closePopup" onClick={() => setPopupActive(false)}> x
</div>
<div className="content">
<h3>Add Task</h3>
<input type="text" className="addTodoInput" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
<div className="button" onClick={() =>addTodo()}>Create Task</div>
</div>
</div>


) : " "
}









    </div>
  
  );}

export default App;
        