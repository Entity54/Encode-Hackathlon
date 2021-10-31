import React,{useState,useContext, useEffect} from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown} from 'react-bootstrap';
 
//Import
import { ThemeContext } from "../../../context/ThemeContext";
import MARKET from "./MARKET";


const CurrentRadialApex = loadable(() =>
	pMinDelay(import("../Boltz/Home/CurrentRadialApex"), 1000)
);
const MarketLineApex = loadable(() =>
	pMinDelay(import("../Boltz/Home/MarketLineApex"), 1000)
);


const DashboardDark = ({ setupSpecs, blockChainSpecs, blockHeader, blockTimestamp, extension, accountList, oraclePrices, total_CoinSupply, customerPortfolioAnalytics }) => {
	const [duration2, setDuration2] = useState("Daily");		
	const { changeBackground, background } = useContext(ThemeContext);

	//used t update prices
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

	const [customer_splits, setCustomer_splits] = useState({ series: [15, 35, 40, 10], labels: ['Stablecoins', 'Tokens', 'Vaults', 'Loans'] });	

    //repeated in Portfolio Move to App.js and do the maths once	
	const [sector_stablecoins, setSector_stablecoins] = useState();	
	const [sector_tokens, setSector_tokens]            = useState();	
	const [sector_vaults, setSector_vaults]           = useState();	
	const [sector_loans, setSector_loans]             = useState();	

	useEffect(() => {
			if (customerPortfolioAnalytics)
			{
				let sec_stablecoins = customerPortfolioAnalytics.totalBalance!==0? (100*(customerPortfolioAnalytics.totalIn_Stablecoins / customerPortfolioAnalytics.totalBalance)).toFixed(2) : 0 ;
				let sec_tokens = customerPortfolioAnalytics.totalBalance!==0? (100*(customerPortfolioAnalytics.totalIn_Tokens / customerPortfolioAnalytics.totalBalance)).toFixed(2) : 0 ;
				let sec_vaults =customerPortfolioAnalytics.totalBalance!==0? (100*(customerPortfolioAnalytics.totalIn_Vaults / customerPortfolioAnalytics.totalBalance)).toFixed(2) : 0 ;
				let sec_loans = customerPortfolioAnalytics.totalBalance!==0? (100*(customerPortfolioAnalytics.totalIn_Loans / customerPortfolioAnalytics.totalBalance)).toFixed(2) : 0 ;
				
				setSector_stablecoins(sec_stablecoins);
				setSector_tokens(sec_tokens);
				setSector_vaults(sec_vaults);
				setSector_loans(sec_loans);
			
				setCustomer_splits({series: [parseInt(sec_stablecoins), parseInt(sec_tokens), parseInt(sec_vaults), parseInt(sec_loans)], options: { labels: ['Stablecoins', 'Tokens', 'Vaults', 'Loans'] } });
			}
	
	},[customerPortfolioAnalytics])

	
	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });

	}, []);
	return(
		<>
			<div className="row">

				<div className="col-xl-3 col-xxl-4">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h4 className="fs-20 mb-0">Account Balance Overview</h4>
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
										<span className="fs-14">Stablecoins ({sector_stablecoins}%)</span>
									</div>
									<div>
										<h5 className="mb-0">${customerPortfolioAnalytics? customerPortfolioAnalytics.totalIn_Stablecoins : 0}</h5>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-2 align-items-center">
									<div>
										<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="15" height="15" rx="7.5" fill="#4441DE"/>
										</svg>
										<span className="fs-14">Tokens ({sector_tokens}%)</span>
									</div>
									<div>
										<h5 className="mb-0">${customerPortfolioAnalytics? customerPortfolioAnalytics.totalIn_Tokens : 0}</h5>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-2 align-items-center">
									<div>
										<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="15" height="15" rx="7.5" fill="#60C695"/>
										</svg>
										<span className="fs-14">Vaults ({sector_vaults}%)</span>
									</div>
									<div>
										<h5 className="mb-0">${customerPortfolioAnalytics? customerPortfolioAnalytics.totalIn_Vaults : 0}</h5>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-2 align-items-center">
									<div>
										<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect width="15" height="15" rx="7.5" fill="#F34F80"/>
										</svg>
										<span className="fs-14">Loans ({sector_loans}%)</span>
									</div>
									<div>
										<h5 className="mb-0">${customerPortfolioAnalytics? customerPortfolioAnalytics.totalIn_Loans : 0}</h5>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>

				<div className="col-xl-9 col-xxl-8">
					<div className="card">
						<div className="card-header pb-0 border-0 flex-wrap">
							<div className="mb-3">
								<h4 className="fs-20 text-black">Market Overview</h4>
							</div>
							<div className="d-flex flex-wrap mb-2">
								<div className="form-check custom-checkbox me-4 default-checkbox">
									<input type="checkbox" className="form-check-input" id="customCheckBox1" required />
									<label className="form-check-label" htmlFor="customCheckBox1">ACA</label>
								</div>
								<div className="form-check custom-checkbox me-4 default-checkbox">
									<input type="checkbox" className="form-check-input" id="customCheckBox2" required />
									<label className="form-check-label" htmlFor="customCheckBox2">DOT</label>
								</div>
								<div className="form-check custom-checkbox me-4 default-checkbox">
									<input type="checkbox" className="form-check-input" id="customCheckBox3" required />
									<label className="form-check-label" htmlFor="customCheckBox3">XBTC</label>
								</div>
								<div className="form-check custom-checkbox me-4 default-checkbox">
									<input type="checkbox" className="form-check-input" id="customCheckBox4" required />
									<label className="form-check-label" htmlFor="customCheckBox4">RENBTC</label>
								</div>
								<div className="form-check custom-checkbox me-4 default-checkbox">
									<input type="checkbox" className="form-check-input" id="customCheckBox4" required />
									<label className="form-check-label" htmlFor="customCheckBox4">POLKABTC</label>
								</div>
							</div>
							<Dropdown className=" weather-btn mb-2">
								<Dropdown.Toggle variant="" as="div" className="form-control style-2 default-select border text-primary">{duration2} </Dropdown.Toggle>
								<Dropdown.Menu >
									<Dropdown.Item onClick={() => setDuration2("Hourly")}>Hourly</Dropdown.Item>
									<Dropdown.Item onClick={() => setDuration2("Daily")}>Daily</Dropdown.Item>
									<Dropdown.Item onClick={() => setDuration2("Weekly")}>Weekly</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<div className="card-body pb-0 pt-3">
							<div id="marketChart" className="market-line">
								<MarketLineApex chartData={chartData} />
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-xl-12">
						<MARKET className="col-xl-12" blockHeader={blockHeader} oraclePrices={oraclePrices} sparkPriceArray={"SprakLines"} total_CoinSupply={total_CoinSupply} />	
					</div>
				</div>
			</div>	
		</>
	)
}
export default DashboardDark;