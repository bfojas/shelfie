import React, {Component} from 'react';
import Product from '../Product/Product';
import axios from 'axios';

class Dashboard extends Component{
    constructor(props){
        super()
        this.state = {tests:[]}
    }


    
    render(){
        const displayProducts = this.props.inventoryList.map(val =>{
            return <div>
                <Product product={val} deleteInventory={this.props.deleteInventory} setCurrent={this.props.setCurrent}/>
                {/* <div>Name: {val.name}</div>
                <div>Price: {val.price}</div>
                <img src={val.image_url} alt="oops"/> */}
            </div>
        })
        return(
            <div>
            <div>Dashboard</div>
            <div>{displayProducts}</div>
            </div>
        )
    }

}

export default Dashboard;