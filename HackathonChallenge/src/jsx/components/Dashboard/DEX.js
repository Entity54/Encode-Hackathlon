import React,{useState,useContext, useEffect} from 'react';
 
//Import
import { ThemeContext } from "../../../context/ThemeContext";
import QuickTrade from '../Boltz/Home/QuickTrade';
import QuickTransfer from '../Boltz/Home/QuickTransfer';

import {EVM_Setup, oracle_EVM_PricesHuman, oracle_EVM_Icons, oracle_EVM_Description} from '../../../Predeployed_EVM.js';     //Blockchain provider,signer setup and helper functions
let icons = [], tickSymbols = [];


const DEX = ({ setupSpecs, blockHeader, oraclePrices, customerPortfolio }) => {
	const { changeBackground, background } = useContext(ThemeContext);

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
				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-6 col-xxl-12">
							<QuickTrade icons={icons} tickSymbols={tickSymbols} oraclePrices={oraclePrices} blockHeader={blockHeader} customerPortfolio={customerPortfolio} />
						</div>

						<div className="col-xl-6 col-xxl-12">
							<QuickTransfer icons={icons} tickSymbols={tickSymbols} blockHeader={blockHeader} customerPortfolio={customerPortfolio} />
						</div>
					</div>
				</div>

		</>
	)
}
export default DEX;