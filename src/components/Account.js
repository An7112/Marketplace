import { Card } from 'react-bootstrap';
import React from 'react';
import { FaEthereum } from "react-icons/fa";
import './ListComponent.css'
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
const Account = (props) => {
    return (
      <div style={{display:'flex'}} > 
        <Card border="primary" style={{ width: '38%',height: '10rem', marginRight:'2rem',fontSize:'14px', backgroundColor:'#336666'  }}>
          <Card.Header>Account
          </Card.Header>
          <Card.Body >
            <Card.Text > <a href={`https://etherscan.io/address/${props.account}`} style={{color:' rgb(88 199 250 / 100%)'}} target={"_blank"} className='abc'>
            { props.account === '0x0'
                                    ? <label>Loading...</label>
                                    : props.account
                                    }</a>
            </Card.Text>
          
          </Card.Body>
        </Card>
        <Card border="primary" style={{ width: '38%  ', height: '10rem', marginRight:'2rem',fontSize:'14px', backgroundColor:'#336666'  }}>
          <Card.Header>Balance <FaEthereum />
          </Card.Header>
          <Card.Body>
    
            <Card.Text>
            {props.balance === 0 ? <label>Loading...</label>
                                    : props.balance/1000000000000000000} ETH
            </Card.Text>
          </Card.Body>
        </Card>   
        <Card border="primary" style={{ width: '38%  ', height: '10rem', fontSize:'14px', backgroundColor:'#336666'  }}>
          <Card.Header>Products
          </Card.Header>
          <Card.Body>
    
            <Card.Text>
            {props.productCount === 0 ? <label>Loading...</label>
                                    : props.productCount}
            </Card.Text>
          </Card.Body>
        </Card>     
               
      </div>
      // <div className="account-block">
      //   {accounts?.length > 0 ? (
      //     <>
            
      //     </>
      //   ) : (
      //     <div className="connect-button">
      //       <button onClick={connect}>Connect</button>
      //     </div>
      //   )}
      // </div>
    );
  };
export default Account;