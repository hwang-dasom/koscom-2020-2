import React from 'react'
import '../Stocks.css'

const Stocks = ({ name, issue_code, price, eps, per }) => {
    return (
        <div className='stock-container'>
            <div className='stock-row'>
                <div className='stock'>
                    <h1>{name}</h1>
                </div>
                <div className='stock-data'>
                    <p className='stock-price'>₩{price}원</p>
                    <p className='stock-volume'>{issue_code}</p>
	            <p className='coin-marketcap'>{eps}</p>
	            <p className='coin-marketcap'>{per}</p>
                    {/*priceChange === null ? 
                        console.log('null') : (
                        priceChange < 0 ? ( 
                            <p className='stock-percent green'>{priceChange.toFixed(2)}%</p> 
                            ) : ( 
                            <p className='stock-percent red'>{priceChange.toFixed(2)}%</p>
                            )
                        )
                    */}                    
                </div>
            </div>
        </div>
    )
}

export default Stocks;

