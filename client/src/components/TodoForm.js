import React, { useState, Fragment, } from 'react';

function TodoForm(props) {
    const [input, setInput] = useState([]);

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
	// 여기가 다솜누나 stockList 받을 곳
        props.onSubmit({
            id: Math.floor(Math.random() * 100000),
            name: input,
	    issue_code: input,
	    price: '000000',
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
