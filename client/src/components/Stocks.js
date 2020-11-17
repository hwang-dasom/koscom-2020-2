import React from 'react'
import '../Stocks.css'

const Stocks = ({ name, issue_code, price, eps, per, optimal, diff }) => {
	console.log(typeof(diff));
	if(typeof(diff) === 'string') {
            diff = 0;
	}
    return (
        <div className='stock-container'>
            <div className='stock-row'>
                <div className='stock'>
                    <h1>{name}</h1>
                </div>
                <div className='stock-data'>
                    <p className='stock-volume'>{issue_code}</p>
                    <p className='stock-volume'>₩ {price}</p>
                    <p className='stock-volume'>₩ {optimal}</p>
                    {
                       (diff > 0) ?  (
                            <p className='stock-volume red'>{diff.toFixed(2)}</p>
		       ) : (
                            <p className='stock-volume green'>{diff.toFixed(2)}</p>
		       )
		    }
	            <p className='stock-volume'>{eps}</p>
	            <p className='stock-volume'>{per}</p>
                </div>
            </div>
        </div>
    )
}

export default Stocks;

