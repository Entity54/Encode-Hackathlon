import React,{useState,useContext, useEffect} from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
 
//Import
import { ThemeContext } from "../../../context/ThemeContext";
import LoansMARKETPortfolio from "./LoansMARKETPortfolio";
import LoansMARKETOverview from "./LoansMARKETOverview";
import ManageLoan from '../Boltz/Home/ManageLoan';
import AuthorizeLoan from '../Boltz/Home/AuthorizeLoan';
import TransferFromLoan from '../Boltz/Home/TransferFromLoan';


import {EVM_Setup, oracle_EVM_PricesHuman, oracle_EVM_Icons, oracle_EVM_Description} from '../../../Predeployed_EVM.js';     //Blockchain provider,signer setup and helper functions
let icons = [], tickSymbols = [];


const CurrentRadialApex = loadable(() =>
	pMinDelay(import("../Boltz/Home/CurrentRadialApex"), 1000)
);
const MarketLineApex = loadable(() =>
	pMinDelay(import("../Boltz/Home/MarketLineApex"), 1000)
);


const Loans = ({ setupSpecs, blockHeader, customerLoans, loansOverviews, oraclePrices }) => {
	 
	const { changeBackground, background } = useContext(ThemeContext);

	//used to update prices
	const [chartData, setChartData] = useState(`Hello Intialization`);	
	setTimeout(() => {
		setChartData(
			[
				{
					name: 'series1',
					data: [200, 300, 250, 450, 300, 500, 300,350, 500, 300]
				}, 
				{
					name: 'series2',
					data: [400, 300, 450, 350, 700, 370, 800, 800, 700, 750]
				}
			]);
	},5000)		

	const [customer_splits, setCustomer_splits] = useState({ series: [35, 10, 25, 15, 15], labels: ['DOT', 'LDOT', 'XBTC', 'RENBTC', 'POLKABTC'] });	
	const [DOT_collateralPercentage, setDOT_collateralPercentage]            = useState();	
	const [LDOT_collateralPercentage, setLDOT_collateralPercentage]          = useState();	
	const [XBTC_collateralPercentage, stXBTC_collateralPercentage]           = useState();	
	const [RENBTC_collateralPercentage, setRENBTC_collateralPercentage]      = useState();	
	const [POLKABTC_collateralPercentage, setPOLKABTC_collateralPercentage]  = useState();	
	const [totalLoansInCoin, setTotalLoansInCoin]  = useState({DOT: undefined, LDOT: undefined, XBTC: undefined, RENBTC: undefined, POLKABTC: undefined });	


	useEffect(() => {
			if (customerLoans)
			{
				const totalIn_DOT = customerLoans? Number(customerLoans["DOT"].collateral) * Number(oraclePrices["DOT"]) : 0 ;
				const totalIn_LDOT = customerLoans? Number(customerLoans["LDOT"].collateral) * Number(oraclePrices["LDOT"]) : 0 ;
				const totalIn_XBTC = customerLoans? Number(customerLoans["XBTC"].collateral) * Number(oraclePrices["XBTC"]) : 0 ;
				const totalIn_RENBTC = customerLoans? Number(customerLoans["RENBTC"].collateral) * Number(oraclePrices["RENBTC"]) : 0 ;
				const totalIn_POLKABTC = customerLoans? Number(customerLoans["POLKABTC"].collateral) * Number(oraclePrices["POLKABTC"]) : 0 ;
	
				let totalCollateral = totalIn_DOT + totalIn_LDOT + totalIn_XBTC + totalIn_RENBTC + totalIn_POLKABTC;
				
				let DOT_collateralPerc = totalCollateral!==0? (100*totalIn_DOT / totalCollateral).toFixed(2) : 0 ;
				let LDOT_collateralPerc = totalCollateral!==0? (100*totalIn_LDOT / totalCollateral).toFixed(2) : 0 ;
				let XBTC_collateralPerc = totalCollateral!==0? (100*totalIn_XBTC / totalCollateral).toFixed(2) : 0 ;
				let RENBTC_collateralPerc = totalCollateral!==0? (100*totalIn_RENBTC / totalCollateral).toFixed(2) : 0 ;
				let POLKABTC_collateralPerc = totalCollateral!==0? (100*totalIn_POLKABTC / totalCollateral).toFixed(2) : 0 ;

				setDOT_collateralPercentage(DOT_collateralPerc);
				setLDOT_collateralPercentage(LDOT_collateralPerc);
				stXBTC_collateralPercentage(XBTC_collateralPerc);
				setRENBTC_collateralPercentage(RENBTC_collateralPerc);
				setPOLKABTC_collateralPercentage(POLKABTC_collateralPerc);

				setTotalLoansInCoin({DOT: totalIn_DOT, LDOT: totalIn_LDOT, XBTC: totalIn_XBTC, RENBTC: totalIn_RENBTC, POLKABTC: totalIn_POLKABTC });

				setCustomer_splits({series: [parseInt(DOT_collateralPerc), parseInt(LDOT_collateralPerc), parseInt(XBTC_collateralPerc), parseInt(RENBTC_collateralPerc), parseInt(POLKABTC_collateralPerc) ], options: { labels: ['DOT', 'LDOT', 'XBTC', 'RENBTC', 'POLKABTC'] } });
			}
	
	},[customerLoans])


	useEffect(() => {
		const keys= Object.keys(oracle_EVM_Icons);
		keys.forEach((item) => {
		  icons.push(oracle_EVM_Icons[item]); 
		});
		tickSymbols = keys;
	},[])


	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
						<LoansMARKETPortfolio className="col-xl-12" blockHeader={blockHeader} customerLoans={customerLoans} sparkPriceArray={"SprakLines"} totalLoansInCoin={totalLoansInCoin} />	
				</div>
			</div>
			<div className="row">
				<div className="col-xl-4 col-xxl-4">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h4 className="fs-20 mb-0">Loans Overview</h4>
						</div>
						<div className="card-body">
							<div id="currentChart">
								<CurrentRadialApex splits={customer_splits} />
							</div>
							<div className="chart-content">	
								<div className="d-flex justify-content-between mb-2 align-items-center">
									<div>
										<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="15" height="15" rx="7.5" fill="#EB8153"/>
										</svg>
										<span className="fs-14">DOT</span>
									</div>
									<div>
										<h5 className="mb-0">{DOT_collateralPercentage}%</h5>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-2 align-items-center">
									<div>
										<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="15" height="15" rx="7.5" fill="#4441DE"/>
										</svg>
										<span className="fs-14">LDOT</span>
									</div>
									<div>
										<h5 className="mb-0">{LDOT_collateralPercentage}%</h5>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-2 align-items-center">
									<div>
										<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="15" height="15" rx="7.5" fill="#60C695"/>
										</svg>
										<span className="fs-14">XBTC</span>
									</div>
									<div>
										<h5 className="mb-0">{XBTC_collateralPercentage}%</h5>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-2 align-items-center">
									<div>
										<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="15" height="15" rx="7.5" fill="#F34F80"/>
										</svg>
										<span className="fs-14">RENBTC</span>
									</div>
									<div>
										<h5 className="mb-0">{RENBTC_collateralPercentage}%</h5>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-2 align-items-center">
									<div>
										<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="15" height="15" rx="7.5" fill="#07EDE3"/>
										</svg>
										<span className="fs-14">POLKABTC</span>
									</div>
									<div>
										<h5 className="mb-0">{POLKABTC_collateralPercentage}%</h5>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>

				<div className="col-xl-8">
					<div className="row">
						<div className="col-xl-12 col-xxl-12">
							<ManageLoan icons={icons} tickSymbols={tickSymbols} customerLoans={customerLoans} blockHeader={blockHeader} />
						</div>
					</div>
				</div>

			</div>	

			<div className="row">
				<div className="col-xl-6 col-xxl-12">
					<AuthorizeLoan icons={icons} tickSymbols={tickSymbols} customerLoans={customerLoans} blockHeader={blockHeader} />
				</div>
				<div className="col-xl-6 col-xxl-12">
					<TransferFromLoan icons={icons} tickSymbols={tickSymbols} blockHeader={blockHeader} />
				</div>
			</div>

			<div className="row">
					<div className="col-xl-12">
						<LoansMARKETOverview className="col-xl-12" blockHeader={blockHeader} loansOverviews={loansOverviews} sparkPriceArray={"SprakLines"}/>	
					</div>
			</div>
		</>
	)
}
export default Loans;