import React, { useState, useEffect } from "react";
import { TodoList } from '../../cmps/TodoList/TodoList';
import TodoService from '../../services/TodoService';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { motion } from 'framer-motion'
import MotionService from "../../services/MotionService";
import CircularProgress from '@material-ui/core/CircularProgress';
import './TodoApp.css';

const Transition = React.forwardRef(function Transition(propsT, ref) {
    return <Slide direction="up" ref={ref} {...propsT} />;
});

export function TodoApp(props) {

    const [todos, setTodos] = useState([]);
    const [todoToAdd, setTodoToAdd] = useState('');
    const [open, setOpen] = React.useState(false);
    const [todoIdToRemove, setTodoIdToRemove] = useState('');
    const [isLoaderOn, setLoaderOn] = useState(false);

    const handleClickOpen = (todoId) => {
      setOpen(true);
      setTodoIdToRemove(todoId)
    };
  
    const handleClose = (isApproved) => {
      setOpen(false);
      if (isApproved) {removeTodo(todoIdToRemove)}
    };

    useEffect(async () => {
        if (!todos.length) {
          setLoaderOn(true)
          const todosToUpdate = await TodoService.getTodos()
          if (todosToUpdate) setTodos(todosToUpdate)
        }
    }, []);

    useEffect(() => {
        if (todos.length) {
          setLoaderOn(false)
        }
    }, [todos]);

    async function addTodo(){
        setTodoToAdd('')
        let todo = {desc:todoToAdd, isDone:false}
        todo = await TodoService.addTodo(todo)
        if (!todo) return
        else {
            let updatedTodos = todos.slice()
            updatedTodos.push(todo)
            setTodos(updatedTodos)
        }
    }

    async function removeTodo(todoId){
       const todo = await TodoService.removeTodo({id:todoId})
       if (!todo) {
            let updatedTodos = todos.slice()
            updatedTodos = updatedTodos.filter(todo => todo._id !== todoId)
            setTodos(updatedTodos)
       } else return
    }

    async function updateTodo(todoToUpdate){
        const todo = await TodoService.updateTodo(todoToUpdate)
        console.log('ddd',todo)
        if (todo) {
            let updatedTodos = todos.slice()
            const idx = updatedTodos.findIndex(td => td._id === todo._id);
            updatedTodos.splice(idx, 1, todo);
            setTodos(updatedTodos)
        } else return
    }

    function handleChange({ target }) {
            setTodoToAdd(target.value)
    }

    return (
        <div className= "todo-app main-container">
            <div className="add-todo-container flex">
                <input className="add-input" type="text" placeholder="What do you have todo?" onChange={handleChange} value={todoToAdd}/>
                <div className="add-text" onClick={()=>addTodo()}><i class="fas fa-plus"></i> Add</div>
            </div>
            {(todos.length)?
            <div className="todos-container">
                <motion.div
                    initial="out"
                    exit="in"
                    animate="in"
                    variants={MotionService.getMotionStyle('pageVariants')}
                    transition={MotionService.getMotionStyle('pageTransition')}
                >
                    <TodoList todos={todos} handleClickOpen={handleClickOpen} updateTodo={updateTodo}/>
                </motion.div>
            </div>
            :
            (isLoaderOn)?
            <div className="loader">
                <CircularProgress />
            </div>
            :
            <div className="no-todos-text">You have nothing Todo!</div>
            }
                    {/* Modal */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to remove this task?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                        You will not be able to restore it
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleClose(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>handleClose(true)} color="primary">
                    Approve
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
