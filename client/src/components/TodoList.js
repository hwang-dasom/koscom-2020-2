import React, { Fragment, useState, } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { Link } from 'react-router-dom';
//import { CardGroup } from 'react-bootstrap';

import UserStockContext from './UserStockContext'
import userSelectedStockList from './userSelectedStockList'


function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if(!todo.stockName || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos]
        UserStockContext.push(todo.stockCode);

        setTodos(newTodos)
        // console.log(todo, ...todos); => 이전의 todo (...todo) 
    }

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => 
            prev.map(item => 
                (item.stockCode === todoId ? newValue : item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.stockCode !== id) 

        const iindex = (element) => element === id
        UserStockContext.splice(UserStockContext.findIndex(iindex), 1);
        userSelectedStockList.splice(userSelectedStockList.findIndex(iindex), 1);

        console.log('removeTodo total Stock List : ', UserStockContext);
        console.log('removeTodo total selected Stock List : ', userSelectedStockList);

        setTodos(removeArr)
    }

    const completeTodo = id => {
        let updateTodos = todos.map(todo => {
            if (todo.stockCode === id) {
                todo.isComplete = !todo.isComplete
                if(todo.isComplete) {
                    if(!UserStockContext.includes(todo.stockCode)) {
                        UserStockContext.push(todo.stockCode);
                    }
                    if(!userSelectedStockList.includes(todo.stockCode)) {
                        userSelectedStockList.push(todo.stockCode);
                    }
                }
                else if (!todo.isComplete) {
                    const iindex = (element) => element === todo.stockCode
                    userSelectedStockList.splice(userSelectedStockList.findIndex(iindex), 1);
                }
            }

            console.log('completeTodo total Stock List : ', UserStockContext);
            console.log('completeTodo total selected Stock List : ', userSelectedStockList);
            
            return todo;
        })

        setTodos(updateTodos);
    }

    return (
        <Fragment>
            <div>
                <TodoForm onSubmit={addTodo}/>
	    {/*<CardGroup>*/}
                    <Todo 
                        todos={todos}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                    />
	    {/* </CardGroup> */}
            </div>
            <div>
                {userSelectedStockList.length > 1 ? (
                    <div>
                        <button className='calc-button' >
                            비교하기
                        </button>
                    </div>
                )
                :
                <div>

                </div>
                }                
            </div>
        </Fragment>
    )
}

export default TodoList

