import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form';
import Header from './component/Header/Header';
import Product from './component/Product/Product'
import axios from 'axios';

class App extends Component {
  constructor (){
    super()
    this.state = {
      inventoryList : [],
      currentId: null,
      currentProduct: []
    }
  }


  componentDidMount(){
    this.getInventory();
  }

  getInventory = () => {
    axios.get('/api/inventory').then((res) =>{
      console.log('appdata', res.data)
    this.setState({inventoryList: res.data,
    currentProduct: []})
    })
  }

  deleteInventory = (id)=>{
    axios.delete(`/api/inventory/${id}`)
    .then(()=>this.getInventory()
      // res =>{this.setState({inventoryList: res.data})}
      )
}
  setCurrent =(id) =>{
    console.log('current',this.state)
    let currentProduct = this.state.inventoryList.filter(val =>
      val.id === id
    )
    // console.log('current', this.state)
    this.setState ({
      currentProduct: currentProduct,
      currentId: id
    })
  }

  // updateInventory = (list) => {
  //   this.setState ({
  //     inventoryList: list
  //   })
  // }

  render() {
    

    return (
      <div className="App">
        <Dashboard 
          inventoryList={this.state.inventoryList} 
          getInventory={this.getInventory} 
          deleteInventory={this.deleteInventory}
          setCurrent={this.setCurrent}/>
        <Form currentProduct={this.state.currentProduct} 
          getInventory={this.getInventory}/>
        <Header />
      </div>
    );
  }
}

export default App;
