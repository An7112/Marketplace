import React, {Component} from 'react';
// import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import axios from 'axios';
// const FormData = require("form-data");
class Create extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.state = {
            name: '',
            price:''
        }
        
    }
    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }
    onChangePrice(event) {
        this.setState({
            price: event.target.value
        });
    }
    render() {
    return (
        <div id="content">
            <h2>Create Product</h2>
            <hr />
             
            <form onSubmit={(event) => {
                event.preventDefault()
                const createP = {
                    name: this.state.name,
                    price: this.state.price,
                };
                axios.post('http://localhost:4000/createProducts/add', createP)
                .then(res => console.log(res.data));
                this.setState({
                    name: '',
                    price:'',
                })
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
                id="productName"
                type="text"
                ref={(input) => { this.productName = input }}
                className="form-control"
                placeholder="Product Name"
                value={this.state.name}
                onChange={this.onChangeName}
                required />
          </div>
          <div className="form-group mr-sm-2">
            <input
                id="productPrice"
                type="text"
                ref={(input) => { this.productPrice = input }}
                className="form-control"
                placeholder="Product Price"
                value={this.state.price}
                onChange={this.onChangePrice}
                required />
          </div>
          
          <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
        </div>
    );
    }
}

export default Create;
