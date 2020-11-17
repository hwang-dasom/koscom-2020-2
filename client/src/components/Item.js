import React from 'react'

const SelectedItem = ({code, name, marketcode}) =>{
    return (
        <div>
            <li>{name}, {code}, {marketcode}</li>
        </div>
    )
}

export default SelectedItem;