import React, { useEffect, useState } from 'react'   //added for ticker only

import Ticker from 'react-ticker';
import {EVM_Setup, oracle_EVM_PricesHuman, oracle_EVM_Icons, oracle_EVM_Description} from '../../../Predeployed_EVM.js';     //Blockchain provider,signer setup and helper functions
import Identicon from '@polkadot/react-identicon';   //used for icons of Substrate account

/// Image
import { Dropdown } from "react-bootstrap";

let keys = [], icons = [], descriptions = [];


const Header = ({ setupSpecs, blockHeader, evm_api_state, accountList, setSubstrateAccount, selectedAddress, selectedAccountName, oraclePrices }) => {

	const [dropdowncolor, setDropdowncolor] = useState("#DE5106");
	const [dropdownDisabled, setDropdownDisabled] = useState(true);		

  useEffect(() => {
      keys= Object.keys(oracle_EVM_Description);
      keys.forEach((item) => {
        icons.push(oracle_EVM_Icons[item]); 
        descriptions.push(oracle_EVM_Description[item]); 
      });

  },[])

  useEffect(() => {
      if (evm_api_state)
      {
        setDropdowncolor("white");
        setDropdownDisabled(false);
      } else {
        setDropdowncolor("#DE5106");
        setDropdownDisabled(true);
      }
  },[evm_api_state])


  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
            <li className="nav-item">
              <div  style={{ width: "50vw"}}> 
                <div style={{ width: "100v%" }}> 
                      <Ticker offset='run-in'  speed={10} >
                            {({ index }) => {

                              const lngth =keys.length;
                              if (oraclePrices["ACA"])
                              {
                                const indx = index%lngth;
                                return (
                                  <>
                                    <h2 className="invoice-num" style={{ paddingRight: "0.5em" }}> <img alt="images" width={50} src={icons[indx]} style={{marginRight: "10px"}} />{Number(oraclePrices[keys[indx]]).toFixed(2)}</h2>
                                    <p className="mb-0 invoice-num1">
                                      <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 13C1.91797 11.9157 4.89728 8.72772 6.5 7L12.5 10L19.5 1" stroke="#13B440" strokeWidth="2" strokeLinecap="round"/>
                                      </svg>
                                      <span className="text-success me-1 ms-1">45%</span> {descriptions[indx]}
                                    </p>
                                  </>
                                )
                              }
                              else  return (
                                <>
                                  <h1 style={{ paddingRight: "0.5em" }}>Connecting to Acala Mandala TC6</h1>
                                </>
                              ) 

                            }
                          }
                      </Ticker>
                </div> 
              </div>
            </li>
            </div>

            <ul className="navbar-nav header-right main-notification">
              <Dropdown className="weather-btn mb-2">
                    <span className="fs-22 font-w600 d-flex" style={{color: dropdowncolor}}><i className="fa fa-google-wallet me-3 ms-3"></i></span>
                    <Dropdown.Toggle variant="" as="div" className="form-control style-3 default-select"  style={{color: dropdowncolor}}>{selectedAddress} </Dropdown.Toggle>
                    <Dropdown.Menu>
                      { accountList &&
                          accountList.map((accountObj) => <Dropdown.Item key={accountObj.address} disabled={dropdownDisabled} onClick={() => {
                            setSubstrateAccount(accountObj)
                          }}>{`${accountObj.name}-${accountObj.address}`}</Dropdown.Item>) 
                      }
                    </Dropdown.Menu>
              </Dropdown>  

              <div className="timeline-panel" style={{ marginTop:"20px", }}>
                    <div className="media me-2">
                      <Identicon value={selectedAddress} size={48} theme={'polkadot'}/>
                    </div>
                    <div className="media-body" style={{ marginTop:"5px", }}>
                      <h6 className="mb-1">{selectedAccountName}</h6>
                    </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
