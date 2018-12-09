import React, {Component} from 'react';
import axios from 'axios';

class Form extends Component{
    constructor(props){
        super(props)
        this.state ={
            name:"",
            price:"",
            image_url: "",
            currentProduct: "",
            button:"add"
        }
        this.addItem = this.addItem.bind(this);
    }
    
    componentDidUpdate(prevProps){
        console.log('compdidup',this.props.currentProduct[0])
        if (this.props.currentProduct[0]){
            let {name, price, image_url} = this.props.currentProduct[0]
            return prevProps !== this.props
            ? this.setState({
                name, price, image_url,
                currentProduct:this.props.currentProduct[0],
                button: "edit"})
            :null}
    }

    addItem(){
        const {name, price, image_url} = this.state
        const item ={
            name: name,
            price: price,
            image_url: image_url
        }
        console.log('item',item)
        axios.post('/api/inventory',item)
        .then(this.setState({
            name: "",
            price: "",
            image_url:"",
            currentProduct: ""
        })).then(this.props.getInventory)
    }
    editItem = () => {
        const {name, price, image_url} = this.state;
        const {id} = this.props.currentProduct[0];
        const item = {id, name, price, image_url}
        axios.put(`api/inventory/${id}`,item)
        .then(this.setState({
            name:"",
            price:"",
            image_url: "",
            currentProduct: ""
        })).then(this.props.getInventory())
    }
    cancelItem(){
        this.setState({
            name: "",
            price: "",
            image_url: "",
            button: 'add'
        })
    }

    render(){
        console.log('formrender',this.state)
        // app.post
        return(
            <div>Form
                <div>Name:
                    <input value={this.state.name} onChange={event =>{this.setState({name:event.target.value})}}/>
                </div>
                <div>Price:
                    <input value={this.state.price} onChange={event =>{this.setState({price:event.target.value})}}/>
                </div>
                <div>Image URL:
                    <input value={this.state.image_url} onChange={event =>{this.setState({image_url:event.target.value})}}/>
                </div>
                <div>
                    <button onClick={()=>this.cancelItem()}>Cancel</button>
                    <button onClick={
                        this.state.button ==='add'
                        ?()=>this.addItem()
                        :()=>this.editItem()}
                        >{this.state.button}
                    </button>
                </div>
            </div>
        )
    }

}

export default Form;