import React,{useState,useEffect} from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import "bootstrap-daterangepicker/daterangepicker.css";
//Import
import VaultDetailTab from './VaultDetailTab';

import {EVM_Setup, oracle_EVM_PricesHuman, oracle_EVM_Icons, oracle_EVM_Description} from '../../../../Predeployed_EVM.js';     //Blockchain provider,signer setup and helper functions
let icons = [], tickSymbols = [];


const CoinLineChart1 = loadable(() =>
	pMinDelay(import("./CoinCharts/CoinLineChart1"), 1000)
);

const CoinDetailTab = ({ setupSpecs, blockChainSpecs, blockHeader, blockTimestamp, extension, accountList }) =>{
	 
	const vautMandate_ACA_DOT_MC =  (<div>
										<p className="fs-14">Vault holds Acala (ACA) and Polkadot (DOT) coins based on relative market capitilisations. Coins are staked at Acala to collect yield. This vault is eligible to collect liquidity incentives of platorm token T54.</p>
										<p className="fs-14">Yields are collected both in ACA from the Acala parachain and T54 from native platform. With proceeds more ACA and DOT are purchased according to Vault weights and deposited into Vault</p>
										<p className="fs-14">With Acala secure, fast and cheap transaction costs rebalancing happens as often as every ten blocks and proceeds reinvestments as often as every twenty blocks</p>
										<p className="fs-14">To participate in this Vault, ACA and DOT need to be deposited</p>
										<p className="fs-14">This vault is eligible for usage when setting finacial goals</p>
									</div>);
	const vautMandate_ACA_DCA =  (<div>
										<p className="fs-14">Vault holds Acala (ACA) coins. Coins are staked at Acala to collect yield. This vault is eligible to collect liquidity incentives of platorm token T54.</p>
										<p className="fs-14">Yields are collected both in ACA from the Acala parachain and T54 from native platform. With proceeds more ACA is purchased and deposited into Vault</p>
										<p className="fs-14">With Acala secure, fast and cheap transaction costs reinvestment can occur as often as every ten blocks. Dollar cost averaging frequency for this vault is currently voted in DAO at 7200 blocks</p>
										<p className="fs-14">To participate in this Vault, ACA needs to be deposited</p>
										<p className="fs-14">This vault is eligible for usage when setting finacial goals</p>
									</div>);
	const vautMandate_XBTC_RENBTC_POLKABTC_MC =  (<div>
										<p className="fs-14">Vault holds XBTC (XBTC) and RENBTC (RENBTC)  and POLKABTC (POLKABTC) coins based on relative market capitilisations. Coins are staked at Acala to collect yield. This vault is eligible to collect liquidity incentives of platorm token T54.</p>
										<p className="fs-14">Yields are collected both in ACA from the Acala parachain and T54 from native platform. With proceeds more XBTC, RENBTC and POLKABTC are purchased according to Vault weights and deposited into Vault</p>
										<p className="fs-14">With Acala secure, fast and cheap transaction costs rebalancing happens as often as every ten blocks and proceeds reinvestments as often as every twenty blocks</p>
										<p className="fs-14">To participate in this Vault, XBTC, RENBTC and POLKABTC need to be deposited</p>
										<p className="fs-14">This vault is eligible for usage when setting finacial goals</p>
									</div>);
	const vautMandate_custom_ACA_DOT_XBTC_MC =  (<div>
										<p className="fs-14">Vault holds Acala (ACA) and Polkadot (DOT) and XBTC (XBTC) coins based on relative market capitilisations. Coins are staked at Acala to collect yield. This vault is eligible to collect liquidity incentives of platorm token T54.</p>
										<p className="fs-14">Yields are collected both in ACA from the Acala parachain and T54 from native platform. With proceeds more ACA, DOT and XBTC are purchased according to Vault weights and deposited into Vault</p>
										<p className="fs-14">With Acala secure, fast and cheap transaction costs rebalancing happens as often as every ten blocks and proceeds reinvestments as often as every twenty blocks</p>
										<p className="fs-14">To participate in this Vault, ACA, DOT and XBTC need to be deposited</p>
										<p className="fs-14">This vault is eligible for usage when setting finacial goals</p>
									</div>);

	useEffect(() => {
		const keys= Object.keys(oracle_EVM_Icons);
		keys.forEach((item) => {
		  icons.push(oracle_EVM_Icons[item]); 
		});
		tickSymbols = keys;
	},[])



	return(
		<>
			<Tab.Container defaultActiveKey="ACA/DOT MC">
				<div className="d-flex flex-wrap mb-sm-4 mt-3 text-head">
					<h2 className="text-black me-auto font-w600 mb-2">VAULTS</h2>
					<div className="card-action coin-tabs mt-3 mt-sm-0">
						<Nav as="ul" className="nav nav-tabs" role="tablist">
							<Nav.Item as="li" className="nav-item">
								<Nav.Link as="a" className="nav-link "  eventKey="ACA/DOT MC" role="tab">
									<img src={icons[0]}  width="25"  height="25" alt="" />
									<img src={icons[2]}  width="25"  height="25" alt="" />
									ACA/DOT MC
								</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li" className="nav-item">
								<Nav.Link as="a" className="nav-link "  eventKey="ACA DCA" role="tab">
									<img src={icons[0]}  width="25"  height="25" alt="" />
									ACA DCA
								</Nav.Link>
							</Nav.Item>
							
							<Nav.Item as="li" className="nav-item">
								<Nav.Link as="a" className="nav-link "  eventKey="XBTC/RENBTC/POLKABTC MC" role="tab">
									<img src={icons[9]}  width="25"  height="25" alt="" />
									<img src={icons[4]}  width="25"  height="25" alt="" />
									<img src={icons[10]}  width="25"  height="25" alt="" />
									XBTC/RENBTC/POLKABTC MC
								</Nav.Link>
							</Nav.Item>
							
							<Nav.Item as="li" className="nav-item">
								<Nav.Link as="a" className="nav-link"  eventKey="custom_ACA/DOT/XBTC MC" role="tab">
									<img src={icons[0]}  width="25"  height="25" alt="" />
									<img src={icons[2]}  width="25"  height="25" alt="" />
									<img src={icons[9]}  width="25"  height="25" alt="" />
									custom_ACA
								</Nav.Link>
							</Nav.Item>
						 </Nav>	
					</div>
				</div>
				<Tab.Content className="tab-content">
					<Tab.Pane eventKey="ACA/DOT MC">
						<VaultDetailTab icons={icons} title={"ACA/DOT MC"} tokens={["ACA","DOT"]} vaultMandate={vautMandate_ACA_DOT_MC} vaultValues={{TVL:"117,857,000", numOfCoins:"10,763,196", coinPrice:"1.095", description:"Acala Polkadot Market Capitalisation Rebalanced" }} chart={"1"}  />
					</Tab.Pane>	
					<Tab.Pane eventKey="ACA DCA">
						<VaultDetailTab icons={icons} title={"ACA DCA"} tokens={["ACA"]} vaultMandate={vautMandate_ACA_DCA} vaultValues={{TVL:"117,857,000", numOfCoins:"10,763,196", coinPrice:"1.095", description:"Acala Dollar Cost Averaging" }} chart={"2"}   />
					</Tab.Pane>	
					<Tab.Pane eventKey="XBTC/RENBTC/POLKABTC MC">
						<VaultDetailTab icons={icons} title={"XBTC/RENBTC/POLKABTC MC"} tokens={["XBTC","RENBTC","POLKABTC"]} vaultMandate={vautMandate_XBTC_RENBTC_POLKABTC_MC} vaultValues={{TVL:"117,857,000", numOfCoins:"10,763,196", coinPrice:"1.095", description:"XBTC RENBTC and PolkaBTC Market Capitalisation Rebalanced" }} chart={"3"}   />
					</Tab.Pane>	
					<Tab.Pane eventKey="custom_ACA/DOT/XBTC MC">
						<VaultDetailTab icons={icons} title={"custom_ACA/DOT/XBTC MC"} tokens={["ACA","DOT","XBTC"]} vaultMandate={vautMandate_custom_ACA_DOT_XBTC_MC} vaultValues={{TVL:"117,857,000", numOfCoins:"10,763,196", coinPrice:"1.095", description:"Acala Polkadot XBTC Market Capitalisation Rebalanced" }} chart={"4"}   />
					</Tab.Pane>	
				</Tab.Content>		
			</Tab.Container>	
		</>
	)
}
export default CoinDetailTab;