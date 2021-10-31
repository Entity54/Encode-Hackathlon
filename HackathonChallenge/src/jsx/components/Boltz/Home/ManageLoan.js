import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

import { adjustLoan, accountLoans, oracle_API_Prices} from '../../../../AMTC6_API.js';          


const ManageLoan = ({blockHeader, icons, tickSymbols}) => {
	const [baseCurrency, setBaseCurrency] = useState("DOT");	
	const [baseCurrencyIconIndex, setBaseCurrencyIconIndex] = useState(2);	

	const [input_depWith_collateralAmount, setInput_depWith_collateralAmount] = useState("");	
	const [input_borRepay_AUSDAmount, setInput_borRepay_AUSDAmount] = useState("");	
    const [manageLoan_IsSubmiting, setManageLoan_IsSubmiting] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState("");
	

	const settingBaseCurrency = (tokSymbl) => {
		setBaseCurrency(tokSymbl);
		const tok_indx =  tickSymbols.findIndex((tok) => tok.toLowerCase()===tokSymbl.toLowerCase());
		setBaseCurrencyIconIndex(tok_indx);
	};


	const manageLoan = async () => {
		if ( (baseCurrency==='DOT' || baseCurrency==='LDOT' || baseCurrency==='XBTC' || baseCurrency==='RENBTC' || baseCurrency==='POLKABTC') 
				&& (input_depWith_collateralAmount!=="" || input_borRepay_AUSDAmount!=="") )
		{
			console.log(`MANAGE LOAN baseCurrency:${baseCurrency} input_depWith_collateralAmount:${input_depWith_collateralAmount} input_borRepay_AUSDAmount:${input_borRepay_AUSDAmount}`);
			const collateral = input_depWith_collateralAmount===""? 0 : input_depWith_collateralAmount;
			const debit = input_borRepay_AUSDAmount===""? 0 : input_borRepay_AUSDAmount;
			console.log(`MANAGE LOAN baseCurrency:${baseCurrency} collateral:${collateral} debit:${debit}`);

			setManageLoan_IsSubmiting(true);
			setTransactionMessage(`Manage Loan Transaction submitted at BlockNumber: ${blockHeader.number}`);

			const result = await adjustLoan(baseCurrency, collateral, debit);

			console.log(`ManageLoan adjust Existing Loan result: `,result);
			console.dir(result);
			
			setManageLoan_IsSubmiting(false);
		}

	};



	return(
		<>
			<div className="card">
				<div className="card-header d-sm-flex d-block pb-0 border-0">
					<div>
						<h4 className="fs-20 text-black">Manage Loan</h4>
						<p className="fs-12">Deposit/Withdraw Collateral	Borrow,Repay or Close existing loan</p>
					</div>
				</div>
				<div className="card-body">
					<div className="basic-form">
						<form className="form-wrapper">
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
									<input type="number" min="-10" max="10" step="0.01" className="form-control" placeholder="Deposit(+)/Withdraw(-) Collateral" value = { input_depWith_collateralAmount } onChange = { (event) => setInput_depWith_collateralAmount(event.target.value) } style={{color:"white"}} />
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
									<span className="input-group-text"><img alt="images" width={50} src={icons[1]} style={{ marginRight: "25px" }}/>AUSD</span>
									</div>
									<input type="number" min="-100000" max="100000" step="1" className="form-control" placeholder="Borrow More(+)/ Repay(-) AUSD" value = { input_borRepay_AUSDAmount } onChange = { (event) => setInput_borRepay_AUSDAmount(event.target.value) } style={{color:"white"}} />
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
										<span className="input-group-text">Close Loan</span>
									</div>
									<input type="text" className="form-control" placeholder="Yes/No (functionality not available yet)" value=""  onChange = { (event) => console.log(event.target.value) } />
								</div>
							</div>
							<br/>
							<span style={{fontSize:10, color:"green"}}>{transactionMessage}</span>
							<br/>
							<div className="row mt-4 align-items-center">
								<div className="row pt-5 align-items-center">
									<div className="col-sm-3">
									</div>
									<div className="col-sm-6">
										<Link to={"#"} className="btn btn-primary d-block btn-lg rounded">
    				                    	<button className="btn-primary" disabled = { manageLoan_IsSubmiting } onClick = {manageLoan} style={{border: "none"}}>Manage Loan</button> 
										</Link>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
export default ManageLoan;