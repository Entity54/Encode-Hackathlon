import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import TestimonialOwl from './TestimonialOwl';
import {Dropdown} from 'react-bootstrap';
import {decimals, transfer_Balance, transfer_Currency } from '../../../../AMTC6_API.js';         

// import {EVM_Setup, oracle_EVM_PricesHuman, oracle_EVM_Icons, oracle_EVM_Description} from '../../../../Predeployed_EVM.js';     //Blockchain provider,signer setup and helper functions

 
const QuickTransfer = ({icons, tickSymbols, blockHeader, customerPortfolio}) => {
	const [baseCurrency, setBaseCurrency] = useState("ACA");	
	const [baseCurrencyIconIndex, setBaseCurrencyIconIndex] = useState(0);	

	const [baseCurrencyPlaceHolder, setBaseCurrencyPlaceHolder] = useState("values from 1 to 10");	
    const [inputTranferAmount, setInputTranferAmount] = useState("");

    const [transfer_IsSubmiting, setTransfer_IsSubmiting] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState("...........");


	const [swapTech, setSwapTech] = useState("API");
	const [placeholderText, setPlaceholderText] = useState("Substrate Address");	
	const [sendToAddress, setSendToAddress] = useState("");	

	const provideAddressToSendCoins = (adr) => {
		setSendToAddress(adr);
	};


	const settingBaseCurrency = (tokSymbl) => {
		setBaseCurrency(tokSymbl);
		const tok_indx =  tickSymbols.findIndex((tok) => tok.toLowerCase()===tokSymbl.toLowerCase());
		setBaseCurrencyIconIndex(tok_indx);
		if (tokSymbl!=="ACA" && tokSymbl!=="DOT") { setInputTranferAmount(""); setBaseCurrencyPlaceHolder("currently only ACA,DOT and XBTC are supported"); }
		else if (customerPortfolio) setInputTranferAmount(customerPortfolio[tokSymbl]);
	};


	const transferBalance = async () => {
		console.log(`QuickTransfer transferBalance baseCurrency: `,baseCurrency,` sendToAddress: `,sendToAddress,`  inputTranferAmount: `,inputTranferAmount);

		if ( (baseCurrency==='ACA') && sendToAddress!=="" && inputTranferAmount!=="0")
		{
			setTransfer_IsSubmiting(true);
			setTransactionMessage(`Transfer Transaction submitted at BlockNumber: ${blockHeader.number}`);

			const result = await transfer_Balance(inputTranferAmount, sendToAddress);
			console.log(`QuickTransfer TRANSFER result: `,result);
			console.dir(result);
			
			setTransfer_IsSubmiting(false);
		}
		else if ( (baseCurrency==='DOT' || baseCurrency==='XBTC') && sendToAddress!=="" && inputTranferAmount!=="0")
		{
			setTransfer_IsSubmiting(true);
			setTransactionMessage(`Transfer Transaction submitted at BlockNumber: ${blockHeader.number}`);

			const result = await transfer_Currency(inputTranferAmount, baseCurrency, sendToAddress);
			console.log(`QuickTransfer TRANSFER CURRENCY result: `,result);
			console.dir(result);
			
			setTransfer_IsSubmiting(false);
		}

	};

	useEffect(() => {
		if (customerPortfolio[baseCurrency])
		{
			setInputTranferAmount(customerPortfolio[baseCurrency]);
		}
	},[baseCurrency]);


	return(
		<>
			<div className="card">
				<div className="card-header d-sm-flex d-block pb-0 border-0">
					<div>
						<h4 className="fs-20 text-black">Quick Transfer</h4>
					</div>
					
					<Dropdown className="quick-select">
						<Dropdown.Toggle variant="" as="div" className="form-control style-2 default-select cursor-pointer">{swapTech} </Dropdown.Toggle>
						<Dropdown.Menu >
							<Dropdown.Item onClick={() => { setSwapTech("EVM"); setPlaceholderText("EVM Address") }}>EVM</Dropdown.Item>
							<Dropdown.Item onClick={() => { setSwapTech("API"); setPlaceholderText("Substrate Address") }}>API</Dropdown.Item>
						 </Dropdown.Menu>
					</Dropdown>
				</div>
				
				<div className="card-body">
					<div className="form-wrapper">
						<div className="form-group">
							<div className="input-group input-group-lg">
								<div className="input-group-prepend">
									<Dropdown>
											<Dropdown.Toggle variant="" as="div" className="input-group-text form-control style-2 default-select cursor-pointer"><img alt="images" width={50} src={icons[baseCurrencyIconIndex]} style={{ marginRight: "25px" }}/>{baseCurrency} </Dropdown.Toggle>
											<Dropdown.Menu >
												<Dropdown.Item onClick={() => settingBaseCurrency("ACA")}>ACA</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("DOT")}>DOT</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("LDOT")}>LDOT</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("XBTC")}>XBTC</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("RENBTC")}>RENBTC</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("POLKABTC")}>POLKABTC</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("KAR")}>KAR</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("KSM")}>KSM</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("LKSM")}>LKSM</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("PHA")}>PHA</Dropdown.Item>
												<Dropdown.Item onClick={() => settingBaseCurrency("PLM")}>PLM</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
								</div>
								<input type="number" min="1" max="10" step="0.01" className="form-control" value={inputTranferAmount} placeholder={baseCurrencyPlaceHolder} onChange = {(event) => setInputTranferAmount(event.target.value)} style={{color:"white"}} />
							</div>
						</div>
						<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
										<span className="input-group-text">send to Address</span>
									</div>
									<input type="text" className="form-control" value={sendToAddress} placeholder={placeholderText} onChange = {(event) => setSendToAddress(event.target.value)} style={{fontSize: "14px", color: "white"}} />
								</div>
							</div>
					</div>

					<br/>
					<span style={{fontSize:10, color:"green"}}>{transactionMessage}</span>
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
    				                    	<button className="btn-primary" disabled={transfer_IsSubmiting} onClick = {transferBalance} style={{border: "none", backgroundColor: "#DE9C06"}}>TRANSFER</button> 
							</Link>
						</div>
					</div>
				</div>
			</div>
		
		</>
	)
}
export default QuickTransfer;