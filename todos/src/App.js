/*
1-lista sencilla de todos, marcar los completados (chekbox), contar los completados, delete the completeds, 
and make it persistent to browser refresh and stuff (this is already finish)

2-put some css to this piece of s***

3-separate all the notes by date, make a filter for date, words. Put some notifications to older uncomplete task, idk, be creative u stupid


*/ 
import React, { useRef } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4 } from 'uuid';
import useLocalStorage from './useLocalStorage'

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  const [todos, setTodos] = useLocalStorage(LOCAL_STORAGE_KEY, [])  
  const todoNameRef = useRef()
  const [name, setName] = useLocalStorage('name', '')
  
    function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = ! todo.complete
    setTodos(newTodos)
    }

  function handleAddTodo(e){

      const name = todoNameRef.current.value
      if (name === '')return    
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, complete: false }]
      }) 
      todoNameRef.current.value = null
    }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }  

return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
      <input ref ={todoNameRef} type = "text" value = {name} onChange = {e => setName (e.target.value)}  />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}> Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  
  )
}

export default App;
