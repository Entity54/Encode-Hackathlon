import React,{useState,useEffect,useContext} from 'react';
// import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
// import {Dropdown} from 'react-bootstrap';

import { ThemeContext } from "../../../context/ThemeContext";
import Donut from "../Boltz/MyWallet/Donut";

import Identicon from '@polkadot/react-identicon';   //used for icons of Substrate account
import {EVM_Setup, oracle_EVM_PricesHuman, oracle_EVM_Icons, oracle_EVM_Description, TokenBindings, LP_TokenBindings} from '../../../Predeployed_EVM.js';     //Blockchain provider,signer setup and helper functions
let icons = [], tickSymbols = [], descriptions = [];



const SummarApexBar = loadable(() =>
	pMinDelay(import("../Boltz/Portfolio/SummarApexBar"), 1000)
);
const CurrentApexBar = loadable(() =>
	pMinDelay(import("../Boltz/Portfolio/CurrentApexBar"), 1000)
);
const CurrentApexDonut = loadable(() =>
	pMinDelay(import("../Boltz/Portfolio/CurrentApexDonut"), 1000)
);

const CoinChart = loadable(() =>
  pMinDelay(import("../Boltz/MyWallet/CoinChart"), 1000)
);



const Portofolio = ({ setupSpecs, blockChainSpecs, blockHeader, blockTimestamp, extension, accountList, selectedAddress, selectedAccountName, selected_EVM_Address, customerPortfolio, message_1, oraclePrices, customerPortfolioAnalytics }) =>{
	const { background } = useContext(ThemeContext);

	//used to update prices
	const [tokenDonutPerc, setTokenDonutPerc] = useState();	
	const [vaultsDonutPerc, setVaultsDonutPerc] = useState();	
	const [stablecoinsDonutPerc, setStablecoinsDonutPerc] = useState();	
	const [loansDonutPerc, setLoansDonutPerc] = useState();	
	
	const [sector_stablecoins, setSector_stablecoins] = useState();	
	const [sector_tokens, setSector_tokens]            = useState();	
	const [sector_vaults, setSector_vaults]           = useState();	
	const [sector_loans, setSector_loans]             = useState();	


	setTimeout(() => {
		setTokenDonutPerc(  [25, 17, 2, 7, 4, 5, 20, 15, 8] );
	},5000)	
	setTimeout(() => {
		setVaultsDonutPerc(  [17, 15, 22, 4, 11, 7, 9, 15] );
	},5000)	
	setTimeout(() => {
		setStablecoinsDonutPerc(  [47, 29, 10, 14] );
	},5000)	
	setTimeout(() => {
		setLoansDonutPerc(  [41, 19, 22, 18] );
	},5000)	


	useEffect(() => {
		const keys= Object.keys(oracle_EVM_Description);
		keys.forEach((item) => {
			icons.push(oracle_EVM_Icons[item]); 
			descriptions.push(oracle_EVM_Description[item]); 
		});
		tickSymbols = keys;
	},[])


	useEffect(() => {
	// customerPortfolioAnalytics && totalBalance!==0? (100*(totalIn_Stablecoins/totalBalance)).toFixed(2) : 0
		if (customerPortfolioAnalytics)
		{
			setSector_stablecoins(customerPortfolioAnalytics.totalBalance!==0? (100*(customerPortfolioAnalytics.totalIn_Stablecoins / customerPortfolioAnalytics.totalBalance)).toFixed(2) : 0) ;
			setSector_tokens(customerPortfolioAnalytics.totalBalance!==0? (100*(customerPortfolioAnalytics.totalIn_Tokens / customerPortfolioAnalytics.totalBalance)).toFixed(2) : 0) ;
			setSector_vaults(customerPortfolioAnalytics.totalBalance!==0? (100*(customerPortfolioAnalytics.totalIn_Vaults / customerPortfolioAnalytics.totalBalance)).toFixed(2) : 0) ;
			setSector_loans(customerPortfolioAnalytics.totalBalance!==0? (100*(customerPortfolioAnalytics.totalIn_Loans / customerPortfolioAnalytics.totalBalance)).toFixed(2) : 0) ;
		}

	},[customerPortfolioAnalytics])



	return(
		<>
			<div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
				<h2 className="font-w600 mb-2 me-auto">Portfolio</h2>
			</div>
			<div className="row">
				<div className="col-xl-9 col-xxl-8">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h4 className="mb-0 fs-20 text-black">Token Holdings</h4>
						</div>
						<div className="card-body" style={{overflowY: "scroll", height:"400px"}}>

							<div className="bg-gradient-1 coin-holding flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[0]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[0]}</h4>
											<p className="mb-0 op-6">{tickSymbols[0]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">${
												!customerPortfolio["ACA"]?  0 
													: oraclePrices["ACA"] && customerPortfolio["ACA"]!=="0"? ( Number(oraclePrices["ACA"]) * Number(customerPortfolio["ACA"]) ).toFixed(3) : 0
											    }
											</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["ACA"]? customerPortfolio["ACA"] : message_1}</p>	
									</div>
								</div>
							</div>
							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[1]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[1]}</h4>
											<p className="mb-0 op-6">{tickSymbols[1]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">${customerPortfolio["AUSD"]? customerPortfolio["AUSD"] : 0 }</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["AUSD"]? customerPortfolio["AUSD"] : message_1}</p>	
									</div>
								</div>
							</div>
							<div className="bg-gradient-3 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[2]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[2]}</h4>
											<p className="mb-0 op-6">{tickSymbols[2]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">${
												!customerPortfolio["DOT"]?  0 
													: oraclePrices["DOT"] && customerPortfolio["DOT"]!=="0"? ( Number(oraclePrices["DOT"]) * Number(customerPortfolio["DOT"]) ).toFixed(3) : 0
											    }
												</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["DOT"]? customerPortfolio["DOT"] : message_1}</p>	
									</div>
								</div>
							</div>
							<div className="bg-gradient-4 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[3]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[3]}</h4>
											<p className="mb-0 op-6">{tickSymbols[3]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">${
												!customerPortfolio["LDOT"]?  0 
													: oraclePrices["LDOT"] && customerPortfolio["LDOT"]!=="0"? ( Number(oraclePrices["LDOT"]) * Number(customerPortfolio["LDOT"]) ).toFixed(3) : 0
											    }
												</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["LDOT"]? customerPortfolio["LDOT"] : message_1}</p>	
									</div>
								</div>
							</div>
							<div className="bg-gradient-1 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[4]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[4]}</h4>
											<p className="mb-0 op-6">{tickSymbols[4]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">${
												!customerPortfolio["RENBTC"]?  0 
													: oraclePrices["RENBTC"] && customerPortfolio["RENBTC"]!=="0"? ( Number(oraclePrices["RENBTC"]) * Number(customerPortfolio["RENBTC"]) ).toFixed(3) : 0
											    }
											</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["RENBTC"]? customerPortfolio["RENBTC"] : message_1}</p>	
									</div>
								</div>
							</div>



							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[9]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[9]}</h4>
											<p className="mb-0 op-6">{tickSymbols[9]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">${
												!customerPortfolio["XBTC"]?  0 
													: oraclePrices["XBTC"] && customerPortfolio["XBTC"]!=="0"? ( Number(oraclePrices["XBTC"]) * Number(customerPortfolio["XBTC"]) ).toFixed(3) : 0
											    }
											</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["XBTC"]? customerPortfolio["XBTC"] : message_1}</p>	
									</div>
								</div>
							</div>
							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[10]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[10]}</h4>
											<p className="mb-0 op-6">{tickSymbols[10]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">${
												!customerPortfolio["POLKABTC"]?  0 
													: oraclePrices["POLKABTC"] && customerPortfolio["POLKABTC"]!=="0"? ( Number(oraclePrices["POLKABTC"]) * Number(customerPortfolio["POLKABTC"]) ).toFixed(3) : 0
											    }
											</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["POLKABTC"]? customerPortfolio["POLKABTC"] : message_1}</p>	
									</div>
								</div>
							</div>

							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[5]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[5]}</h4>
											<p className="mb-0 op-6">{tickSymbols[5]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">$0</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["KAR"]? customerPortfolio["KAR"] : message_1}</p>	
									</div>
								</div>
							</div>
							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[6]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[6]}</h4>
											<p className="mb-0 op-6">{tickSymbols[6]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">$0</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["KUSD"]? customerPortfolio["KUSD"] : message_1}</p>	
									</div>
								</div>
							</div>
							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[7]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[7]}</h4>
											<p className="mb-0 op-6">{tickSymbols[7]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">$0</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["KSM"]? customerPortfolio["KSM"] : message_1}</p>	
									</div>
								</div>
							</div>
							<div className="bg-gradient-2 coin-holding mt-4 flex-wrap">
								<div className="mb-2 coin-bx">
									<div className="d-flex align-items-center">
										<div>
											<img alt="images" width={50} src={icons[8]} />
										</div>
										<div className="ms-3">
											<h4 className="coin-font font-w600 mb-0">{descriptions[8]}</h4>
											<p className="mb-0 op-6">{tickSymbols[8]}</p>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<div className="ms-3">
											<h2 className="mb-0 text-primary coin-font-1">$0</h2>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<div className="d-flex align-items-center">
										<p className="mb-0 ms-2 font-w400 text-black">{customerPortfolio["LKSM"]? customerPortfolio["LKSM"] : message_1}</p>	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-xxl-4">
					<div className="card">
						<div className="card-header border-0">
							<h4 className="mb-0 text-black fs-20">Profile</h4>
						</div>
						<div className="card-body">
							<div className="text-center">
								<div className="my-profile">
									<Identicon value={selectedAddress} size={64} theme={'polkadot'}/>
								</div>
								<h4 className="mt-3 font-w600 text-black mb-0 name-text">{selectedAccountName}</h4>
								<p className="mb-0 mt-3 text-primary fs-16">Substrate Address</p>
								<p className="fs-12">{selectedAddress}</p>
								<p className="mb-0 mt-3 text-primary fs-16">EVM Address</p>
								<p className="fs-12">{selected_EVM_Address}</p>
							</div>
						</div>
					</div>
				</div>
			</div>	
			<div className="row">

			<div className="col-xl-12 col-xxl-12">
					<div className="row">
						<div className="col-xl-12">
							<div className="d-block d-sm-flex mb-4">
								<h4 className="mb-0 text-black fs-24 me-auto">Summary</h4>
							</div>
						</div>	
						<div className="col-xl-12">
							<div className="card">
								<div className="card-body">
									<div className="row align-items-end">
										<div className="col-xl-3 col-lg-12 col-xxl-12">
											<div className="row">
												<div className="col-sm-12">
													<div className="mb-4">
														<p className="mb-2">Total Balance</p>
														<h4 className="text-black">${customerPortfolioAnalytics? (customerPortfolioAnalytics.totalBalance).toFixed(2) : 0}</h4>
													</div>
													<div className="mb-2">
														<p className="mb-2">Free</p>
														<h4 className="text-black">${customerPortfolioAnalytics? (customerPortfolioAnalytics.totalFree).toFixed(2) : 0}</h4>
													</div>
													<div className="mb-4">
														<p className="mb-2">Locked</p>
														<h4 className="text-black">${customerPortfolioAnalytics? (customerPortfolioAnalytics.totalLocked).toFixed(2) : 0}</h4>
													</div>
												</div>
											</div>
										</div>
										<div className="col-xl-9 col-lg-12 col-xxl-12 mb-lg-0 mb-3">
											<p>Sectors</p>
											<div className="row">
												<div className="col-sm-3 mb-sm-0 mb-4 text-center">
													<div className="d-inline-block position-relative donut-chart-sale mb-3">
														{background.value === "dark" ? (
														  <Donut
															value={sector_stablecoins}
															backgroundColor="#FF6826"
															backgroundColor2="#F0F0F0"
														  />
														) : (
														  <Donut value={sector_stablecoins} backgroundColor="#65737e" />
														)}
														<small>{sector_stablecoins}%</small>
													</div>
													<h5 className="fs-18 text-black">Stablecoins</h5>
													<span>${customerPortfolioAnalytics? (customerPortfolioAnalytics.totalIn_Stablecoins).toFixed(2) : 0}</span>
												</div>
												<div className="col-sm-3 mb-sm-0 mb-4 text-center">
													<div className="d-inline-block position-relative donut-chart-sale mb-3">
														{background.value === "dark" ? (
														  <Donut
															value={sector_tokens}
															backgroundColor="#1DC624"
															backgroundColor2="#F0F0F0"
														  />
														) : (
														  <Donut value={sector_tokens} backgroundColor="#2258bf" />
														)}
														<small>{sector_tokens}%</small>
													</div>
													<h5 className="fs-18 text-black">Tokens</h5>
													<span>${customerPortfolioAnalytics? (customerPortfolioAnalytics.totalIn_Tokens).toFixed(2) : 0}</span>
												</div>
												<div className="col-sm-3 mb-sm-0 mb-4 text-center">
													<div className="d-inline-block position-relative donut-chart-sale mb-3">
														{background.value === "dark" ? (
														  <Donut
															value={sector_vaults}
															backgroundColor="#1DC624"
															backgroundColor2="#F0F0F0"
														  />
														) : (
														  <Donut value={sector_vaults} backgroundColor="#1DC624" />
														)}
														<small>{sector_vaults}%</small>
													</div>
													<h5 className="fs-18 text-black">Vaults</h5>
													<span>${customerPortfolioAnalytics? (customerPortfolioAnalytics.totalIn_Vaults).toFixed(2) : 0}</span>
												</div>
												<div className="col-sm-3 text-center">
													<div className="d-inline-block position-relative donut-chart-sale mb-3">
														{background.value === "dark" ? (
														  <Donut
															value={sector_loans}
															backgroundColor="#9E9E9E"
															backgroundColor2="#F0F0F0"
														  />
														) : (
														  <Donut value={sector_loans} backgroundColor="#f04444" />
														)}
														<small>{sector_loans}%</small>
													</div>
													<h5 className="fs-18 text-black">Loans</h5>
													<span>${customerPortfolioAnalytics? (customerPortfolioAnalytics.totalIn_Loans).toFixed(2) : 0}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>

				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-6 col-xxl-12 col-md-6">
							<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="mb-0 fs-20 text-black">Tokens</h4>
								</div>
								<div className="card-body py-2 text-center">
									<div id="pieChart" className="d-inline-block">
										<CurrentApexDonut donutPerc={tokenDonutPerc} />
									</div>
									<div className="chart-items">
										<div className=" col-xl-12 col-sm-12">
											<div className="row text-black text-start fs-13 mt-4">
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#374C98"/>
													</svg>
													ACA
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#52CCCE"/>
													</svg>
													DOT
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#1a8587"/>
													</svg>
													LDOT
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#95D47A"/>
													</svg>
													XBTC
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#688FAD"/>
													</svg>
													RENBTC
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#3F647E"/>
													</svg>
													POLKABTC
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#4B256D"/>
													</svg>
													KAR
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#EF3E5B"/>
													</svg>
													KSM
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#FF782C"/>
													</svg>
													LKSM
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-6 col-xxl-12 col-md-6">
							<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="mb-0 fs-20 text-black">Vaults</h4>
								</div>
								<div className="card-body py-2 text-center">
									<div id="pieChart" className="d-inline-block">
										<CurrentApexDonut donutPerc={vaultsDonutPerc} />
									</div>
									<div className="chart-items">
										<div className=" col-xl-12 col-sm-12">
											<div className="row text-black text-start fs-13 mt-4">
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#374C98"/>
													</svg>
													ACA/DOT MC
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#52CCCE"/>
													</svg>
													KAR/KSM MC
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#1a8587"/>
													</svg>
													XBTC/RENBTC/POLKABTC MC
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#95D47A"/>
													</svg>
													LDOT/LKSM MC
												</span>

												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#688FAD"/>
													</svg>
													ACA DCA
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#3F647E"/>
													</svg>
													KAR DCA
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#4B256D"/>
													</svg>
													DOT DCA
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#EF3E5B"/>
													</svg>
													ACA/DOT/XBTC <span style={{color:"orange"}}>Customised</span>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-6 col-xxl-12 col-md-6">
							<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="mb-0 fs-20 text-black">Stablecoins</h4>
								</div>
								<div className="card-body py-2 text-center">
									<div id="pieChart" className="d-inline-block">
										<CurrentApexDonut donutPerc={stablecoinsDonutPerc} />
									</div>
									<div className="chart-items">
										<div className=" col-xl-12 col-sm-12">
											<div className="row text-black text-start fs-13 mt-4">
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#374C98"/>
													</svg>
													aUSD
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#52CCCE"/>
													</svg>
													kUSD
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#1a8587"/>
													</svg>
													USDT
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#95D47A"/>
													</svg>
													USDC
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-6 col-xxl-12 col-md-6">
							<div className="card">
								<div className="card-header pb-0 border-0">
									<h4 className="mb-0 fs-20 text-black">Loans</h4>
								</div>
								<div className="card-body py-2 text-center">
									<div id="pieChart" className="d-inline-block">
										<CurrentApexDonut donutPerc={loansDonutPerc} />
									</div>
									<div className="chart-items">
										<div className=" col-xl-12 col-sm-12">
											<div className="row text-black text-start fs-13 mt-4">
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#374C98"/>
													</svg>
													ACA
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#52CCCE"/>
													</svg>
													KAR
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#1a8587"/>
													</svg>
													DOT
												</span>
												<span className="mb-3 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#95D47A"/>
													</svg>
													XBTC
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>		
		</>
	)
}
export default Portofolio; 