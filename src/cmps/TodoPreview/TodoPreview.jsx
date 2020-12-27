import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import './TodoPreview.css';

export function TodoPreview(props) {

    const {desc,isDone,_id} = props.todo


    function handleChange(){
        let todoToUpdate = {...props.todo}
        todoToUpdate.isDone = !isDone
        props.updateTodo(todoToUpdate)
    }

    return (

        <div className={`todo-preview flex align-center space-between ${isDone? 'done-todo' : ''}`} key={props.idx}>
            <div className="todo-desc">{desc}</div>
            <div className="todo-actions flex align-center">
                <div className="todo-remove" onClick={()=>props.handleClickOpen(_id)}>
                    <i className="far fa-trash-alt"></i>  
                </div>    
                <div className="todo-status">
                    <Checkbox checked={isDone} onChange={handleChange}/>
                </div>
            </div>
        </div>
    )
}



