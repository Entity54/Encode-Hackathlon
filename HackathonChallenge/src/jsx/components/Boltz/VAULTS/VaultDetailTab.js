import React,{useState} from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
//Import
import { DropDownBlog} from './OrderBlog';

import Quick_Deposit from './Quick_Deposit';
import Quick_Withdrawal from './Quick_Withdrawal';



const CoinLineChart1 = loadable(() =>
	pMinDelay(import("./CoinCharts/CoinLineChart1"), 1000)
);
const CoinLineChart2 = loadable(() =>
	pMinDelay(import("./CoinCharts/CoinLineChart2"), 1000)
);
const CoinLineChart3 = loadable(() =>
	pMinDelay(import("./CoinCharts/CoinLineChart3"), 1000)
);
const CoinLineChart4 = loadable(() =>
	pMinDelay(import("./CoinCharts/CoinLineChart4"), 1000)
);


const setVaultToken = (tokens) => {
	let vault_tok_symbol = "VL"
	tokens.forEach((tok) => vault_tok_symbol += `_${tok}`);
	console.log(`***** VaultDetailTab ***** vault_tok_symbol: `,vault_tok_symbol);
	return vault_tok_symbol;
}

const VaultDetailTab = ({ icons, title, tokens, vaultMandate, vaultValues, chart  }) =>{

	const [doller, setDoller] = useState("Total Value Locked");		

	return(
		<div>
						<div className="row">
							<div className="col-xl-3 col-xxl-4 mt-4">
								<div className="card">
									<div className="card-header pb-0 border-0">
										<h4 className="mb-0 text-black fs-20">About</h4>
										<DropDownBlog />
									</div>
									<div className="card-body">
										<div className="d-flex align-items-start mb-3 about-coin">
											{
												title==="ACA/DOT MC"? 
																	<div>
																		<img src={icons[0]}  width="50"  height="50" alt="" />
																		<img src={icons[2]}  width="50"  height="50" alt="" />
																	</div>
												: title==="ACA DCA"? 
																	<div>
																		<img src={icons[0]}  width="50"  height="50" alt="" />
																	</div>
												: title==="XBTC/RENBTC/POLKABTC MC"? 
																	<div>
																		<img src={icons[9]}  width="30"  height="30" alt="" />
																		<img src={icons[4]}  width="30"  height="30" alt="" />
																		<img src={icons[10]}  width="30"  height="30" alt="" />
																	</div>
												: title==="custom_ACA/DOT/XBTC MC"? 
																	<div>
																		<img src={icons[0]}  width="30"  height="30" alt="" />
																		<img src={icons[2]}  width="30"  height="30" alt="" />
																		<img src={icons[9]}  width="30"  height="30" alt="" />
																	</div>
												: "N/A"
											}
											<div className="ms-3">
												<h2 className="font-w600 text-black mb-0 title">{title}</h2>
												<p className="font-w600 text-black sub-title">{setVaultToken(tokens)}
												 
												</p>
												<span>Price = {vaultValues.coinPrice} USD</span>
											</div>	
										</div>
										{vaultMandate}
									</div>
								</div>
							</div>
							<div className="col-xl-9 col-xxl-8 mt-4">
								<div className="card">
									<div className="card-header pb-0 d-block d-sm-flex flex-wrap border-0 align-items-center">
										<div className="me-auto mb-3">
											<h4 className="fs-20 text-black">{title}</h4>
											<p className="fs-12">{vaultValues.description}</p>
										</div>
										
										<div className="input-group detault-daterange me-3  mb-3 coinDetails-datepiker">
											<span className="input-group-text"><i className="las la-calendar"></i></span>
											<DateRangePicker>
												<input type="text" className="form-control" />
											</DateRangePicker>
										</div>
										<Dropdown className="">
											<Dropdown.Toggle variant="" as="div" className="form-control style-1 default-select  mb-3 rounded">{doller} </Dropdown.Toggle>
											<Dropdown.Menu >
												<Dropdown.Item onClick={() => setDoller("Total Value Locked")}>Total Value Locked</Dropdown.Item>
												<Dropdown.Item onClick={() => setDoller("#Vault Coins")}>#Vault Coins</Dropdown.Item>
												<Dropdown.Item onClick={() => setDoller("Coin Price")}>Vault Coin Price</Dropdown.Item>
											 </Dropdown.Menu>
										</Dropdown>
									</div>
									<div className="card-body pb-0 pt-sm-3 pt-0">
										<div className="row sp20 mb-4 align-items-center">
											<div className="col-lg-4 col-xxl-4 col-sm-4 d-flex flex-wrap align-items-center">
												<div className="px-2 info-group">
													<p className="fs-18 mb-1">{doller}</p>
													<h2 className="fs-28 font-w600 text-black">{doller ==="Total Value Locked"? `$${vaultValues.TVL}` 
																	: doller ==="#Vault Coins"? vaultValues.numOfCoins
																	: doller ==="Coin Price"? `$${vaultValues.coinPrice}`  
																	: "N/A"
													}</h2>
												</div>
											</div>
										</div>
										<div id="chartBarRunning" className="bar-chart">
											{ chart==="1"? <CoinLineChart1 />
												: chart==="2"? <CoinLineChart2 />
												: chart==="3"? <CoinLineChart3 />
											    : chart==="4"? <CoinLineChart4 />
											    : "NO CHART HAS BEEN PROVIDED"}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-xl-6 col-xxl-12">
								<Quick_Deposit icons={icons} tokens={tokens} />
							</div>
							<div className="col-xl-6 col-xxl-12">
								<Quick_Withdrawal icons={icons} tokens={tokens} />
							</div>
						</div>	
		</div>
	)
}
export default VaultDetailTab;