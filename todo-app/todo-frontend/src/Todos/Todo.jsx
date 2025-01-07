import React from 'react';

const Todo = ({ todo, deleteTodo, completeTodo }) => {
    return (
      <>
        <span>{todo.text}</span>
        <button onClick={() => completeTodo(todo)}>Set as done</button>
        <button onClick={() => deleteTodo(todo)}>Delete</button>
      </>
    )
  }
  
export default Todo