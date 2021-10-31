import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import {decimals, swapWithExactSupply } from '../../../../AMTC6_API.js';         


const QuickTrade = ({icons, tickSymbols, oraclePrices, blockHeader, customerPortfolio}) => {
	const [baseCurrency, setBaseCurrency] = useState("ACA");	
	const [baseCurrencyIconIndex, setBaseCurrencyIconIndex] = useState(0);	
	const [baseCurrencyPlaceHolder, setBaseCurrencyPlaceHolder] = useState("values from 1 to 10");	
    const [input_Supply_ACA, setInput_Supply_ACA] = useState("");
    const [swapWithExactSupply_IsSubmiting, setSwapWithExactSupply_IsSubmiting] = useState(false);

    const [expectedToreceiveFromSwap, setExpectedToreceiveFromSwap] = useState("expected to receive");
    const [receiveFromSwap, setReceiveFromSwap] = useState("");

	const [quoteCurrency, setQuotCurrency] = useState("AUSD");	
	const [swapTech, setSwapTech] = useState("API");	

	const settingBaseCurrency = (tokSymbl) => {
		setBaseCurrency(tokSymbl);
		const tok_indx =  tickSymbols.findIndex((tok) => tok.toLowerCase()===tokSymbl.toLowerCase());
		setBaseCurrencyIconIndex(tok_indx);
		if (tokSymbl!=="ACA") {setInput_Supply_ACA(""); setBaseCurrencyPlaceHolder("currently only ACA is supported"); }
		else if (customerPortfolio) setInput_Supply_ACA(customerPortfolio[tokSymbl]);
	};

 

	const _swapWithExactSupply = async () => {
		if (baseCurrency==='ACA')
		{
			setSwapWithExactSupply_IsSubmiting(true);
			setReceiveFromSwap(`Transaction submitted at BlockNumber: ${blockHeader.number}`);

			const result = await swapWithExactSupply(input_Supply_ACA);
			console.log(`QuickTrade SWAP result: `,result);
			console.dir(result);

			
			setSwapWithExactSupply_IsSubmiting(false);
		}

	};


	useEffect(() => {
		if (customerPortfolio[baseCurrency])
		{
			setInput_Supply_ACA(customerPortfolio[baseCurrency]);
		}
	},[baseCurrency]);

	

	return(
		<>
			<div className="card">
				<div className="card-header d-sm-flex d-block pb-0 border-0">
					<div>
						<h4 className="fs-20 text-black">Swap</h4>
						<p className="fs-12">Exact amount of supplied tokens</p>
					</div>
					<Dropdown className="quick-select">
						<Dropdown.Toggle variant="" as="div" className="form-control style-2 default-select cursor-pointer">{swapTech} </Dropdown.Toggle>
						<Dropdown.Menu >
							<Dropdown.Item onClick={() => setSwapTech("EVM")}>EVM</Dropdown.Item>
							<Dropdown.Item onClick={() => setSwapTech("API")}>API</Dropdown.Item>
						 </Dropdown.Menu>
					</Dropdown>
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
									<input type="number" min="1" max="10" step="0.01" className="form-control" placeholder={baseCurrencyPlaceHolder} value = { input_Supply_ACA } onChange = { (event) => { setInput_Supply_ACA(event.target.value); setExpectedToreceiveFromSwap(Number(oraclePrices["ACA"]) * Number(event.target.value) );}  } style={{color:"white"}} />
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
									<Dropdown>
											<Dropdown.Toggle variant="" as="div" className="input-group-text form-control style-2 default-select cursor-pointer"><img alt="images" width={50} src={icons[1]} style={{ marginRight: "25px", color:"white" }}/>{"AUSD"} </Dropdown.Toggle>
											<Dropdown.Menu >
												<Dropdown.Item onClick={() => setQuotCurrency("AUSD")}>{quoteCurrency}</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
									<input type="number" disable="true" value="" onChange={(event) => console.log(event.target.value)} placeholder={expectedToreceiveFromSwap} className="form-control" />
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
										<span className="input-group-text">Fee (0.3%)</span>
									</div>
									<span className="form-control">0</span>
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
										<span className="input-group-text">Receive</span>
									</div>
									<span className="form-control" style={{color:"green"}}>{receiveFromSwap}</span>
								</div>
							</div>
							<div className="row mt-4 align-items-center">
								<div className="row pt-5 align-items-center">
									<div className="col-sm-3">
									</div>
									<div className="col-sm-6">
										<Link to={"#"} className="btn btn-primary d-block btn-lg rounded">
    				                    	<button className="btn-primary" disabled = { swapWithExactSupply_IsSubmiting } onClick = { _swapWithExactSupply } style={{border: "none"}}>SWAP</button> 
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
export default QuickTrade;