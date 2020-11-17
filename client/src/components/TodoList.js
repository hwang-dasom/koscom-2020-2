import React, { Fragment, useState, useEffect, } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import axios from 'axios';
import Stocks from './Stocks';

import UserStockContext from './UserStockContext'
import userSelectedStockList from './userSelectedStockList'


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function TodoList(props) {
    const [todos, setTodos] = useState([]);
    const [summarys, setSummarys] = useState([]);
    const [evalPage, setEvalPage] = useState();
    
    useEffect(() => {
        axios({
	    method: 'post',
	    url: 'http://3.35.233.198:5000/get_stocks',
	    data: {
	        "username":localStorage.getItem("username")
	    }
	})
        .then(res => {
	    if(res.data.length != 0) {
		console.log('res.data : ', res.data);
                setTodos(res.data);
            }
        })
        .catch(error => alert(error))
    }, [todos.length]);

    useEffect(() => {
        todos.map(todo => {
            if(!UserStockContext.includes(todo.issue_code)) {
                UserStockContext.push(todo.issue_code);
            }
        })
        console.log('UserStockContext : ', UserStockContext);
    }, [todos]);

    useEffect(() => {
	var perSum = 0, perAvg = 0;
	
	for(var i=0; i< summarys.length; i++) {
	    if(userSelectedStockList.includes(summarys[i].issue_code)) {
                perSum += summarys[i].per; 
            }
        }
	perAvg = perSum/userSelectedStockList.length;
	console.log('perAvg : ', perAvg);

        const newPage = summarys.map(stock => {
            if(userSelectedStockList.includes(stock.issue_code)) {
		var optimalPrice = stock.eps * perAvg;
                return (
                    <Fragment>
                        <Stocks 
                            name={stock.name} 
                            issue_code={stock.issue_code}
			    price={numberWithCommas(stock.price)}
		            eps={stock.eps}
			    per={stock.per}
			    optimal={numberWithCommas(optimalPrice.toFixed(2))}
			    diff={stock.price-optimalPrice}
                        />
                     </Fragment>
                );
             }
         })
         setEvalPage( newPage );
    }, [summarys])

    const addTodo = todo => {
        if(!todo.name || /^\s*$/.test(todo.text)) {
            return;
        }

        const returnVal = axios({
	    method: 'post',
	    url: 'http://3.35.233.198:5000/add_stock',
	    data: {
	        "username": localStorage.getItem("username"),
		"stock": todo.issue_code,
	    }
	})

	console.log(returnVal);
        const newTodos = [todo, ...todos]
        setTodos(newTodos);
    }


    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.issue_code !== id) 

        const iindex = (element) => element === id
        UserStockContext.splice(UserStockContext.findIndex(iindex), 1);
        userSelectedStockList.splice(userSelectedStockList.findIndex(iindex), 1);

	handleClick();

        const returnVal = axios({
	    method: 'post',
	    url: 'http://3.35.233.198:5000/remove_stock',
	    data: {
	        "username": localStorage.getItem("username"),
		"stock": id
	    }
	})
	console.log('remove_stock : ', returnVal);

        setTodos(removeArr)
    }

    const completeTodo = id => {
        let updateTodos = todos.map(todo => {
            if (todo.issue_code === id) {
                todo.isComplete = !todo.isComplete
                if(todo.isComplete) {
                    if(!userSelectedStockList.includes(todo.issue_code)) {
                        userSelectedStockList.push(todo.issue_code);
			handleClick();
                    }
                }
                else if (!todo.isComplete) {
                    const iindex = (element) => element === todo.issue_code
                    userSelectedStockList.splice(userSelectedStockList.findIndex(iindex), 1);
	            handleClick();
                }
            }
            
            return todo;
        })
	console.log('completeTodo : ', localStorage.getItem("username"));
        setTodos(updateTodos);
    }

    const handleClick = e => {

	    console.log('handleClick event : ', e);
        
        const returnVal = axios({
	    method: 'post',
	    url: 'http://3.35.233.198:5000/get_summary',
	    data: {
	        "username": localStorage.getItem("username")
	    }
	})
	.then(
            res => {
                console.log('get summary :', res.data);
		setSummarys(res.data);
            }
	)
    }
    const clearTodo = todo => {
        userSelectedStockList.splice(0, userSelectedStockList.length);
        UserStockContext.splice(0, UserStockContext.length);
    }

    return (
        <Fragment>
            <div>
                <TodoForm onSubmit={addTodo}/>
                <div>
                    <Todo 
                        todos={todos}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
	                onClick={handleClick}
                    />
                </div>
            </div>
            <div>
                {userSelectedStockList.length > 0 ? (
		    <Fragment>
                    <div className='calc-button'>
                        How Much?
                    </div>
                        <Stocks 
                            name="종목명"
                            issue_code="종목번호"
			    price="현재주가"
		            eps="EPS"
			    per="PER"
			    optimal="산출(적정)주가"
			    diff="차이"
			/>
	             </Fragment>
                )
                :
		(
	           <div></div>
		)
                }
            </div>
            {
                evalPage
            }
        </Fragment>
    )
}

export default TodoList

