import React, { Component} from 'react';
import Web3 from 'web3';
import Marketplace from '../ethereum/build/Marketplace.json';
import  Account  from './Account';
import Create from './CreateComponent';
import Products from './ListComponent';
import Header from './home/home';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactTable from "react-table";  
class Main extends Component {
    
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. Try using MetaMask!');
        }
    }

    async loadBlockchainData() {
        
        this.setState.loading = true;

        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const balance = await web3.eth.getBalance(accounts[0]);
        const marketplaceData = Marketplace.networks[networkId];

        if (marketplaceData) {
            const marketplace = new web3.eth.Contract(Marketplace.abi, marketplaceData.address);
            const productCount = await marketplace.methods.productCount().call();
            this.setState({ marketplace, productCount });

            for (let i=1; i<=this.state.productCount; i++) {
                const product = await marketplace.methods.products(i).call();
                this.setState({ products: [...this.state.products, product] });
            }
        } else {
            window.alert('Contract not deployed on given network!');
        }

        this.setState({ account: accounts[0], balance: balance,loading: false });
        
    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        axios.get('http://localhost:4000/purchaseProducts/purchaseAdd')
        .then(res => {
            this.setState({loading:false, products: res.data });
        });

    }
    // async checkBlock() {
    //     let block = await this.web3.eth.getBlock('latest');
    //     let number = block.number;
    //     console.log('Searching block ' + number);

    //     if (block != null && block.transactions != null) {
    //         for (let txHash of block.transactions) {
    //             let tx = await this.web3.eth.getTransaction(txHash);
    //             if (this.account == tx.to.toLowerCase()) {
    //                 console.log('Transaction found on block: ' + number);
    //                 console.log({account: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
    //             }
    //         }
    //     }
    // }
    createProduct(name, price) {
        this.setState({ loading: true })
        this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        })
      }
    
      purchaseProduct(id, price) {
        this.setState({ loading: true })
        this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        })
      }
    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            marketplace: '',
            productCount: 0,
            products: [],
            balance:0,
            loading: true,
            
        };
        
        this.createProduct = this.createProduct.bind(this);
        this.purchaseProduct = this.purchaseProduct.bind(this);
    }
    
    render() {
        let products;

        if (this.state.loading) {
            products = [];
        } else {
            products = this.state.products;
            console.log(products)
        }
        return (
            
            <div style={{width:'100%'}}>
                
                {/* <Account accounts={accounts} connect={() => wallet.connect()} /> */}
                <Router>
                    <view style={{width:'100%'}}>
                    <div className="container" style={{width:'180%'}} >
                        {/* <div><Header account={this.state.account} /></div> */}
                        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
                                <ul className="navbar-nav mr-auto" style={{width:'100%',backgroundColor:'dark'}}>
                                    <li className="nav-item">
                                        <Link to={'/create'} className="nav-link" style={{'font-size': '16px', color:'white', textAlign:'center'}}>Create</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/Buy'} className="nav-link" style={{'font-size': '16px', color:'white'}} >Buy product</Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link to={'/Profile'} className="nav-link" style={{'font-size': '16px', color:'white', textAlign:'center'}}>Profile</Link>
                                    </li>
                                    
                                </ul>
                                
                            </div>
                        </nav> <br/>
         <Switch>
         <Route exact path='/' component={ Header } ></Route>           
         <Route exact path='/create' component={ Create } ><Create createProduct={this.createProduct} /></Route>
         <Route exact path='/Buy'  component={ Products } ><Products products={products} purchaseProduct={this.purchaseProduct} /></Route>
         
         <Route path='/Profile' component={ Account} ><Account account={this.state.account} balance={this.state.balance} productCount={this.state.productCount}/></Route>
     </Switch>
                        
                    </div>
                    </view>
                </Router>
                
            </div>
            
        )
    }
}

export default Main;
