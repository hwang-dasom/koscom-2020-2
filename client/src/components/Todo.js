import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Todo({todos, completeTodo, removeTodo, handleClick}) {

    return todos.map((todo, index) => (
        <div
	    onClick={handleClick}
            className={todo.isComplete ? 
            'todo-row complete' : 
            'todo-row'} key={index}
        >
            <RiCloseCircleLine 
                onClick={() => removeTodo(todo.issue_code)}
                className='delete-icon'
            />

            <div key={todo.issue_code}
                        onClick={() => completeTodo(todo.issue_code)}>
                <div>종목코드 : {todo.issue_code}</div>
	    {/*<div>종목명   : {todo.name}</div>*/}
                <div>
                    현재가 ₩  :  {numberWithCommas(todo.price)}
                </div>
            </div>
        </div>
    ))
}

export default Todo;

