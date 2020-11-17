import React, { useState, Fragment, useEffect } from 'react';
import SelectedItem from './Item';

const dev_key = 'l7xxa94785c403c148c1a1ababb7564992bb'

function TodoForm(props) {
    const [input, setInput] = useState([]);
	const [stockList, setStockList] = useState([]);
    const handleChange = e => {
        setInput(e.target.value);
    }

    useEffect(() => {
        fetch(`https://sandbox-apigw.koscom.co.kr/v2/market/stocks/kospi/lists?apikey=${dev_key}`)
        .then(response => {
            return response.json()
        })
        .then(responseJSON => {
            console.log('response:', responseJSON.isuLists);
            setStockList(responseJSON.isuLists)
        });
    },[]) 



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

    const filteredList = stockList.filter(stockList => 
        stockList.isuKorNm.includes(input)  
    )

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
                        list='stocks'
                    />
                    <datalist id='stocks'>
                    {
                        filteredList.map(stock => {
                        return (
                        <option value={'' + stock.isuSrtCd +' '+ stock.isuKorNm} />
                    )   
                    }
                    )
                    }
                    </datalist>
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
