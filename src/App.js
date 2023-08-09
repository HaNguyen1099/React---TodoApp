import React, {useState, useEffect} from 'react'
import "./App.css"
import {TodoList} from './components/TodoList';

const getLocalStrorage = () => {
  let todos = localStorage.getItem("todos");
  if(todos) {
    return (todos = JSON.parse(localStorage.getItem("todos")))
  } 
  else {
    return [];
  }
};

function App() {
  const [todos, setTodos] = useState(getLocalStrorage());
  const [input, setInput] = useState('');
  const [editID, setEditID] = useState(0);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editID) {
      const edit = todos.find((todo) => todo.id === editID);
      updateTodo(editID, input);
      setEditID(0);
      setInput("");
      return;
    }
    if(input) {
      addTodo(input);
      setInput('');
    }
    else {
      alert("You must write something!");
    }
  };

  const updateTodo = (ID, text) => {
    const edited = todos.map((todo) => todo.id === ID ? (todo = {id:ID, text}) : {id:todo.id, text:todo.text});
    setTodos(edited);
  }

  const addTodo = (text) => {
    let id = 1;
    if(todos.length > 0) {
      id = todos[0].id + 1;
    }
    let todo = {id: id, text: text};
    setTodos([todo, ...todos]);
  }

  const editTodo = (id) => {
    const edit = todos.find((todo) => todo.id === id);
    setInput(edit.text);
    setEditID(id);
  }

  const removeTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const clearTodos = () => {
    setTodos([]);
  }

  return (
    <div className="todo-app">
      <h2>Todo App</h2>
      <form className='todo' onSubmit={handleSubmit}>
        <input className='todo-ip' type="text" value={input} placeholder='Add a new task :>' onChange={e => setInput(e.target.value)}/>
        <button className='todo-button' type='submit'> {editID ? "OK" : "Add"} </button>
      </form>
      <div className='Items'>
        {todos.map((todo) => {
          return ( 
            <TodoList todo = {todo} key = {todo.id} editTodo = {editTodo} removeTodo = {removeTodo}/>
          )
        })}
      </div>
      <footer>
          <p className="count">You have {todos.length} tasks to do.</p>
          <button className="clear" onClick={() => clearTodos()}> Clear All </button>
        </footer>
    </div>
  );
}

export default App;