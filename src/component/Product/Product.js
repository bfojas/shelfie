import React from 'react';

export default function Product(props){
    const {id, name, price, image_url} = props.product
    return(
        <div>
            <div>name : {name}</div>
            <div>price: {price}</div>
            <img src={image_url} alt="oops"/>
            <button onClick={()=>props.deleteInventory(id)}>Delete</button>
            <button onClick={()=>props.setCurrent(id)}>Edit</button>
            </div>)
}