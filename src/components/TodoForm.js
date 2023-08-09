import React, {useState} from 'react';

export const TodoForm = ({addTodo}) => {
  const [ip, setIp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(ip) {
      addTodo(ip);
      setIp('');
    }
    else {
      alert("You must write something!");
    }
  };
  return (
    <form className='todo' onSubmit={handleSubmit}>
      <input className='todo-ip' type="text" value={ip} placeholder='Add a new task :>' onChange={e => setIp(e.target.value)}/>
      <button className='todo-button' type='submit'>Add</button>
    </form>
  );
}