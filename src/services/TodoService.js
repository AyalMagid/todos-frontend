import HttpService from './HttpService'

export default {
    getTodos,
    getTodoById,
    addTodo,
    removeTodo,
    updateTodo
}

function getTodos() {
    return HttpService.get (`todo/`)
}

function getTodoById(id) {
    return HttpService.get (`todo/${id}`)
}

function addTodo(todo) {
    return HttpService.post(`todo/`, todo)
}

function removeTodo(todoId) {
    console.log(todoId)
    return HttpService.delete(`todo/`, todoId)
}

function updateTodo(todo) {
    return HttpService.put(`todo/`, todo)
}