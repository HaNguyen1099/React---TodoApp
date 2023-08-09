import React from 'react';
import {BiSolidTrashAlt} from 'react-icons/bi';
import {BiEdit} from 'react-icons/bi';


export const TodoList = (props) => {
    const {todo, removeTodo, editTodo} = props;
    return (
        <div className='todoList'>
            {todo.text}
            <BiEdit className="edit" onClick={() => editTodo(todo.id)}/>
            <BiSolidTrashAlt className="trash" onClick={() => removeTodo(todo.id)}/>
        </div>
    );
}