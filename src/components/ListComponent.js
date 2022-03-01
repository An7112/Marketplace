import QRCode from 'qrcode.react';
import React from 'react';
import {  Button, Badge, Card, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useState } from 'react';
import { FaEthereum } from "react-icons/fa";
import Search from './search';
import './ListComponent.css'
import Announcer from './announcer';
import axios from 'axios';
// import { db } from '../../server2/create.model';
const filterPosts = (products, query) => {
    if (!query) {
        return products;
    }

    return products.filter((product) => {
        const postName = product.name.toLowerCase();
        return postName.includes(query);
    });
};
const Products = (props) => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(props.products, searchQuery); 
    return (
        
        <div className='body' >
            <h3 style={{display:'flex', whiteSpace:'pre-wrap'}}>There are currently {''}<Announcer message={`${filteredPosts.length} products on the market`} /></h3>
            <hr />
            {/* {props.products.map((product, key) =>{ */}
        
                    <div className='Card'>
                        
                        <Search
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    
                    <div  className="row">
                        {filteredPosts.map((product, key) => (
                            
                            <Card className="col-md-3" style={{marginBottom:'20px',backgroundColor:'#006666', display:'flex', borderRight:'1px solid #6699FF' }}>
                                <Card.Body  key={key}>   
                            
                                    <Card.Title style={{'font-size': '16px', color:'white', textAlign:'center'}}>{product.id}</Card.Title>
                            
                                    <Card.Title style={{'font-size': '18px', textAlign:'center'}}>{product.name}</Card.Title>
                                    {/* <Card.Img  variant="top" src={img1} /> */}
                                    <Card.Header>{product.price/1000000000000000000 >= 50 ? <Card.Img  variant="top" src={img2} /> : <Card.Img  variant="top" src={img1} />}</Card.Header>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                <ListGroupItem style={{'font-size': '16px', color:'white', textAlign:'center',backgroundColor:'#006666'}}> {product.price/1000000000000000000 >= 50 ? <span style={{color:"yellow"}}>{product.price/1000000000000000000} <FaEthereum /></span> : <span >{product.price/1000000000000000000} <FaEthereum /></span>}</ListGroupItem>
                                <ListGroupItem style={{'font-size': '16px', color:'white', textAlign:'center',backgroundColor:'#006666', textAlign:'center'}}>
                                {/* {product.owner} */}
                                    <QRCode
                                        id='qr'
                                        value={product.owner}
                                        size={60}
                                        level={'H'}
                                        includeMargin={true}
                                        onClick={() => alert('ID: '+product.id + '\nProduct name: '+ product.name + '\nPrice: '+ product.price + '\nOwner: '+ product.owner )}
                                    />
                                </ListGroupItem>
                                <ListGroupItem style={{'font-size': '16px', color:'white', textAlign:'center',backgroundColor:'#006666', textAlign:'center'}}>{product.purchased
                                    ? <Badge pill variant='danger' >Sold</Badge>
                                    : <Button size='sm' variant='success' block
                                        name={product.id}
                                        value={product.price}
                                        onClick={(event) =>{
                                            event.preventDefault();
                                            props.purchaseProduct(product.id, product.price);
                                        }}                                       
                                    >Buy</Button>                               
                                }</ListGroupItem>
                            </ListGroup>
                        
                        </Card>
                        ))}
                    </div>
                </div>
                        
                    
        
            
        </div>
    );
}

const img1 = ["http://localhost:8080/file/1643885490060-any-name-Screenshot%20(11).png"];
const img2 = ["http://localhost:8080/file/1646066672651-any-name-Screenshot%20(438).png"]


export default Products;
