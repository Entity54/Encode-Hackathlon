import React, { useState, useRef, useEffect } from "react";

import {EVM_Setup, oracle_EVM_PricesHuman, oracle_EVM_Icons, oracle_EVM_Description, TokenBindings, LP_TokenBindings} from '../../../Predeployed_EVM.js';     //Blockchain provider,signer setup and helper functions
let rates = [], icons = [], descriptions = [], totalSupply = [];


//TODO sparkPriceArray
const sampleData1 = [2,2,2,4,4,5,4,6,5,7,6,8,7,9,8,4,7,6,8,7];
const sampleData2 = [2,3,4,5,6,5,4,6,5,7,2,3,4,5,3,2,5,4,5,7];
const sampleData3 = [2,2,4,3,2,4,3,3,4,2,1,3,2,4,2,3,5,4,3,2];
const sampleData4 = [6,2,3,2,3,5,3,3,7,2,4,7,5,1,3,6,5,9];
const sampleData5 = [6,2,3,2,3,5,4,3,2,2,4,5,2,5,5,4,3,1,3,4,5,6];
const sampleData6 = [1,2,3,1,4,2,4,2,2,1,2,5,1,4,1,1,5,4,3,2,4,2];
const sampleData7 = [2,3,4,5,6,5,4,6,5,7,2,3,4,5,3,2,5,4,5,7];
const sampleData8 = [2,2,2,4,4,5,4,6,5,7,6,8,7,9,8,4,7,6,8,7];
const sampleData9 = [1,2,3,1,4,2,4,2,2,1,2,5,1,4,1,1,5,4,3,2,4,2];

