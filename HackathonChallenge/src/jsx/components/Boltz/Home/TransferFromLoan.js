import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import TestimonialOwl from './TestimonialOwl';
import {Dropdown} from 'react-bootstrap';

import {tranferLoanFrom} from '../../../../AMTC6_API.js';          

 
const QuickTransfer = ({blockHeader, icons, tickSymbols}) => {
	const [baseCurrency, setBaseCurrency] = useState("DOT");	
	const [baseCurrencyIconIndex, setBaseCurrencyIconIndex] = useState(2);	
	const [authorizorAddress, setAuthorizorAddress] = useState("");	
	const [transferLoan_IsSubmiting, setTransferLoan_IsSubmiting] = useState(false);	
    const [transactionMessage, setTransactionMessage] = useState("");

	
	const settingBaseCurrency = (tokSymbl) => {
		setBaseCurrency(tokSymbl);
		const tok_indx =  tickSymbols.findIndex((tok) => tok.toLowerCase()===tokSymbl.toLowerCase());
		setBaseCurrencyIconIndex(tok_indx);
	};

	const provideAddressToSendCoins = (adr) => {
		setAuthorizorAddress(adr);
	};

	const _trasnferLoanFrom = async () => {
		if ( (baseCurrency==='DOT' || baseCurrency==='LDOT' || baseCurrency==='XBTC' || baseCurrency==='RENBTC' || baseCurrency==='POLKABTC') && authorizorAddress)
		{
			console.log(`TRANSFER LOAN IN baseCurrency:${baseCurrency} from authorizorAddress: ${authorizorAddress}`);
			setTransferLoan_IsSubmiting(true);
			setTransactionMessage(`Transfer Loan Transaction submitted at BlockNumber: ${blockHeader.number}`);

			const result = await tranferLoanFrom(baseCurrency, authorizorAddress);

			// console.log(`TRANSFER LOAN result: `,result);
			setTransferLoan_IsSubmiting(false);
		}
	};


	return(
		<>
			<div className="card">
				<div className="card-header d-sm-flex d-block pb-0 border-0">
					<div>
						<h4 className="fs-20 text-black">Transfer Loan from</h4>
						<p className="fs-12">Requires that your account has been authorized by loan owner</p>
					</div>
				</div>
				<div className="card-body">
					<div className="form-wrapper">
						<div className="form-group">
							<div className="input-group input-group-lg">
								<div className="input-group-prepend">
									<Dropdown>
											<Dropdown.Toggle variant="" as="div" className="input-group-text form-control style-2 default-select cursor-pointer"><img alt="images" width={50} src={icons[baseCurrencyIconIndex]} style={{ marginRight: "25px" }}/>{baseCurrency} </Dropdown.Toggle>
											<Dropdown.Menu >
												<Dropdown.Item onClick={() => settingBaseCurrency("DOT")}>DOT</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("LDOT")}>LDOT</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("RENBTC")}>RENBTC</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("XBTC")}>XBTC</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("POLKABTC")}>POLKABTC</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
								</div>
								<input type="number" disabled={true} className="form-control" placeholder="loan with token collateral to transfer" />
							</div>
						</div>
						<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
										<span className="input-group-text">Loan Owner</span>
									</div>
									<input type="text" className="form-control" value={authorizorAddress} onChange = { (event) => setAuthorizorAddress(event.target.value) } placeholder="" style={{fontSize: "14px", color: "white"}} />
								</div>
						</div>
					</div>
					<br/>
					<span style={{fontSize:"14px", color:"green"}}>{transactionMessage}</span>
					<br/>
					<br/>

					<div className="d-flex mb-3 justify-content-between align-items-center view-link">
						<h4 className="text-black fs-20 mb-0">Recent Contacts</h4>
					</div>
					
					<TestimonialOwl provideAddressToSendCoins={provideAddressToSendCoins} />
					
					<div className="row pt-5 align-items-center">
						<div className="col-sm-3">
						</div>
						<div className="col-sm-6">
							<Link to={"#"} className="btn btn-primary d-block btn-lg rounded" style={{backgroundColor: "#58D68D"}}>
    				            <button className="btn-primary" disabled={transferLoan_IsSubmiting} onClick={_trasnferLoanFrom} style={{border: "none", backgroundColor: "#58D68D"}}>Transfer Loan</button> 
							</Link>
						</div>
					</div>
				</div>
			</div>
		
		</>
	)
}
export default QuickTransfer;