import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import TestimonialOwl from './TestimonialOwl';
import {Dropdown} from 'react-bootstrap';

import { authorize_LoanForTransferTo3rdParty, unauthorize_LoanForTransferTo3rdParty, unauthorizeALL_Loans } from '../../../../AMTC6_API.js';          

 
const QuickTransfer = ({blockHeader, icons, tickSymbols}) => {
	const [baseCurrency, setBaseCurrency] = useState("DOT");	
	const [baseCurrencyIconIndex, setBaseCurrencyIconIndex] = useState(2);	

	const [authorizeAction, setAuthorizeAction] = useState("Authorize Account");	
	const [authorizeeAddress, setAuthorizeeAddress] = useState("");	
	const [manageAuthorization_IsSubmiting, setManageAuthorization_IsSubmiting] = useState(false);	
    const [transactionMessage, setTransactionMessage] = useState("");


	const settingBaseCurrency = (tokSymbl) => {
		setBaseCurrency(tokSymbl);
		const tok_indx =  tickSymbols.findIndex((tok) => tok.toLowerCase()===tokSymbl.toLowerCase());
		setBaseCurrencyIconIndex(tok_indx);
	};

	const provideAddressToSendCoins = (adr) => {
		setAuthorizeeAddress(adr);
	};

	const manageLoanAuthorization = async () => {

		if (authorizeAction==="Unauthorize All Loans")
		{
			console.log(`MANAGE LOAN AUTHORIZATION authorizeAction:${authorizeAction} baseCurrency:${baseCurrency}}`);
			setManageAuthorization_IsSubmiting(true);
			setTransactionMessage(`Manage Loan Authorization Transaction submitted at BlockNumber: ${blockHeader.number}`);

			const result = await unauthorizeALL_Loans();

			console.log(`Manage Loan Authorization authorizeAction:${authorizeAction} result: `,result);
			setManageAuthorization_IsSubmiting(false);
		}
		else if ( (baseCurrency==='DOT' || baseCurrency==='LDOT' || baseCurrency==='XBTC' || baseCurrency==='RENBTC' || baseCurrency==='POLKABTC') && authorizeeAddress)
		{
			console.log(`MANAGE LOAN AUTHORIZATION authorizeAction:${authorizeAction} baseCurrency:${baseCurrency} authorizeeAddress: ${authorizeeAddress}`);
			setManageAuthorization_IsSubmiting(true);
			setTransactionMessage(`Manage Loan Authorization Transaction submitted at BlockNumber: ${blockHeader.number}`);

			let result;
			if (authorizeAction==="Authorize Account")
			{
				result = await authorize_LoanForTransferTo3rdParty(baseCurrency, authorizeeAddress);
			}
			else if(authorizeAction==="Unauthorize Account")
			{
				result = await unauthorize_LoanForTransferTo3rdParty(baseCurrency, authorizeeAddress);
			}

			console.log(`Manage Loan Authorization result: `,result);
			setManageAuthorization_IsSubmiting(false);
		}

	};

	


	return(
		<>
			<div className="card">
				<div className="card-header d-sm-flex d-block pb-0 border-0">
					<div>
						<h4 className="fs-20 text-black">Loan Authorizations</h4>
						<p className="fs-12">Authorize/Unauthorize another account to manage your loan</p>
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
								<input type="number" disabled={true} className="form-control" placeholder="loan with token collateral to authorize" />
							</div>
						</div>
						<div className="form-group">
							<div className="input-group input-group-lg">
								<div className="input-group-prepend">
									<Dropdown>
											<Dropdown.Toggle variant="" as="div" className="input-group-text form-control style-2 default-select cursor-pointer">{authorizeAction} </Dropdown.Toggle>
											<Dropdown.Menu >
												<Dropdown.Item onClick={() => setAuthorizeAction("Authorize Account")}>Authorize Account</Dropdown.Item>
												<Dropdown.Item onClick={() => setAuthorizeAction("Unauthorize Account")}>Unauthorize Account</Dropdown.Item>
												<Dropdown.Item onClick={() => setAuthorizeAction("Unauthorize All Loans")}>Unauthorize All Loans</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
								</div>
								<input type="text" className="form-control" placeholder="account to manage my loan" value = { authorizeeAddress } onChange = { (event) => setAuthorizeeAddress(event.target.value) } style={{fontSize: "14px", color:"white"}} />
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
							<Link to={"#"} className="btn btn-primary d-block btn-lg rounded" style={{backgroundColor: "#DE9C06"}}>
    				            <button className="btn-primary" disabled = {manageAuthorization_IsSubmiting} onClick = {manageLoanAuthorization} style={{border: "none", backgroundColor: "#DE9C06"}}>Manage Authorizations</button> 
							</Link>
						</div>
					</div>
				</div>
			</div>
		
		</>
	)
}
export default QuickTransfer;