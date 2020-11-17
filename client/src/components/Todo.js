import React, { useState, } from 'react'
import TodoForm from './TodoForm'
//import { RiCloseCircleLine } from 'react-icons/ri'
//import { TiEdit } from 'react-icons/ti'

//import Card from 'react-bootstrap/lib/Card'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        selected: false,
    });

    const submitUpdate = value => {
        updateTodo(edit.stockCode, value)
        setEdit({
            id: null,
            value: '',
        })
    }

    console.log(todos);

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo, index) => (
        <div 
            className={todo.isComplete ? 
            'todo-row complete' : 
            'todo-row'} key={index}
        >
	    {/*
            <RiCloseCircleLine 
                onClick={() => removeTodo(todo.stockCode)}
                className='delete-icon'
            />
            <TiEdit 
                onClick={() => setEdit({ id: todo.stockCode, value: todo.stockName})}
                className='edit-icon'
            />
	    */}

	    {/*
            <Card.Body key={todo.stockCode}
                        onClick={() => completeTodo(todo.stockCode)}>
                <Card.Title>{todo.stockName} {todo.stockCode}</Card.Title>
                <Card.Text>
                    ₩ {numberWithCommas(todo.stockValue)}
                </Card.Text>
            </Card.Body>
	    */}
	    <h1>Todo</h1>
        </div>
    ))
}

export default Todo

