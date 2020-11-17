import React, { useState, useEffect, useRef, Fragment, } from 'react';

function TodoForm(props) {
    const [input, setInput] = useState([]);

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            stockCode: Math.floor(Math.random() * 10000),
            stockName: input,
            stockValue: Math.floor(Math.random() * 100000),
        });
        
        setInput('');
    };

    return (
        <div>  
            <form className='todo-form' onSubmit={handleSubmit}>
                {
                    <Fragment>
                    <input 
                        type='text' 
                        placeholder='주식 종목명으로 검색하여 추가하세요'
                        value={input}
                        name='text'
                        className='todo-input'
                        onChange={handleChange}
                    />
                    <button className='todo-button'>
                        추가
                    </button>
                    </Fragment>
                }
            </form> 
        </div>
        
    );
}

export default TodoForm;
