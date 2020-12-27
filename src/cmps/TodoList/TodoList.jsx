import React from "react";
import { TodoPreview } from '../TodoPreview/TodoPreview';
import './TodoList.css';

export function TodoList(props) {

    return (
        <div className= "todo-list">
           <div className="list-header flex space-between align-center">
             <div className="list-header-desc">Description</div>
             <div className="list-header-actions flex space-around align-center">
                <div className="list-header-remove"> Remove</div>
                <div className="list-header-status">Done<div>/Undone</div></div>
             </div>
           </div>
           {
             props.todos.map((todo,idx) => {
              //  return (<TodoPreview todo={todo} removeTodo={props.removeTodo} updateTodo={props.updateTodo} idx={idx}/>)
               return (<TodoPreview todo={todo} handleClickOpen={props.handleClickOpen} updateTodo={props.updateTodo} idx={idx}/>)
             })
           }
        </div>
    )
}