const MarketCapital = ({ blockHeader, loansOverviews, sparkPriceArray }) => {

	const [data, setData] = useState(document.querySelectorAll("#marketCapitalLMO tbody tr"));
	const sort = 9;
	const activePag = useRef(0);
	const [test, settest] = useState(0);

  // Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};

	useEffect(() => {
		    const keys= Object.keys(oracle_EVM_Description);
			keys.forEach((item) => {
				icons.push(oracle_EVM_Icons[item]); 
				descriptions.push(oracle_EVM_Description[item]); 
			});
	},[])

	useEffect(() => {
		// console.log(`DASHBOARDDARL>MARKET 1  blockHeader.number: `,blockHeader.number)

		if (blockHeader && typeof oracle_EVM_PricesHuman["DOT"] !== "undefined")
		{
			// console.log(`DASHBOARDDARL>MARKET 2 *** > blockHeader.number: ${blockHeader.number} oracle_EVM_PricesHuman: `,oracle_EVM_PricesHuman);
			const keys= Object.keys(oracle_EVM_PricesHuman);
			rates =[];
			keys.forEach((item) => {
				rates.push(`${oracle_EVM_PricesHuman[item]}`);
				totalSupply.push( TokenBindings[item].totalSupply );
			});
			// console.log(`DASHBOARDDARL>MARKET 3  totalSupply: `,totalSupply);

			// oracle_EVM_Prices = { ACA: ACA_price, AUSD: AUSD_price, DOT: DOT_price, LDOT: LDOT_price, RENBTC: RENBTC_price, KAR: KAR_price, KUSD: KUSD_price, KSM: KSM_price, LKSM: LKSM_price };
		}

	}, [blockHeader])


	useEffect(() => {
		setData(document.querySelectorAll("#marketCapitalLMO tbody tr"));
	}, [test]);

  // Active pagginarion
	activePag.current === 0 && chageData(0, sort);
	// paggination
	let paggination = Array(Math.ceil(data.length / sort))
		.fill()
		.map((_, i) => i + 1);

  // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};

	
  return (
    <>
		<div className="row">
			<div className="col-xl-12">
				<div className="table-responsive table-hover fs-14 ">
					<div id="example6_wrapper" className="dataTables_wrapper no-footer">
						<div className="card-header border-0 pb-0">
							<h4 className="mb-0 fs-28 text-black">Loan Market Overview</h4>
						</div>
						<table className="table display mb-4 dataTablesCard font-w600  market-tbl border-no text-black dataTable no-footer border-0" 
							id="marketCapitalLMO" role="grid" aria-describedby="example6_info">
							<thead>
								<tr role="row">
									<th className="sorting_asc" tabIndex={0}  rowSpan={1} colSpan={1}>Coin</th>
									<th className="sorting" tabIndex={0}  rowSpan={1} colSpan={1}>Collateral</th>
									<th className="sorting" tabIndex={0}  rowSpan={1} colSpan={1}>Debit (aUSD)</th>
									<th className="sorting" tabIndex={0}  rowSpan={1} colSpan={1}>Debit Exchange Rate</th>
									<th className="sorting" tabIndex={0}  rowSpan={1} colSpan={1}>Max Total Debit Value</th>

									<th className="sorting" tabIndex={0}  rowSpan={1} colSpan={1}>Stability Fee %</th>
									<th className="sorting" tabIndex={0}  rowSpan={1} colSpan={1}>Liquidatio Ratio %</th>
									<th className="sorting" tabIndex={0}  rowSpan={1} colSpan={1}>Liquidation Penalty %</th>
									<th className="sorting" tabIndex={0}  rowSpan={1} colSpan={1}>Required Collateral Ratio %</th>
							   </tr>
							</thead>
							<tbody>
								<tr role="row" className="odd">
									<td className="wspace-no"><img alt="images" width={50} src={icons[2]} />{descriptions[2]}</td>
									<td className="sorting_1"><span className="rank-ic fs-20">{loansOverviews? loansOverviews["DOT"].collateral : "..."}</span></td>
									<td>{loansOverviews? loansOverviews["DOT"].debit : "..."}</td>
									<td>{loansOverviews? loansOverviews["DOT"].debitExchangeRate : "..."}</td>
									<td>{loansOverviews? loansOverviews["DOT"].maximumTotalDebitValue : "..."}</td>
									<td>{loansOverviews? loansOverviews["DOT"].stabilityFee : "..."}</td>
									<td>{loansOverviews? loansOverviews["DOT"].liquidationRatio : "..."}</td>
									<td>{loansOverviews? loansOverviews["DOT"].liquidationPenalty : "..."}</td>
									<td>{loansOverviews? loansOverviews["DOT"].requiredCollateralRatio : "..."}</td>
								</tr>
								<tr role="row" className="even">
									<td className="wspace-no"><img alt="images" width={50} src={icons[3]} />{descriptions[3]}</td>
									<td className="sorting_1"><span className="rank-ic fs-20">{loansOverviews? loansOverviews["LDOT"].collateral : "..."}</span></td>
									<td>{loansOverviews? loansOverviews["LDOT"].debit : "..."}</td>
									<td>{loansOverviews? loansOverviews["LDOT"].debitExchangeRate : "..."}</td>
									<td>{loansOverviews? loansOverviews["LDOT"].maximumTotalDebitValue : "..."}</td>
									<td>{loansOverviews? loansOverviews["LDOT"].stabilityFee : "..."}</td>
									<td>{loansOverviews? loansOverviews["LDOT"].liquidationRatio : "..."}</td>
									<td>{loansOverviews? loansOverviews["LDOT"].liquidationPenalty : "..."}</td>
									<td>{loansOverviews? loansOverviews["LDOT"].requiredCollateralRatio : "..."}</td>
								</tr>
								<tr role="row" className="odd">
									<td className="wspace-no"><img alt="images" width={50} src={icons[4]} />{descriptions[4]}</td>
									<td className="sorting_1"><span className="rank-ic fs-20">{loansOverviews? loansOverviews["RENBTC"].collateral : "..."}</span></td>
									<td>{loansOverviews? loansOverviews["RENBTC"].debit : "..."}</td>
									<td>{loansOverviews? loansOverviews["RENBTC"].debitExchangeRate : "..."}</td>
									<td>{loansOverviews? loansOverviews["RENBTC"].maximumTotalDebitValue : "..."}</td>
									<td>{loansOverviews? loansOverviews["RENBTC"].stabilityFee : "..."}</td>
									<td>{loansOverviews? loansOverviews["RENBTC"].liquidationRatio : "..."}</td>
									<td>{loansOverviews? loansOverviews["RENBTC"].liquidationPenalty : "..."}</td>
									<td>{loansOverviews? loansOverviews["RENBTC"].requiredCollateralRatio : "..."}</td>
								</tr>
								<tr role="row" className="even">
									<td className="wspace-no"><img alt="images" width={50} src={icons[9]} />{descriptions[9]}</td>
									<td className="sorting_1"><span className="rank-ic fs-20">{loansOverviews? loansOverviews["XBTC"].collateral : "..."}</span></td>
									<td>{loansOverviews? loansOverviews["XBTC"].debit : "..."}</td>
									<td>{loansOverviews? loansOverviews["XBTC"].debitExchangeRate : "..."}</td>
									<td>{loansOverviews? loansOverviews["XBTC"].maximumTotalDebitValue : "..."}</td>
									<td>{loansOverviews? loansOverviews["XBTC"].stabilityFee : "..."}</td>
									<td>{loansOverviews? loansOverviews["XBTC"].liquidationRatio : "..."}</td>
									<td>{loansOverviews? loansOverviews["XBTC"].liquidationPenalty : "..."}</td>
									<td>{loansOverviews? loansOverviews["XBTC"].requiredCollateralRatio : "..."}</td>
								</tr>
								<tr role="row" className="odd">
									<td className="wspace-no"><img alt="images" width={50} src={icons[10]} />{descriptions[10]}</td>
									<td className="sorting_1"><span className="rank-ic fs-20">{loansOverviews? loansOverviews["POLKABTC"].collateral : "..."}</span></td>
									<td>{loansOverviews? loansOverviews["POLKABTC"].debit : "..."}</td>
									<td>{loansOverviews? loansOverviews["POLKABTC"].debitExchangeRate : "..."}</td>
									<td>{loansOverviews? loansOverviews["POLKABTC"].maximumTotalDebitValue : "..."}</td>
									<td>{loansOverviews? loansOverviews["POLKABTC"].stabilityFee : "..."}</td>
									<td>{loansOverviews? loansOverviews["POLKABTC"].liquidationRatio : "..."}</td>
									<td>{loansOverviews? loansOverviews["POLKABTC"].liquidationPenalty : "..."}</td>
									<td>{loansOverviews? loansOverviews["POLKABTC"].requiredCollateralRatio : "..."}</td>
								</tr>
							</tbody>
						</table>
						<div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
							<div className="dataTables_info">
								  Showing {activePag.current * sort + 1} to{" "}
								  {data.length > (activePag.current + 1) * sort
									? (activePag.current + 1) * sort
									: data.length}{" "}
								  of {data.length} entries
							</div>
							<div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
								<span className="paginate_button previous disabled" to="">
									Previous
								</span>
								  <span> 
									{paggination.map((number, i) => (
										<span key={i} to="/market-capital" className={`paginate_button  ${ activePag.current === i ? "current" : "" } `}  
											style={{ display: "inline-block" }}>{number}
										</span>
									))}
								  </span>
								<span className="paginate_button next" to="">
									Next
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>
  );
};

export default MarketCapital;
