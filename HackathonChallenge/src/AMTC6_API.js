// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {getSigner} from './Setup.js';     //getSigner using seed phrase to be able to signAndSend transactions
// import ChangeMessage from './ChangeMessage.js';
// import { ethers } from 'ethers';
// import BasicToken01_raw from './Abis/BasicToken01';
// import { CurrencyId, Balance, AccounId} from '@acala-network/types/interfaces';   //used exclusively for transfer currency / balance events




let api,decimals,selectedAddress, extension;
let acaBalance, ausdBalance, dotBalance, ldotBalance,renbtcBalance,karBalance,kusdBalance,ksmBalance,lksmBalance,xbtcBalance,polkabtcBalance,plmBalance,phaBalance,hdtBalance,bcgBalance,sdnBalance;
let customer_portfolio = { ACA: undefined , AUSD: undefined, DOT: undefined , LDOT: undefined, RENBTC: undefined  , KAR: undefined
                         , KUSD: undefined, KSM: undefined , LKSM: undefined, XBTC: undefined, POLKABTC: undefined, PLM: undefined 
                         , PHA: undefined , HDT: undefined, BCG: undefined, SDN: undefined};

let  acaAusdPool,dotAusdPool,ldotAusdPool,xbtcAusdPool,renbtcAusdPool,polkabtcAusdPool,plmAusdPool,hdtAusdPool,sdnAusdPool,bcgAusdPool;                        
let oracle_API_Prices = { ACA: undefined, DOT: undefined, LDOT: undefined, XBTC: undefined, RENBTC: undefined, POLKABTC: undefined, PLM: undefined, HDT: undefined, SDN: undefined , BCA: undefined  };

let accountLoans;     
let loansOverview;




const formatNumber = (number, decimals) => {
    if (number.toString() === "0") return "0";
    return (Number(number.toString()) / 10 ** decimals).toFixed(5);
};


// const AMTC6_FE = ({ extension, blockHeader, accountList, setupSpecs, getCurrentGasPrice}) => {
// }



const update_CustomerAccount = async (customerAddress, blockHeader) => {
    selectedAddress = customerAddress;
    console.log(`AMTC6_API update_CustomerAccount selectedAddress: ${selectedAddress}`)
    await getAccountBalanceSnapshot();  //while waiting to subscribe to account events  
    await getAccountLoans();
    if (blockHeader) await getLoansOverview(blockHeader);
    await subscribeToAccountEvents();
};

const setExtensionAPI = (_extension) => {
    extension = _extension;
};

    // const [api, setApi] = useState();
    // const [decimals, setDecimals] = useState();
    // const [selectedAddress, setSelectedAddress] = useState();

    // const [acaBalance, setACABalance]   = useState();
    // const [ausdBalance, setAUSDBalance] = useState();
    // const [dotBalance, setDOTBalance]   = useState();
    // const [ldotBalance, setLDOTBalance]   = useState();
    // const [renbtcBalance, setRENBTCBalance]   = useState();
    // const [karBalance, setKARBalance]   = useState();
    // const [kusdBalance, setKUSDBalance]   = useState();
    // const [ksmBalance, setKSMBalance]   = useState();
    // const [lksmBalance, setLKSMBalance]   = useState();
    // const [xbtcBalance, setXBTCBalance]   = useState();
    // const [polkabtcBalance, setPOLKABTCBalance]   = useState();
    // const [plmBalance, setPLMBalance]   = useState();
    // const [phaBalance, setPHABalance]   = useState();
    // const [hdtBalance, setHDTBalance]   = useState();
    // const [bcgBalance, setBCGBalance]   = useState();
    // const [sdnBalance, setSDNBalance]   = useState();

    //LIQUIDITY POOLS
    // const [ACAAUSD, setACAAUSD] = useState(0);
    // const [DOTAUSD, setDOTAUSD] = useState(0);
    // const [LDOTAUSD, setLDOTAUSD] = useState(0);
    // const [XBTCAUSD, setXBTCAUSD] = useState(0);
    // const [RENBTCAUSD, setRENBTCAUSD] = useState(0);
    // const [POLKABTCAUSD, setPOLKABTCAUSD] = useState(0);
    // const [PLMAUSD, setPLMAUSD] = useState(0);
    // const [HDTAUSD, setHDTAUSD] = useState(0);
    // const [SDNAUSD, setSDNAUSD] = useState(0);
    // const [BCGAUSD, setBCGAUSD] = useState(0);

    // const [statusACAAUSD, setStatusACAAUSD] = useState();
    // const [statusDOTAUSD, setStatusDOTAUSD] = useState();
    // const [statusLDOTAUSD, setStatusLDOTAUSD] = useState();
    // const [statusXBTCAUSD, setStatusXBTCAUSD] = useState();
    // const [statusRENBTCAUSD, setStatusRENBTCAUSD] = useState();
    // const [statusPOLKABTCAUSD, setStatusPOLKABTCAUSD] = useState();
    // const [statusPLMAUSD, setStatusPLMAUSD] = useState();
    // const [statusHDTAUSD, setStatusHDTAUSD] = useState();
    // const [statusSDNAUSD, setStatusSDNAUSD] = useState();
    // const [statusBCGAUSD, setStatusBCGAUSD] = useState();

    /*
    const [input_Supply_ACA, setInput_Supply_ACA] = useState("");
    const [swapWithExactSupply_IsSubmiting, setSwapWithExactSupply_IsSubmiting] = useState(false);

    const [input_target_AUSD, setInput_target_AUSD] = useState("");
    const [input_maxSupply_ACA, setInput_maxSupply_ACA] = useState("");
    const [swapWithExactTarget_IsSubmiting, setSwapWithExactTarget_IsSubmiting] = useState(false);

    const [input_liq_ACA, setInput_Liq_ACA] = useState("");
    const [input_liq_AUSD, setInput_Liq_AUSD] = useState("");
    const [isAddLiquiditySubmiting, setIsAddLiquiditySubmiting] = useState(false);

    const [input_removeliquidity_Shares, setInput_RemoveLiquidityShares] = useState("");
    const [isRemovingLiquiditySubmiting, setIsRemoveLiquiditySubmiting] = useState(false);

    const [input_balanceToTransfer, setInput_BalanceToTransfer] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [isBalanceToTransferSubmiting, setIsBalanceToTransferSubmiting] = useState(false);
    
    const [input_currencyToTransfer, setInput_CurrencyToTransfer] = useState("");
    const [currencyDestinationAddress, setCurrencyDestinationAddress] = useState("");
    const [input_transferToken, setInput_transferToken] = useState("");
    const [isCurrencyToTransferSubmiting, setIsCurrencyToTransferSubmiting] = useState(false);

    //LOANS 
    const [loans_DOT, setLoans_DOT] = useState({hash: "", collateral: "", debit: "" });
    const [loans_LDOT, setLoans_LDOT] = useState({hash: "",collateral: "", debit: "" });
    const [loans_XBTC, setLoans_XBTC] = useState({hash: "", collateral: "", debit: "" });
    const [loans_RENBTC, setLoans_RENBTC] = useState({hash: "", collateral: "", debit: "" });
    const [loans_POLKABTC, setLoans_POLKABTC] = useState({hash: "", collateral: "", debit: "" });

    const [total_loans_DOT, setTotalLoans_DOT] = useState({hash: "", collateral: "", debit: "", debitExchangeRate: "" });
    const [total_loans_LDOT, setTotalLoans_LDOT] = useState({hash: "",collateral: "", debit: "", debitExchangeRate: "" });
    const [total_loans_XBTC, setTotalLoans_XBTC] = useState({hash: "", collateral: "", debit: "", debitExchangeRate: "" });
    const [total_loans_RENBTC, setTotalLoans_RENBTC] = useState({hash: "", collateral: "", debit: "", debitExchangeRate: "" });
    const [total_loans_POLKABTC, setTotalLoans_POLKABTC] = useState({hash: "", collateral: "", debit: "", debitExchangeRate: "" });

    const [loans_DOT_Params, setLoans_DOT_Params] = useState({maximumTotalDebitValue: "", stabilityFee: "", liquidationRatio: "", liquidationPenalty: "", requiredCollateralRatio: "" });
    const [loans_LDOT_Params, setLoans_LDOT_Params] = useState({maximumTotalDebitValue: "", stabilityFee: "", liquidationRatio: "", liquidationPenalty: "", requiredCollateralRatio: "" });
    const [loans_XBTC_Params, setLoans_XBTC_Params] = useState({maximumTotalDebitValue: "", stabilityFee: "", liquidationRatio: "", liquidationPenalty: "", requiredCollateralRatio: "" });
    const [loans_RENBTC_Params, setLoans_RENBTC_Params] = useState({maximumTotalDebitValue: "", stabilityFee: "", liquidationRatio: "", liquidationPenalty: "", requiredCollateralRatio: "" });
    const [loans_POLKABTC_Params, setLoans_POLKABTC_Params] = useState({maximumTotalDebitValue: "", stabilityFee: "", liquidationRatio: "", liquidationPenalty: "", requiredCollateralRatio: "" });


    const [input_CollateralTokenSumbol, setInput_CollateralTokenSumbol] = useState("");
    const [autorizeeAddress, setAuthorizeeAddress] = useState("");
    const [isCollateralTokenSubmiting, setIsCollateralTokenSubmiting] = useState(false);
    const [isUnauthorizeSubmiting, setIsUnauthorizeSubmiting] = useState(false);
    const [isUnauthorizeALLSubmiting, setIsUnauthorizeALLSubmiting] = useState(false);


    const [input_LoanAdjust_CollateralTokenSymbol, setInput_LoanAdjust_CollateralTokenSymbol] = useState("");
    const [input_adjust_collateral_depositWithdraw, setInput_adjust_collateral_depositWithdraw] = useState("");
    const [input_adjust_borrowRepay_AUSD, setInput_adjust_borrowRepay_AUSD] = useState("");
    const [isAdjustLoanSubmiting, setIsAdjustLoanSubmiting] = useState(false);

    const [input_LoanClose_CollateralTokenSymbol, setInput_LoanClose_CollateralTokenSymbol] = useState("");
    const [isCloseLoanSubmiting, setIsCloseLoanSubmiting] = useState(false);

    const [input_LoanTransfer_CollateralTokenSymbol, setInput_LoanTransfer_CollateralTokenSymbol] = useState("");
    const [input_LoanTransfer_FromAccount, setInput_LoanTransfer_FromAccount] = useState("");
    const [isTransferLoanSubmiting, setIsTransferLoanSubmiting] = useState(false);

    const [sc, setSC]                             = useState({ scAddress: null, scABI: null, scReadOnly: null, scAbstraction: null });
    const [scStateVariables, setSCStateVariables] = useState({ name: null, symbol: null, message: "" });
   */

    //#region Setup API
    // useEffect(() => {

        const API_Setup = async (setupSpecs) => {
            if (setupSpecs.connected === 'Connected to AcalaMandalaTC6')
            {
                console.log('AMTC6_API API_Setup setupSpecs.connected : ',setupSpecs.connected);

                api = await setupSpecs.provider.api;

                //#region created object decimals with symbol: Numberofdecimals key:value
                if (api) {
                      // api.rpc.system.properties().then((result) => {
                      const result = await api.rpc.system.properties();
                      let _decimals = {};
                      const tokenDecimals = result.tokenDecimals.isNone ? [] : result.tokenDecimals.value;
                      const tokenSymbol = result.tokenSymbol.isNone ? [] : result.tokenSymbol.value;
                      for (let i = 0; i < tokenSymbol.length; i++) {
                        _decimals[tokenSymbol[i]] = tokenDecimals[i].toNumber();
                      }
                      decimals = _decimals;
                      console.log(`AMTC6 decimals: `,decimals);  //{ACA: 13, AUSD: 12, DOT: 10, HDT: 12, KAR: 12, KSM: 12, KUSD: 12, LDOT: 10, LKSM: 12, PHA: 18, PLM: 18, POLKABTC: 8, RENBTC: 8, SDN: 18, XBTC: 8}
                    // });
                }
                //#endregion

                return true
            } else return false
        }
        // runSetup();

    // }, [setupSpecs.connected]);   
    //#endregion Setup API

  
     
    //#region token balance event listeners for selectedAddress
    const getAccountBalanceSnapshot = async () => {
        if (api && decimals && selectedAddress) {

            console.log(`AMTC6 getAccountBalanceSnapshot decimals: `,decimals,`selectedAddress: ${selectedAddress}`);

            let result;
            result = await api.query.system.account(selectedAddress);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance ACA (cash) ${result.data.free} nonce: ${result.nonce} result: `,result);
            // setACABalance(result.data.free);
            acaBalance = result.data.free;
            customer_portfolio["ACA"] = formatedACA();
           
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "AUSD",} );
            // setAUSDBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance AUSD ${result.free}  results: `,result);
            ausdBalance = result.free;
            customer_portfolio["AUSD"] = formatedAUSD();
             
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "DOT",} );
            // setDOTBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance DOT ${result.free}  results: `,result);
            dotBalance = result.free;
            customer_portfolio["DOT"] = formatedDOT();
           
            result =  await api.query.tokens.accounts(selectedAddress, { TOKEN: "LDOT",} );
            // setLDOTBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance LDOT ${result.free}  results: `,result);
            ldotBalance = result.free;
            customer_portfolio["LDOT"] = formatedLDOT();
          
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "RENBTC",} );
            // setRENBTCBalance(result.free);
            console.log(`getAccountBalanceSnapshotFor account ${selectedAddress} Balance RENBTC ${result.free}  results: `,result);
            renbtcBalance = result.free;
            customer_portfolio["RENBTC"] = formatedRENBTC();
          
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "KAR",} );
            // setKARBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance KAR ${result.free}  results: `,result);
            karBalance = result.free;
            customer_portfolio["KAR"] = formatedKAR();
        
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "KUSD",} );
            // setKUSDBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance KUSD ${result.free}  results: `,result);
            kusdBalance = result.free;
            customer_portfolio["KUSD"] = formatedKUSD();
         
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "KSM",} );
            // setKSMBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance KSM ${result.free}  results: `,result);
            ksmBalance = result.free;
            customer_portfolio["KSM"] = formatedKSM();
             
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "XBTC",} );
            // setXBTCBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance XBTC ${result.free}  results: `,result);
            xbtcBalance = result.free;
            customer_portfolio["XBTC"] = formatedXBTC();
             
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "POLKABTC",} );
            // setPOLKABTCBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance POLKABTC ${result.free}  results: `,result);
            polkabtcBalance = result.free;
            customer_portfolio["POLKABTC"] = formatedPOLKABTC();
           
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "PLM",} );
            // setPLMBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance PLM ${result.free}  results: `,result);
            plmBalance = result.free;
            customer_portfolio["PLM"] = formatedPLM();
             
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "PHA",} );
            // setPHABalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance PHA ${result.free}  results: `,result);
            phaBalance = result.free;
            customer_portfolio["PHA"] = formatedPHA();
           
            // result = await api.query.tokens.accounts(selectedAddress);
            //     // setHDTBalance(result.free);
            //     hdtBalance = result.free;
            //     customer_portfolio["HDT"] = formatedHDT();
            // });
            // result= await api.query.tokens.accounts(selectedAddress);
            //     // setBCGBalance(result.free);
            //     console.log(`For account ${selectedAddress} Balance BCG ${result.free}  results: `,result);
            //     bcgBalance = result.free;
            //     customer_portfolio["BCG"] = formatedBCG();
            // });
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "LKSM",} )
            // setLKSMBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance LKSM ${result.free}  results: `,result);
            lksmBalance = result.free;
            customer_portfolio["LKSM"] = formatedLKSM();
            
            result = await api.query.tokens.accounts(selectedAddress, { TOKEN: "SDN",} );
            // setSDNBalance(result.free);
            console.log(`getAccountBalanceSnapshot For account ${selectedAddress} Balance SDN ${result.free}  results: `,result);
            sdnBalance = result.free;
            customer_portfolio["SDN"] = formatedSDN();

            console.log(`AMTC6-API .customer_portfolio: `,customer_portfolio);
            
            return true;
        } else return false;
    }





    // useEffect(() => {
    let unsubACA, unsubAUSD, unsubDOT, unsubLDOT, unsubRENBTC, unsubKAR, unsubKUSD, unsubKSM, unsubXBTC, unsubPOLKABTC, unsubPLM, unsubPHA, unsubHDT, unsubBCG, unsubLKSM, unsubSDN;
    let alreadySubscribedToAccountEvents = false;
    const subscribeToAccountEvents = async () => {
        if (api && decimals && selectedAddress) {

            console.log(`AMTC6 subscribeToAccountEvents decimals: `,decimals,`selectedAddress: ${selectedAddress} alreadySubscribedToAccountEvents: ${alreadySubscribedToAccountEvents}`);

            if (alreadySubscribedToAccountEvents) unsubscribeToAccountEvents();

            unsubACA = await api.query.system.account(selectedAddress, (result) => {
                    console.log(`For account ${selectedAddress} Balance ACA (cash) ${result.data.free} nonce: ${result.nonce} result: `,result);
                    // setACABalance(result.data.free);
                    acaBalance = result.data.free;
                    customer_portfolio["ACA"] = formatedACA();
            });
            unsubAUSD = await api.query.tokens.accounts(selectedAddress, { TOKEN: "AUSD",} , (result) => {
                // setAUSDBalance(result.free);
                console.log(`For account ${selectedAddress} Balance AUSD ${result.free}  results: `,result);
                ausdBalance = result.free;
                customer_portfolio["AUSD"] = formatedAUSD();
            });
            unsubDOT = await api.query.tokens.accounts(selectedAddress, { TOKEN: "DOT",} , (result) => {
                // setDOTBalance(result.free);
                console.log(`For account ${selectedAddress} Balance DOT ${result.free}  results: `,result);
                dotBalance = result.free;
                customer_portfolio["DOT"] = formatedDOT();
            });
            unsubLDOT = await api.query.tokens.accounts(selectedAddress, { TOKEN: "LDOT",} , (result) => {
                // setLDOTBalance(result.free);
                console.log(`For account ${selectedAddress} Balance LDOT ${result.free}  results: `,result);
                ldotBalance = result.free;
                customer_portfolio["LDOT"] = formatedLDOT();
            });
            unsubRENBTC = await api.query.tokens.accounts(selectedAddress, { TOKEN: "RENBTC",} , (result) => {
                // setRENBTCBalance(result.free);
                console.log(`For account ${selectedAddress} Balance RENBTC ${result.free}  results: `,result);
                renbtcBalance = result.free;
                customer_portfolio["RENBTC"] = formatedRENBTC();
            });
            unsubKAR = await api.query.tokens.accounts(selectedAddress, { TOKEN: "KAR",} , (result) => {
                // setKARBalance(result.free);
                console.log(`For account ${selectedAddress} Balance KAR ${result.free}  results: `,result);
                karBalance = result.free;
                customer_portfolio["KAR"] = formatedKAR();
            });
            unsubKUSD = await api.query.tokens.accounts(selectedAddress, { TOKEN: "KUSD",} , (result) => {
                // setKUSDBalance(result.free);
                console.log(`For account ${selectedAddress} Balance KUSD ${result.free}  results: `,result);
                kusdBalance = result.free;
                customer_portfolio["KUSD"] = formatedKUSD();
            });
            unsubKSM = await api.query.tokens.accounts(selectedAddress, { TOKEN: "KSM",} , (result) => {
                // setKSMBalance(result.free);
                console.log(`For account ${selectedAddress} Balance KSM ${result.free}  results: `,result);
                ksmBalance = result.free;
                customer_portfolio["KSM"] = formatedKSM();
            });
            unsubXBTC = await api.query.tokens.accounts(selectedAddress, { TOKEN: "XBTC",} , (result) => {
                // setXBTCBalance(result.free);
                console.log(`For account ${selectedAddress} Balance XBTC ${result.free}  results: `,result);
                xbtcBalance = result.free;
                customer_portfolio["XBTC"] = formatedXBTC();
            });
            unsubPOLKABTC = await api.query.tokens.accounts(selectedAddress, { TOKEN: "POLKABTC",} , (result) => {
                // setPOLKABTCBalance(result.free);
                console.log(`For account ${selectedAddress} Balance POLKABTC ${result.free}  results: `,result);
                polkabtcBalance = result.free;
                customer_portfolio["POLKABTC"] = formatedPOLKABTC();
            });
            unsubPLM = await api.query.tokens.accounts(selectedAddress, { TOKEN: "PLM",} , (result) => {
                // setPLMBalance(result.free);
                console.log(`For account ${selectedAddress} Balance PLM ${result.free}  results: `,result);
                plmBalance = result.free;
                customer_portfolio["PLM"] = formatedPLM();
            });
            unsubPHA = await api.query.tokens.accounts(selectedAddress, { TOKEN: "PHA",} , (result) => {
                // setPHABalance(result.free);
                console.log(`For account ${selectedAddress} Balance PHA ${result.free}  results: `,result);
                phaBalance = result.free;
                customer_portfolio["PHA"] = formatedPHA();
            });
            // const unsubHDT = await api.query.tokens.accounts(selectedAddress, { TOKEN: "HDT",} , (result) => {
            //     // setHDTBalance(result.free);
            //     hdtBalance = result.free;
            //     customer_portfolio["HDT"] = formatedHDT();
            // });
            // unsubBCG = await api.query.tokens.accounts(selectedAddress, { TOKEN: "BCG",} , (result) => {
            //     // setBCGBalance(result.free);
            //     console.log(`For account ${selectedAddress} Balance BCG ${result.free}  results: `,result);
            //     bcgBalance = result.free;
            //     customer_portfolio["BCG"] = formatedBCG();
            // });
            unsubLKSM = await api.query.tokens.accounts(selectedAddress, { TOKEN: "LKSM",} , (result) => {
                // setLKSMBalance(result.free);
                console.log(`For account ${selectedAddress} Balance LKSM ${result.free}  results: `,result);
                lksmBalance = result.free;
                customer_portfolio["LKSM"] = formatedLKSM();
            });
            unsubSDN = await api.query.tokens.accounts(selectedAddress, { TOKEN: "SDN",} , (result) => {
                // setSDNBalance(result.free);
                console.log(`For account ${selectedAddress} Balance SDN ${result.free}  results: `,result);
                sdnBalance = result.free;
                customer_portfolio["SDN"] = formatedSDN();
            });
            // const unsubLP_ACA_AUSD = api.query.tokens.accounts(selectedAddress, { TOKEN: "LP_ACA_AUSD",} , (result) => {
            //     setLP_ACA_AUSDBalance(result.free);
            // });


            console.log(`AMTC6-API ....... typeof unsubACA: ${typeof unsubACA}  unsubACA: `);
            console.dir(unsubACA);
    
        //   return () => {
        //         unsubAUSD.then((cb) => cb());
        //         unsubACA.then((cb) => cb());
        //         unsubDOT.then((cb) => cb());
        //         unsubLDOT.then((cb) => cb());
        //         unsubRENBTC.then((cb) => cb());
        //         unsubKAR.then((cb) => cb());
        //         unsubKUSD.then((cb) => cb());
        //         unsubKSM.then((cb) => cb());
        //         unsubXBTC.then((cb) => cb());
        //         unsubPOLKABTC.then((cb) => cb());
        //         unsubPLM.then((cb) => cb());
        //         unsubPHA.then((cb) => cb());
        //         unsubHDT.then((cb) => cb());
        //         unsubBCG.then((cb) => cb());
        //         unsubLKSM.then((cb) => cb());
        //         unsubSDN.then((cb) => cb());
        //         // unsubLP_ACA_AUSD.then((cb) => cb());
        //   };
            
            alreadySubscribedToAccountEvents = true;
            return true;
        } else return false;
    }
    // }, [api, decimals, selectedAddress]);

    const unsubscribeToAccountEvents = () => {
        unsubAUSD();
        unsubACA();
        // unsubDOT.then((cb) => cb());
        // unsubLDOT.then((cb) => cb());
        // unsubRENBTC.then((cb) => cb());
        // unsubKAR.then((cb) => cb());
        // unsubKUSD.then((cb) => cb());
        // unsubKSM.then((cb) => cb());
        // unsubXBTC.then((cb) => cb());
        // unsubPOLKABTC.then((cb) => cb());
        // unsubPLM.then((cb) => cb());
        // unsubPHA.then((cb) => cb());
        // // unsubHDT.then((cb) => cb());
        // // unsubBCG.then((cb) => cb());
        // unsubLKSM.then((cb) => cb());
        // unsubSDN.then((cb) => cb());
        // unsubLP_ACA_AUSD.then((cb) => cb());
    };
    //#endregion

    //#region Format TOKEN balance with Decimals before showing it
    const formatedACA = () => {
        if (!acaBalance || !decimals["ACA"]) return "0";
        return formatNumber(acaBalance, decimals["ACA"]);
    };
    const formatedAUSD = () => {
        if (!ausdBalance || !decimals["AUSD"]) return "0";
        return formatNumber(ausdBalance, decimals["AUSD"]);
    };
    const formatedDOT = () => {
        if (!dotBalance || !decimals["DOT"]) return "0";
        return formatNumber(dotBalance, decimals["DOT"]);
    };
    const formatedLDOT = () => {
        if (!ldotBalance || !decimals["LDOT"]) return "0";
        return formatNumber(ldotBalance, decimals["LDOT"]);
    };
    const formatedRENBTC = () => {
        if (!renbtcBalance || !decimals["RENBTC"]) return "0";
        return formatNumber(renbtcBalance, decimals["RENBTC"]);
    };
    const formatedKAR = () => {
        if (!karBalance || !decimals["KAR"]) return "0";
        return formatNumber(karBalance, decimals["KAR"]);
    };
    const formatedKUSD = () => {
        if (!kusdBalance || !decimals["KUSD"]) return "0";
        return formatNumber(kusdBalance, decimals["KUSD"]);
    };
    const formatedKSM = () => {
        if (!ksmBalance || !decimals["KSM"]) return "0";
        return formatNumber(ksmBalance, decimals["KSM"]);
    };
    const formatedXBTC = () => {
        if (!xbtcBalance || !decimals["XBTC"]) return "0";
        return formatNumber(xbtcBalance, decimals["XBTC"]);
    };
    const formatedPOLKABTC = () => {
        if (!polkabtcBalance || !decimals["POLKABTC"]) return "0";
        return formatNumber(polkabtcBalance, decimals["POLKABTC"]);
    };
    const formatedPLM = () => {
        if (!plmBalance || !decimals["PLM"]) return "0";
        return formatNumber(plmBalance, decimals["PLM"]);
    };
    const formatedPHA = () => {
        if (!phaBalance || !decimals["PHA"]) return "0";
        return formatNumber(phaBalance, decimals["PHA"]);
    };
    const formatedHDT = () => {
        if (!hdtBalance || !decimals["HDT"]) return "0";
        return formatNumber(hdtBalance, decimals["HDT"]);
    };
    const formatedBCG = () => {
        if (!bcgBalance || !decimals["BCG"]) return "0";
        return formatNumber(bcgBalance, decimals["BCG"]);
    };
    const formatedLKSM = () => {
        if (!lksmBalance || !decimals["LKSM"]) return "0";
        return formatNumber(lksmBalance, decimals["LKSM"]);
    };
    const formatedSDN = () => {
        if (!sdnBalance || !decimals["SDN"]) return "0";
        return formatNumber(sdnBalance, decimals["SDN"]);
    };
    //#endregion

    //#region get Liquidity in Pools and Pricing for ACAAUSD, DOTAUSD LDOTAUSD XBTCAUSD RENBTCAUSD POLKABTCAUSD
    // useEffect( () => { 
    const get_API_OraclePrices = async () => {
            //api.query.dex provides access to liquidityPool, provisioningPool, tradingPairStatuses

            if (api && decimals) 
            {
                 acaAusdPool = await api.query.dex.liquidityPool([ {Token: "ACA"},{Token: "AUSD"},]);
                 dotAusdPool = await api.query.dex.liquidityPool([ {Token: "DOT"},{Token: "AUSD"},]);
                 // console.log(`AMTC6 acaAusdPool[1].toString(): ${acaAusdPool[1].toString()} acaAusdPool[0].toString(): ${acaAusdPool[0].toString()}`);
                 // console.log(`AMTC6 dotAusdPool[1].toString(): ${dotAusdPool[1].toString()} dotAusdPool[0].toString(): ${dotAusdPool[0].toString()}`);
                 ldotAusdPool = await api.query.dex.liquidityPool([ {Token: "LDOT"},{Token: "AUSD"},]);
                 xbtcAusdPool = await api.query.dex.liquidityPool([ {Token: "XBTC"},{Token: "AUSD"},]);
                 renbtcAusdPool = await api.query.dex.liquidityPool([ {Token: "RENBTC"},{Token: "AUSD"},]);
                 polkabtcAusdPool = await api.query.dex.liquidityPool([ {Token: "POLKABTC"},{Token: "AUSD"},]);
                 plmAusdPool = await api.query.dex.liquidityPool([ {Token: "PLM"},{Token: "AUSD"},]);
                 hdtAusdPool = await api.query.dex.liquidityPool([ {Token: "HDT"},{Token: "AUSD"},]);
                 sdnAusdPool = await api.query.dex.liquidityPool([ {Token: "SDN"},{Token: "AUSD"},]);
                 bcgAusdPool = await api.query.dex.liquidityPool([ {Token: "BCG"},{Token: "AUSD"},]);

                // console.log(`AMTC6 acaAusdPool[1].toString(): ${acaAusdPool[1].toString()} acaAusdPool[0].toString(): ${acaAusdPool[0].toString()} acaAusdPool: `,acaAusdPool);
                const _ACAAUSD = (+acaAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+acaAusdPool[0].toString() / 10 ** decimals["ACA"]);
                const _DOTAUSD = (+dotAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+dotAusdPool[0].toString() / 10 ** decimals["DOT"]);
                const _LDOTAUSD = (+ldotAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+ldotAusdPool[0].toString() / 10 ** decimals["LDOT"]);
                const _XBTCAUSD = (+xbtcAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+xbtcAusdPool[0].toString() / 10 ** decimals["XBTC"]);
                const _RENBTCAUSD = (+renbtcAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+renbtcAusdPool[0].toString() / 10 ** decimals["RENBTC"]);
                const _POLKABTCAUSD = (+polkabtcAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+polkabtcAusdPool[0].toString() / 10 ** decimals["POLKABTC"]);
                const _PLMAUSD = (+plmAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+plmAusdPool[0].toString() / 10 ** decimals["PLM"]);
                const _HDTAUSD = (+hdtAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+hdtAusdPool[0].toString() / 10 ** decimals["HDT"]);
                const _SDNAUSD = (+sdnAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+sdnAusdPool[0].toString() / 10 ** decimals["SDN"]);
                const _BCGAUSD = (+bcgAusdPool[1].toString() / 10 ** decimals["AUSD"]) / (+bcgAusdPool[0].toString() / 10 ** decimals["BCG"]);



                // console.log(`AMTC6 _ACAAUSD: ${_ACAAUSD} _DOTAUSD: ${_DOTAUSD}`);
                oracle_API_Prices = { ACA: _ACAAUSD, DOT: _DOTAUSD, LDOT: _LDOTAUSD, XBTC: _XBTCAUSD, RENBTC: _RENBTCAUSD, POLKABTC: _POLKABTCAUSD, PLM: _PLMAUSD, HDT: _HDTAUSD, SDN: _SDNAUSD , BCA: _BCGAUSD  };

                // setACAAUSD(_ACAAUSD);
                // setDOTAUSD(_DOTAUSD);
                // setLDOTAUSD(_LDOTAUSD);
                // setXBTCAUSD(_XBTCAUSD);
                // setRENBTCAUSD(_RENBTCAUSD);
                // setPOLKABTCAUSD(_POLKABTCAUSD);
                // setPLMAUSD(_PLMAUSD);
                // setHDTAUSD(_HDTAUSD);
                // setSDNAUSD(_SDNAUSD);
                // setBCGAUSD(_BCGAUSD);


                // const karKusdPool = await api.query.dex.liquidityPool([ {Token: "KAR"},{Token: "KUSD"},]);
                // console.log(`AMTC6 karKusdPool[1].toString(): ${karKusdPool[1].toString()} karKusdPool[0].toString(): ${karKusdPool[0].toString()} karKusdPool: `,karKusdPool);
                // const karKusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "KAR"},{Token: "KUSD"},]);
                // console.log(`AMTC6 karKusdPool_status.toString() : `,karKusdPool_status.toString());

                const acaAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "ACA"},{Token: "AUSD"},]);
                const dotAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "DOT"},{Token: "AUSD"},]);
                const ldotAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "LDOT"},{Token: "AUSD"},]);
                const xbtcAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "XBTC"},{Token: "AUSD"},]);
                const renbtcAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "RENBTC"},{Token: "AUSD"},]);
                const polkabtcAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "POLKABTC"},{Token: "AUSD"},]);
                const plmAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "PLM"},{Token: "AUSD"},]);
                const hdtAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "HDT"},{Token: "AUSD"},]);
                const sdnAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "SDN"},{Token: "AUSD"},]);
                const bcgAusdPool_status = await api.query.dex.tradingPairStatuses([ {Token: "BCG"},{Token: "AUSD"},]);

                // setStatusACAAUSD(acaAusdPool_status.toString());
                // setStatusDOTAUSD(dotAusdPool_status.toString());
                // setStatusLDOTAUSD(ldotAusdPool_status.toString());
                // setStatusXBTCAUSD(xbtcAusdPool_status.toString());
                // setStatusRENBTCAUSD(renbtcAusdPool_status.toString());
                // setStatusPOLKABTCAUSD(polkabtcAusdPool_status.toString());
                // setStatusPLMAUSD(plmAusdPool_status.toString());
                // setStatusHDTAUSD(hdtAusdPool_status.toString());
                // setStatusSDNAUSD(sdnAusdPool_status.toString());
                // setStatusBCGAUSD(bcgAusdPool_status.toString());


                //TODO Provision Pool In the example it does not say what is "t98jaBc3cdvZuQpBoiXpJW1uGsFhf9Gq6YDW4UmMtxdxZVL"
                // const acaAusdPool_status = await api.query.dex.provisioningPool([ {Token: "ACA"},{Token: "AUSD"},]);

                return oracle_API_Prices;
            }
    }
        // get_API_OraclePrices();
    // }, [api, decimals]);
    //#endregion

    //#region SWAPwithExactSupply
    // const swapWithExactSupply = async () => {
    const swapWithExactSupply = async (input_Supply_ACA) => {

        if (api && input_Supply_ACA && extension && selectedAddress && decimals) {
        //   setSwapWithExactSupply_IsSubmiting(true);
          const supplyAmount = parseInt(input_Supply_ACA * 10 ** decimals["ACA"])

          try {
                const path = [{TOKEN: "ACA"},{TOKEN: "AUSD"}];
                const minTargetAmount = "0x0";

                //prepare extrinsic
                const extrinsic = api.tx.dex.swapWithExactSupply(path, supplyAmount, minTargetAmount);
    
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                //This is for Vaults
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());


                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        //subscribe Front End to status updates
                        console.log(`swapWithExactSupply extrinsic.send result.status: `,result.status);
                        console.log(`swapWithExactSupply extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`swapWithExactSupply extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                         
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
                // setInput_Supply_ACA("");
          } catch (error) {
                let erMsg="something has gone wrong";
                if (error.message) { 
                    alert(`Failed, ${error.message}`); 
                    erMsg = error.message;
                } 
                else { alert(`Failed`); }
                
          } finally { 
            //   setSwapWithExactSupply_IsSubmiting(false); 
          }
        }
    }
    // }, [api, input_Supply_ACA, extension, selectedAddress, decimals]);
    //#endregion

    //#region SWAPwithExactTarget
    const swapWithExactTarget = async (input_target_AUSD, input_maxSupply_ACA) => {
        if (api && input_target_AUSD && input_maxSupply_ACA && extension && selectedAddress && decimals) {
        //   setSwapWithExactTarget_IsSubmiting(true);
          
          try {
                const path = [{TOKEN: "ACA"},{TOKEN: "AUSD"}];
              
                // const amountOfAUSDToConvert = 100;
                // const targetAmount = parseInt(amountOfAUSDToConvert * 10 ** decimals["AUSD"]);
                const targetAmount = parseInt(input_target_AUSD * 10 ** decimals["AUSD"]);

                // we are willing to spend maximum 2 ACA to get 1 AUSD
                // const maxSupplyAmount = 2 * 10 ** decimals["ACA"];
                const maxSupplyAmount = parseInt(input_maxSupply_ACA * 10 ** decimals["ACA"]);

                //prepare extrinsic
                const extrinsic = api.tx.dex.swapWithExactTarget(path, targetAmount, maxSupplyAmount);
    
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());


                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`swapWithExactTarget extrinsic.send result.status: `,result.status);
                        console.log(`swapWithExactTarget extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`swapWithExactTarget extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                        
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
                // setInput_target_AUSD("");  setInput_maxSupply_ACA("");
          } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
          } finally { /*setSwapWithExactTarget_IsSubmiting(false);*/ }
        }
    }
    // }, [api, input_target_AUSD, input_maxSupply_ACA, extension, selectedAddress, decimals]);
    //#endregion  

    //#region ADD LIQUIDITY
    const addLiquidity = async (input_liq_ACA, input_liq_AUSD) => {
        if (api && input_liq_ACA && input_liq_AUSD && extension && selectedAddress && decimals) {
            // setIsAddLiquiditySubmiting(true);
            // console.log(`running addLiquidity`);

            try {
                const currency_id_a = { TOKEN: "ACA"};
                const currency_id_b = { TOKEN: "AUSD"};

                // const max_amount_a = 15 * 10 ** decimals["ACA"];
                // const max_amount_b = 70 * 10 ** decimals["AUSD"];
                const max_amount_a = parseInt(input_liq_ACA * 10 ** decimals["ACA"]);
                const max_amount_b = parseInt(input_liq_AUSD * 10 ** decimals["AUSD"]);
                 

                // slippage is 100% for receiving shares
                const min_share_increment = 0;
                const stake_increment_share = true;

                //prepare extrinsic
                const extrinsic = api.tx.dex.addLiquidity(
                    currency_id_a,
                    currency_id_b,
                    max_amount_a,
                    max_amount_b,
                    min_share_increment,
                );
                // stake_increment_share

    
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());



                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`addLiquidity extrinsic.send result.status: `,result.status);
                        console.log(`addLiquidity extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`addLiquidity extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                        
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
                // setInput_Liq_ACA("");  setInput_Liq_AUSD("");
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally { /*setIsAddLiquiditySubmiting(false);*/ }
        }
    }
    // }, [api, input_liq_ACA, input_liq_AUSD, extension, selectedAddress, decimals]);
    //#endregion

    //#region REMOVE LIQUIDITY
    const removeLiquidity = async (input_removeliquidity_Shares) => {
        if (api && input_removeliquidity_Shares && extension && selectedAddress && decimals) {
            // setIsRemoveLiquiditySubmiting(true);
            // console.log(`running removeiquidity`);

            try {
                const currency_id_a = { TOKEN: "ACA"};
                const currency_id_b = { TOKEN: "AUSD"};
                
                // slippage is 100%, we want to receive anything that liquidity pool ratio will offer
                const min_withdrawn_a = 0;
                const min_withdrawn_b = 0;
                const by_unstake = false;
                
                // const remove_share = 1;
                const remove_share = parseInt(input_removeliquidity_Shares *10 * 10 ** decimals["ACA"]);

                //prepare extrinsic
                const extrinsic = api.tx.dex.removeLiquidity(
                    currency_id_a,
                    currency_id_b,
                    remove_share,
                    min_withdrawn_a,
                );
                // min_withdrawn_b,
                // by_unstake

    
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());


                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`removeLiquidity extrinsic.send result.status: `,result.status);
                        console.log(`removeLiquidity extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`removeLiquidity extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                        
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
                // setInput_RemoveLiquidityShares("");   
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally { /*setIsRemoveLiquiditySubmiting(false);*/ }
        }
    }
    // }, [api, input_removeliquidity_Shares, extension, selectedAddress, decimals]);
    //#endregion
    
    //#region transfer_Balance transfer native token ACA
    const transfer_Balance = async (input_balanceToTransfer,destinationAddress) => {

        if (api && input_balanceToTransfer && extension && selectedAddress && destinationAddress && decimals) {
            // setIsBalanceToTransferSubmiting(true);

            try {
                // transfer 10 ACA to `dest`
                // const dest = '5CfNjYygrfiaAfGWaGRVgGdkTuDfykZsgSXfuxTkekqq7JBh';
            	// const amount = 10 * (10 ** decimals['ACA']);
                const amount = parseInt(input_balanceToTransfer * 10 ** decimals["ACA"]);

                //prepare extrinsic
                const extrinsic = api.tx.balances.transfer(destinationAddress, amount);  

    
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());



                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`transfer_Balance extrinsic.send result.status: `,result.status);
                        console.log(`transfer_Balance extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`transfer_Balance extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                        
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
                // setInput_BalanceToTransfer("");  setDestinationAddress(""); 
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally { /*setIsBalanceToTransferSubmiting(false);*/ }
        }
    }
    // }, [api, input_balanceToTransfer, extension, selectedAddress, destinationAddress, decimals]);
    //#endregion

    //#region transfer_Balance transfer native token and nonative tokens
    const transfer_Currency = async (input_currencyToTransfer, input_transferToken, currencyDestinationAddress) => {
        if (api && input_currencyToTransfer && input_transferToken && extension && selectedAddress && currencyDestinationAddress && decimals) {
            // setIsCurrencyToTransferSubmiting(true);
            console.log(`running transfer_Currency`);

            try {
                const amount = parseInt(input_currencyToTransfer * 10 ** decimals[`${input_transferToken}`]);
                const token = { TOKEN: `${input_transferToken}` }

                //prepare extrinsic
                const extrinsic = api.tx.currencies.transfer(currencyDestinationAddress, token, amount);  


                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());

                // //*** FYI the above can be expanded as follows ***
                // const unSub = await extrinsic.signAndSend(signer, async (result) => {
                //     if (result.isInBlock) {
                //         console.log(`transfer_Currency result.isInBlock result: `,result);
                //     }
                //     else if (result.isFinalized) {
                //         console.log(`transfer_Currency result.isFinalized result: `,result);
                //     }
                // });
                // console.log("unSub", unSub);  //in this case unSub is the unsubscribe function for the event listener. we could write just await ...
                //can also do somthing similar as below to catch errors and ExtrinsicSuccess or ExtrinsicFailed



                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });

                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`transfer_Currency extrinsic.send result.status: `,result.status);
                        console.log(`transfer_Currency extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`transfer_Currency extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                         
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion

                alert("Success");
                // setInput_CurrencyToTransfer("");  setCurrencyDestinationAddress(""); setInput_transferToken("");
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally { /*setIsCurrencyToTransferSubmiting(false);*/ }
        }
    }
    // }, [api, input_currencyToTransfer, input_transferToken, extension, selectedAddress, currencyDestinationAddress, decimals]);
    //#endregion


    
    //NOTE THE BELOW EVENTS IS NOT JUST FOR MY TRANSFER. ALL PARACHAIN TRANSFERS ARE RECORDED HERE
    //UNCOMMENT IF/WHEN YOU WANT THIS AND CALL unsubscribeFromTransferEvents() to unsubscribe
    //#region Subscribing to Trasfer Events. For all currencies currencies.Transfered event is triggered. For ACA or KAR balances.Transfer and currencyies.Transfered are emitted if we use currecies module. If we use balances module only balances.Transfer  is emitted
    // let unsubscribeFromTransferEvents;
    // useEffect(async () => {
    /*    
    const startParachainEvents = async () => {        
        
        if (api && decimals)
        {
            // // NOTE: if transfer native token using currencies section, there will be two events: currencies.Transferred and balances.Transfer.
            // unsubscribeFromTransferEvents = await api.query.system.events((events) => {
            //     events.forEach((event) => {
            //         const { section, method, hash } = event.event;

            //         // subscribe transfer through currencies section
            //         if (section === 'currencies' && method === 'Transferred') {
            //             // [ASSET, ORIGIN, TARGET, AMOUNT]
            //             const data = event.event.data;
            //             // console.log('Transfer Currencies: DATA: ',data);

            //             const token = data[0] ; //as CurrencyId;
            //             const origin = data[1] ; //as AccountId;
            //             const target = data[2] ; //as AccountId;
            //             const amount = data[3] ; //as Balance;
            //             // console.log(`Transfer Currencies Event token: ${token} origin: ${origin} target: ${target} amount: ${amount} token: `,token);

            //             const decimal = token.isToken ? decimals[`${token.asToken.toString()}`]  : 12;
            //               //TODO                  // token.isDexShare ? decimals[`${token.asDexShare[0].asToken.toString()}`] : 12;

            //             const tokenObj = JSON.parse(token.toString());    // token is {"dexShare":["AUSD","XBTC"]} {"token":"AUSD"}
            //             const tokenSymbol = token.isDexShare ? `${tokenObj.dexShare[0]}/${tokenObj.dexShare[1]}` : `${tokenObj.token}`;
            //             console.log(`HASH: ${hash.toString()} Transfer Currencies ${Number(amount.toString()) / (10 ** decimal)} ${token.toString()} *** tokenSymbol: ${tokenSymbol} ***   from ${origin.toHuman()} to ${target.toHuman()} tokenObj: `,tokenObj);
            //         }

            //         // subscribe transfer through balances section
            //         if (section === 'balances' && method === 'Transfer') {
            //             // [ORIGIN, TARGET, AMOUNT]
            //             const data = event.event.data;
            //             // console.log('Transfer Balances: DATA: ',data);
            //             const origin = data[0] ; //as AccountId;
            //             const target = data[1] ; //as AccountId;
            //             const amount = data[2] ; //as Balance;
            //             const decimal = decimals["ACA"];   // pls. ensure the native token
            //             console.log(`HASH: ${hash.toString()} Transfer Balances ${Number(amount.toString()) / (10 ** decimal)} ACA from ${origin.toHuman()} to ${target.toHuman()}`);
            //         }
            //     })
            // });

            // //return unsubscribe;   if you want to unsubscribe from events
        }
    }
    */
    // }, [api, decimals]);   
    //#endregion

    
    //LOANS   NOTE: FOR DEBIT IT SHOWS ACA AS UNITS INSTEAD OF AUSD 
    //#region getAccountLoans
    // useEffect(async () => {
    const getAccountLoans = async () => { 
        console.log(`RETRIEVING ACCOUNT LOANS`);
        if (api && decimals && selectedAddress) {

            const result_DOT = await api.query.loans.positions({ TOKEN: "DOT" }, `${selectedAddress}`);
            // console.log(`LOAN Hash:${result_DOT.hash.toString()}  COLLATERAL:${(+result_DOT.collateral.toString() / 10**decimals["DOT"]).toFixed(5)} DOT  DEBIT:${(+result_DOT.debit.toString() / 10**decimals["ACA"]).toFixed(2)} AUSD  FOR ACCOUNT ${selectedAddress}`);
            const result_LDOT = await api.query.loans.positions({ TOKEN: "LDOT" }, `${selectedAddress}`);
            // console.log(`LOAN Hash:${result_LDOT.hash.toString()} COLLATERAL:${+result_LDOT.collateral.toString() / 10**decimals["LDOT"]} LDOT  DEBIT:${+result_LDOT.debit.toString() / 10**decimals["AUSD"]} AUSD  FOR ACCOUNT ${selectedAddress}`);
            const result_XBTC = await api.query.loans.positions({ TOKEN: "XBTC" }, `${selectedAddress}`);
            // console.log(`LOAN Hash:${result_XBTC.hash.toString()}  COLLATERAL:${(+result_XBTC.collateral.toString() / 10**decimals["XBTC"]).toFixed(5)} XBTC  DEBIT:${(+result_XBTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)} AUSD  FOR ACCOUNT ${selectedAddress}`);
            // console.log(`RETRIEVING LOANS ON XBTC decimals["XBTC"]: ${decimals["XBTC"]} FOR ACCOUNT ${selectedAddress}`,result.toHuman());
            const result_RENBTC = await api.query.loans.positions({ TOKEN: "RENBTC" }, `${selectedAddress}`);
            // console.log(`LOAN Hash:${result_RENBTC.hash.toString()}  COLLATERAL:${+result_RENBTC.collateral.toString() / 10**decimals["RENBTC"]} RENBTC  DEBIT:${+result_RENBTC.debit.toString() / 10**decimals["AUSD"]} AUSD  FOR ACCOUNT ${selectedAddress}`);
            const result_POLKABTC = await api.query.loans.positions({ TOKEN: "POLKABTC" }, `${selectedAddress}`);
            // console.log(`LOAN Hash:${result_POLKABTC.hash.toString()} COLLATERAL:${+result_POLKABTC.collateral.toString() / 10**decimals["POLKABTC"]} POLKABTC  DEBIT:${+result_POLKABTC.debit.toString() / 10**decimals["AUSD"]} AUSD  FOR ACCOUNT ${selectedAddress}`);

                    // setLoans_DOT({hash:`${result_DOT.hash.toString()}`, collateral: `${(+result_DOT.collateral.toString() / 10**decimals["DOT"]).toFixed(5)}`, debit: `${(+result_DOT.debit.toString() / 10**decimals["ACA"]).toFixed(2)}` });
                    // setLoans_LDOT({hash:`${result_LDOT.hash.toString()}`, collateral: `${(+result_LDOT.collateral.toString() / 10**decimals["LDOT"]).toFixed(5)}`, debit: `${(+result_LDOT.debit.toString() / 10**decimals["ACA"]).toFixed(2)}` });
                    // setLoans_XBTC({hash:`${result_XBTC.hash.toString()}`, collateral: `${(+result_XBTC.collateral.toString() / 10**decimals["XBTC"]).toFixed(5)}`, debit: `${(+result_XBTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}` });
                    // setLoans_RENBTC({hash:`${result_RENBTC.hash.toString()}`, collateral: `${(+result_RENBTC.collateral.toString() / 10**decimals["RENBTC"]).toFixed(5)}`, debit: `${(+result_RENBTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}` });
                    // setLoans_POLKABTC({hash:`${result_POLKABTC.hash.toString()}`, collateral: `${(+result_POLKABTC.collateral.toString() / 10**decimals["POLKABTC"]).toFixed(5)}`, debit: `${(+result_POLKABTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}` });

            accountLoans = {
                            DOT:    {
                                        hash      : `${result_DOT.hash.toString()}`,
                                        collateral: `${(+result_DOT.collateral.toString() / 10**decimals["DOT"]).toFixed(5)}`,
                                        debit     : `${(+result_DOT.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                    },
                            LDOT:    {
                                        hash      : `${result_LDOT.hash.toString()}`,
                                        collateral: `${(+result_LDOT.collateral.toString() / 10**decimals["LDOT"]).toFixed(5)}`,
                                        debit     : `${(+result_LDOT.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                    },
                            XBTC:   {
                                        hash      : `${result_XBTC.hash.toString()}`,
                                        collateral: `${(+result_XBTC.collateral.toString() / 10**decimals["XBTC"]).toFixed(5)}`,
                                        debit     : `${(+result_XBTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                    },
                            RENBTC: {
                                        hash      : `${result_RENBTC.hash.toString()}`,
                                        collateral: `${(+result_RENBTC.collateral.toString() / 10**decimals["RENBTC"]).toFixed(5)}`,
                                        debit     : `${(+result_RENBTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                    },
                            POLKABTC:    {
                                            hash      : `${result_POLKABTC.hash.toString()}`,
                                            collateral: `${(+result_POLKABTC.collateral.toString() / 10**decimals["POLKABTC"]).toFixed(5)}`,
                                            debit     : `${(+result_POLKABTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                        },
                            };
            
            return accountLoans;
        }
    }
    // }, [api, selectedAddress, decimals]);
    //#endregion
     
    //#region getLoansOverview  Requires blockHeader
    const getLoansOverview = async (blockHeader) => { 
        console.log(`RETRIEVING LOANS Overview`);
        if (api && decimals && selectedAddress && blockHeader) {
            const result_Tot_DOT = await api.query.loans.totalPositions({ TOKEN: "DOT" });
            const result_Tot_LDOT = await api.query.loans.totalPositions({ TOKEN: "LDOT" });
            const result_Tot_XBTC = await api.query.loans.totalPositions({ TOKEN: "XBTC" });
            const result_Tot_RENBTC = await api.query.loans.totalPositions({ TOKEN: "RENBTC" });
            const result_Tot_POLKABTC = await api.query.loans.totalPositions({ TOKEN: "POLKABTC" });

            const blockHash = blockHeader.hash;
            const debitExchangeRate_DOT = await api.query.cdpEngine.debitExchangeRate.at(blockHash, {TOKEN: "DOT"});
            const debitExchangeRate_LDOT = await api.query.cdpEngine.debitExchangeRate.at(blockHash, {TOKEN: "LDOT"});
            const debitExchangeRate_XBTC = await api.query.cdpEngine.debitExchangeRate.at(blockHash, {TOKEN: "XBTC"});
            const debitExchangeRate_RENBTC = await api.query.cdpEngine.debitExchangeRate.at(blockHash, {TOKEN: "RENBTC"});
            const debitExchangeRate_POLKABTC = await api.query.cdpEngine.debitExchangeRate.at(blockHash, {TOKEN: "POLKABTC"});

            const resObj_ColParam_DOT = await api.query.cdpEngine.collateralParams({ TOKEN: "DOT" });
            const resObj_ColParam_LDOT = await api.query.cdpEngine.collateralParams({ TOKEN: "LDOT" });
            const resObj_ColParam_XBTC = await api.query.cdpEngine.collateralParams({ TOKEN: "XBTC" });
            const resObj_ColParam_RENBTC = await api.query.cdpEngine.collateralParams({ TOKEN: "RENBTC" });
            const resObj_ColParam_POLKABTC = await api.query.cdpEngine.collateralParams({ TOKEN: "POLKABTC" });
            
            loansOverview = {
                                DOT:    {

                                            collateral: `${(+result_Tot_DOT.collateral.toString() / 10**decimals["ACA"]).toFixed(5)}`,
                                            debit     : `${(+result_Tot_DOT.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                            debitExchangeRate : `${(+debitExchangeRate_DOT.toString() / 10**17).toFixed(8)}`,
                                            maximumTotalDebitValue: `${resObj_ColParam_DOT.maximumTotalDebitValue.toHuman() }`,
                                            stabilityFee : `${(resObj_ColParam_DOT.stabilityFee  / (10**9)).toFixed(2)}`,
                                            liquidationRatio: `${resObj_ColParam_DOT.liquidationRatio  / (10**decimals["ACA"]  * 1000)  }`,
                                            liquidationPenalty: `${resObj_ColParam_DOT.liquidationPenalty  / (10**decimals["ACA"]  * 1000) }`,
                                            requiredCollateralRatio : `${resObj_ColParam_DOT.requiredCollateralRatio  / (10**decimals["ACA"]  * 1000) }`
                                        },
                                LDOT:   {

                                            collateral: `${(+result_Tot_LDOT.collateral.toString() / 10**decimals["ACA"]).toFixed(5)}`,
                                            debit     : `${(+result_Tot_LDOT.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                            debitExchangeRate : `${(+debitExchangeRate_LDOT.toString() / 10**17).toFixed(8)}`,
                                            maximumTotalDebitValue: `${resObj_ColParam_LDOT.maximumTotalDebitValue.toHuman() }`,
                                            stabilityFee : `${(resObj_ColParam_LDOT.stabilityFee  / (10**9)).toFixed(2)}`,
                                            liquidationRatio: `${resObj_ColParam_LDOT.liquidationRatio  / (10**decimals["ACA"]  * 1000)  }`,
                                            liquidationPenalty: `${resObj_ColParam_LDOT.liquidationPenalty  / (10**decimals["ACA"]  * 1000) }`,
                                            requiredCollateralRatio : `${resObj_ColParam_LDOT.requiredCollateralRatio  / (10**decimals["ACA"]  * 1000) }`
                                        },      
                                XBTC:   {

                                            collateral: `${(+result_Tot_XBTC.collateral.toString() / 10**decimals["ACA"]).toFixed(5)}`,
                                            debit     : `${(+result_Tot_XBTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                            debitExchangeRate : `${(+debitExchangeRate_XBTC.toString() / 10**17).toFixed(8)}`,
                                            maximumTotalDebitValue: `${resObj_ColParam_XBTC.maximumTotalDebitValue.toHuman() }`,
                                            stabilityFee : `${(resObj_ColParam_XBTC.stabilityFee  / (10**9)).toFixed(2)}`,
                                            liquidationRatio: `${resObj_ColParam_XBTC.liquidationRatio  / (10**decimals["ACA"]  * 1000)  }`,
                                            liquidationPenalty: `${resObj_ColParam_XBTC.liquidationPenalty  / (10**decimals["ACA"]  * 1000) }`,
                                            requiredCollateralRatio : `${resObj_ColParam_XBTC.requiredCollateralRatio  / (10**decimals["ACA"]  * 1000) }`
                                        },      
                                RENBTC: {

                                            collateral: `${(+result_Tot_RENBTC.collateral.toString() / 10**decimals["ACA"]).toFixed(5)}`,
                                            debit     : `${(+result_Tot_RENBTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                            debitExchangeRate : `${(+debitExchangeRate_RENBTC.toString() / 10**17).toFixed(8)}`,
                                            maximumTotalDebitValue: `${resObj_ColParam_RENBTC.maximumTotalDebitValue.toHuman() }`,
                                            stabilityFee : `${(resObj_ColParam_RENBTC.stabilityFee  / (10**9)).toFixed(2)}`,
                                            liquidationRatio: `${resObj_ColParam_RENBTC.liquidationRatio  / (10**decimals["ACA"]  * 1000)  }`,
                                            liquidationPenalty: `${resObj_ColParam_RENBTC.liquidationPenalty  / (10**decimals["ACA"]  * 1000) }`,
                                            requiredCollateralRatio : `${resObj_ColParam_RENBTC.requiredCollateralRatio  / (10**decimals["ACA"]  * 1000) }`
                                        },      
                                POLKABTC:   {

                                                collateral: `${(+result_Tot_POLKABTC.collateral.toString() / 10**decimals["ACA"]).toFixed(5)}`,
                                                debit     : `${(+result_Tot_POLKABTC.debit.toString() / 10**decimals["ACA"]).toFixed(2)}`,
                                                debitExchangeRate : `${(+debitExchangeRate_POLKABTC.toString() / 10**17).toFixed(8)}`,
                                                maximumTotalDebitValue: `${resObj_ColParam_POLKABTC.maximumTotalDebitValue.toHuman() }`,
                                                stabilityFee : `${(resObj_ColParam_POLKABTC.stabilityFee  / (10**9)).toFixed(2)}`,
                                                liquidationRatio: `${resObj_ColParam_POLKABTC.liquidationRatio  / (10**decimals["ACA"]  * 1000)  }`,
                                                liquidationPenalty: `${resObj_ColParam_POLKABTC.liquidationPenalty  / (10**decimals["ACA"]  * 1000) }`,
                                                requiredCollateralRatio : `${resObj_ColParam_POLKABTC.requiredCollateralRatio  / (10**decimals["ACA"]  * 1000) }`
                                            }

                            }
            return loansOverview;
        }
    }
    //#endregion


    //#region Authorize_Loan  This works but I am not sure this is anything other than an Approval/Authorization. 
    //Authorize `to` to manipulate the loan under `currency_id`
    	/// - `currency_id`: collateral currency id.
		/// - `to`: authorizee account
    // const authorize_LoanForTransferTo3rdParty = useCallback(async () => {
    const authorize_LoanForTransferTo3rdParty = async (input_CollateralTokenSumbol, autorizeeAddress, ) => {

        if (api && input_CollateralTokenSumbol && autorizeeAddress && extension && selectedAddress && decimals) {
            // setIsCollateralTokenSubmiting(true);
            console.log(`running authorize_Loan`);

            try {
                // const accountId = '5FNZdmuPipRa8fz5ab12Y8P2dKx9zFbMgNyDwoWQMLynbPg8';  //Hellen

                //prepare extrinsic
                const extrinsic = api.tx.honzon.authorize({ TOKEN: input_CollateralTokenSumbol }, autorizeeAddress);
                
                
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());
                


                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`authorize_authorize_LoanForTransferTo3rdParty CollateralForLoan extrinsic.send result.status: `,result.status);
                        console.log(`authorize_LoanForTransferTo3rdParty extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`authorize_LoanForTransferTo3rdParty extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                        
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
                // setInput_CollateralTokenSumbol("");    setAuthorizeeAddress("");
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally { /*setIsCollateralTokenSubmiting(false); */}
        }
    }
    // }, [api, input_CollateralTokenSumbol, autorizeeAddress, extension, selectedAddress, decimals]);
    //#endregion

    //#region UnAuthorize_Loan    
    //UnAuthorize `to` to manipulate the loan under `currency_id`
    	/// - `currency_id`: collateral currency id.
		/// - `to`: unauthorizee account
    // const unauthorize_LoanForTransferTo3rdParty = useCallback(async () => {
    const unauthorize_LoanForTransferTo3rdParty = async (input_CollateralTokenSumbol, autorizeeAddress) => {

            if (api && input_CollateralTokenSumbol && autorizeeAddress && extension && selectedAddress && decimals) {
                // setIsUnauthorizeSubmiting(true);
                console.log(`running unauthorize_Loan`);
    
                try {
                    //prepare extrinsic
                    const extrinsic = api.tx.honzon.unauthorize({ TOKEN: input_CollateralTokenSumbol }, autorizeeAddress);
                    
                    
                    //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                    // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                    // const hash = await extrinsic.signAndSend(signer);
                    // console.log("hash", hash.toHuman());
    
    
                    //#region *** 2nd way sign and then send ***
                    //sign extrinsic
                    await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                    
                    //send extrinsic
                    await new Promise((resolve, reject) => {
                        extrinsic.send((result) => {
    
                            console.log(`unauthorize_LoanForTransferTo3rdParty extrinsic.send result.status: `,result.status);
                            console.log(`unauthorize_LoanForTransferTo3rdParty extrinsic.send result: `,result);
    
                            if (result.status.isFinalized || result.status.isInBlock) {
                                result.events.filter( ( { event: { section } } ) => section === "system")
                                    .forEach((event) => {
    
                                        console.log(`unauthorize_LoanForTransferTo3rdParty extrinsic.send event: `,event);
    
                                        const { event: { data, method },} = event;
                
                                        if (method === "ExtrinsicFailed") {
                                            const [dispatchError] = data;
                                            let message = dispatchError.type;
                
                                            if (dispatchError.isModule) {
                                                try {
                                                    const mod = dispatchError.asModule;
                                                    const error = api.registry.findMetaError(
                                                        new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                    );
                                                    message = `${error.section}.${error.name}`;
                                                } catch (error) {
                                                    // swallow
                                                }
                                            }
                
                                            reject({ message, result });
                                        } else if (method === "ExtrinsicSuccess") {
                                            resolve({ result });
                                        }
                                    });
                             
                            } else if (result.isError) {
                                reject({ result });
                            }
                        });
                    });
                    //#endregion
        
                    alert("Success");
                    // setInput_CollateralTokenSumbol("");   setAuthorizeeAddress("");
                } catch (error) {
                    if (error.message) { alert(`Failed, ${error.message}`); } 
                    else { alert(`Failed`); }
                } finally { /*setIsUnauthorizeSubmiting(false);*/ }
            }
    }     
    // }, [api, input_CollateralTokenSumbol, autorizeeAddress, extension, selectedAddress, decimals]);
    //#endregion

    //#region unauthorizeALL_Loans    
    //UnAuthorizeALL `to` to manipulate the loan under `currency_id`
    	/// - `currency_id`: collateral currency id.
		/// - `to`: unauthorizee account
    // const unauthorizeALL_Loans = useCallback(async () => {
    const unauthorizeALL_Loans = async () => {

        if (api && extension && selectedAddress) {
            // setIsUnauthorizeALLSubmiting(true);
            console.log(`running unauthorizeALL_Loans`);

            try {
                //prepare extrinsic
                const extrinsic = api.tx.honzon.unauthorizeAll();
                
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());


                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`unauthorizeALL_Loans extrinsic.send result.status: `,result.status);
                        console.log(`unauthorizeALL_Loans extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`unauthorizeALL_Loans extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                         
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally { /*setIsUnauthorizeALLSubmiting(false); */}
        }
    }
    // }, [api, extension, selectedAddress ]);
    //#endregion


    //#region TRANSFER LOAN FROM  Transfer the whole CDP of `from` under `currency_id` to caller's CDP 
    //under the same `currency_id`, caller must have the authorization of `from` for the specific collateral type
    	/// - `currency_id`: collateral currency id.
		/// - `from`: authorizer account
    // const tranferLoanFrom = useCallback(async () => {
    const tranferLoanFrom = async (input_LoanTransfer_CollateralTokenSymbol, input_LoanTransfer_FromAccount) => {

        if (api && input_LoanTransfer_CollateralTokenSymbol && input_LoanTransfer_FromAccount && extension && selectedAddress && decimals) {
            // setIsTransferLoanSubmiting(true);
            console.log(`running tranferLoanFrom`);

            try {
                //prepare extrinsic
                const extrinsic = api.tx.honzon.transferLoanFrom( { TOKEN: input_LoanTransfer_CollateralTokenSymbol }, input_LoanTransfer_FromAccount );
                
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("hash", hash.toHuman());
                

                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`tranferLoanFrom extrinsic.send result.status: `,result.status);
                        console.log(`tranferLoanFrom extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`tranferLoanFrom extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                         
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
                // setInput_LoanTransfer_CollateralTokenSymbol("");  setInput_LoanTransfer_FromAccount("");
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally { /*setIsTransferLoanSubmiting(false);*/ }
        }
    }
    // }, [api, input_LoanTransfer_CollateralTokenSymbol, input_LoanTransfer_FromAccount, extension, selectedAddress, decimals]);
    //#endregion


    //There is also check_authorization, unauthorize, unauthorize_all, transfer_loan_from, close_loan_has_debit_by_dex

    //#region Adjust_Loan    
    /// Adjust the loans of `currency_id` by specific /// `collateral_adjustment` and `debit_adjustment`
    // const adjustLoan = useCallback(async () => {
    const adjustLoan = async (input_LoanAdjust_CollateralTokenSymbol, input_adjust_collateral_depositWithdraw, input_adjust_borrowRepay_AUSD) => {

        if (api && input_LoanAdjust_CollateralTokenSymbol && input_adjust_collateral_depositWithdraw && input_adjust_borrowRepay_AUSD && extension && selectedAddress && decimals) {
            // setIsAdjustLoanSubmiting(true);
            // console.log(`running adjustLoan api.tx.honzon: `);
            // console.dir(api.tx.honzon);

            try {
                const symbol = input_LoanAdjust_CollateralTokenSymbol;

                const currency_id = { TOKEN: symbol };    //collateral currency id.
                // const collateral_adjustment = `${ 1 * 10**decimals["DOT"]}`;  //signed amount, positive means to deposit collateral currency into CDP, negative means withdraw collateral currency from CDP
                const collateral_adjustment = `${+input_adjust_collateral_depositWithdraw * 10**decimals[symbol]}`;  //signed amount, positive means to deposit collateral currency into CDP, negative means withdraw collateral currency from CDP

                // const debit_adjustment = `${ 10 * 10**decimals["ACA"]}`; // signed amount, positive means to issue some amount of stablecoin to caller according to the debit adjustment, negative means caller will payback some  amount of stablecoin to CDP according to to the debit adjustment.
                const debit_adjustment = `${+input_adjust_borrowRepay_AUSD * 10**decimals["ACA"]}`; // signed amount, positive means to issue some amount of stablecoin to caller according to the debit adjustment, negative means caller will payback some  amount of stablecoin to CDP according to to the debit adjustment.
                
                // const amount = parseInt(input_balanceToTransfer * 10 ** decimals["ACA"]);
                
                //here for an existing loan of 2 DOT collateral we deposit 1 DOT and ask 10 more AUSD as loan
                //prepare extrinsic
                const extrinsic = api.tx.honzon.adjustLoan(
                    currency_id,
                    collateral_adjustment,
                    debit_adjustment
                );

                
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("ADJUST LOAN hash.toHuman(): ", hash.toHuman());
                


                //#region *** 2nd way sign and then send ***
                //sign extrinsic
                await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                //send extrinsic
                await new Promise((resolve, reject) => {
                    extrinsic.send((result) => {

                        console.log(`adjust Existing Loan extrinsic.send result.status: `,result.status);
                        console.log(`adjust Existing Loan extrinsic.send result: `,result);

                        if (result.status.isFinalized || result.status.isInBlock) {
                            result.events.filter( ( { event: { section } } ) => section === "system")
                                .forEach((event) => {

                                    console.log(`adjust Existing Loan extrinsic.send event: `,event);

                                    const { event: { data, method },} = event;
            
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        let message = dispatchError.type;
            
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod = dispatchError.asModule;
                                                const error = api.registry.findMetaError(
                                                    new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                                                );
                                                message = `${error.section}.${error.name}`;
                                            } catch (error) {
                                                // swallow
                                            }
                                        }
            
                                        reject({ message, result });
                                    } else if (method === "ExtrinsicSuccess") {
                                        resolve({ result });
                                    }
                                });
                         
                        } else if (result.isError) {
                            reject({ result });
                        }
                    });
                });
                //#endregion
    
                alert("Success");
                // setInput_LoanAdjust_CollateralTokenSymbol(""); setInput_adjust_collateral_depositWithdraw(""); setInput_adjust_borrowRepay_AUSD("");
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally {/*setIsAdjustLoanSubmiting(false); */}
        }
    }
    // }, [api, input_LoanAdjust_CollateralTokenSymbol, input_adjust_collateral_depositWithdraw, input_adjust_borrowRepay_AUSD, extension, selectedAddress, decimals]);
    //#endregion

    //#region Close Loan Close caller's CDP which has debit but still in safe by use collateral to swap stable token on DEX for clearing debit 
    ///Running  console.dir(api.tx.honzon); shows that the function is not yet implemented in AMTC6 
    // const closeLoan = useCallback( async () => {
    const closeLoan = async (input_LoanClose_CollateralTokenSymbol) => {
        if (api && input_LoanClose_CollateralTokenSymbol && extension && selectedAddress && decimals) {
            // setIsCloseLoanSubmiting(true);
            console.log(`running closeLoan`);

            try {
                // const symbol = "DOT";
                const symbol = input_LoanClose_CollateralTokenSymbol;
                
                console.log(`UNDER CONSTRUCTION.  FUNCTION closeLoanHasDebitByDex NOT YET PROVIDED IN AMTC6  api.tx.honzon : `);
                console.dir(api.tx.honzon);

                //prepare extrinsic
                // const extrinsic = api.tx.honzon.closeLoanHasDebitByDex(
                //     { TOKEN: symbol },   //`currency_id`: collateral currency id.
                //      // large number, allows swapping almost any amount
                //      1 * 10 ** 30,     //`max_collateral_amount`: the max collateral amount which is used to swap enough stable token to clear debit.
                //      [{ TOKEN: symbol }, { TOKEN: "AUSD" }]
                // );

                
                //*** 1st way signAndSend THIS IS IF YOU WANT YOUR SC or ACCOUNT TO SIGN AND SEND USING SEED PHRASE. WITHOUT USING EXTENSION POLKADOT.JS ***
                // const signer = getSigner(process.env.REACT_APP_seed_Helen);
                // const hash = await extrinsic.signAndSend(signer);
                // console.log("CLOSE LOAN hash.toHuman(): ", hash.toHuman());
                


                //#region *** 2nd way sign and then send ***
                // //sign extrinsic
                // await extrinsic.signAsync(selectedAddress, { signer: extension.signer });
                
                // //send extrinsic
                // await new Promise((resolve, reject) => {
                //     extrinsic.send((result) => {

                //         console.log(`Close Loan extrinsic.send result.status: `,result.status);
                //         console.log(`Close Loan extrinsic.send result: `,result);

                //         if (result.status.isFinalized || result.status.isInBlock) {
                //             result.events.filter( ( { event: { section } } ) => section === "system")
                //                 .forEach((event) => {

                //                     console.log(`Close Loan extrinsic.send event: `,event);

                //                     const { event: { data, method },} = event;
            
                //                     if (method === "ExtrinsicFailed") {
                //                         const [dispatchError] = data;
                //                         let message = dispatchError.type;
            
                //                         if (dispatchError.isModule) {
                //                             try {
                //                                 const mod = dispatchError.asModule;
                //                                 const error = api.registry.findMetaError(
                //                                     new Uint8Array([mod.index.toNumber(),mod.error.toNumber(),])
                //                                 );
                //                                 message = `${error.section}.${error.name}`;
                //                             } catch (error) {
                //                                 // swallow
                //                             }
                //                         }
            
                //                         reject({ message, result });
                //                     } else if (method === "ExtrinsicSuccess") {
                //                         resolve({ result });
                //                     }
                //                 });
                
                //         } else if (result.isError) {
                //             reject({ result });
                //         }
                //     });
                // });
                //#endregion
    
                alert("Success");
                // setInput_LoanClose_CollateralTokenSymbol("");  
            } catch (error) {
                if (error.message) { alert(`Failed, ${error.message}`); } 
                else { alert(`Failed`); }
            } finally { /*setIsCloseLoanSubmiting(false); */}
        }
    }
    // }, [api, input_LoanClose_CollateralTokenSymbol, extension, selectedAddress, decimals]);
    //#endregion



   


    // if (!api) { return <div> loading... </div> }

    // return (
    //     <div style={{overflow: 'scroll'}}>
    //         <div>
    //         <label style={{backgroundColor: "#9DD861", color:"black", fontSize:"20px"}}>Basic Token SC</label>
    //         <table style={{backgroundColor: "#9DD861", color:"black", width:"100%"}}>
    //                 <thead>
    //                     <tr><th>Smart Contract Address</th><th>Name</th><th>Symbol</th><th>Message</th></tr>
    //                 </thead>
    //                 <tbody>
    //                     <tr><td>{sc.scAddress}</td><td>{scStateVariables.name}</td><td>{scStateVariables.symbol}</td><td>{scStateVariables.message}</td></tr>
    //                 </tbody>
    //         </table>

    //         <ChangeMessage sc={sc} getCurrentGasPrice={getCurrentGasPrice} />
    //         </div>
    //         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    //         <h3>Acala Mandala TC6 Front End</h3>


    //         <div className = "App" >
    //             <h2> Swap ACA to AUSD example </h2> 

    //             <div> 
    //                 <select defaultValue = "" value = { selectedAddress } onChange = { (event) => setSelectedAddress(event.target.value) } >
    //                     <option value = "" disabled hidden > Choose Account </option> 
    //                     { (accountList || []).map(({ address, name }) => ( <option key = { address } value = { address } > { name } </option>)) } 
    //                 </select>  
    //             </div>

    //             <div> -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- </div> 

    //             <div> Address: { selectedAddress || 'account not selected' } </div> 

    //             <div> -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --</div>  

    //             { selectedAddress && (  
    //             <div>
    //                 <h3>Balances</h3>
    //                 <div> ACA balance: { formatedACA  } ACA </div> 
    //                 <div> AUSD balance: { formatedAUSD  } AUSD</div> 
    //                 <div> DOT balance: { formatedDOT  } DOT</div> 
    //                 <div> LDOT balance: { formatedLDOT  } LDOT</div> 
    //                 <div> RENBTC balance: { formatedRENBTC  } RENBTC</div> 
    //                 <div> KAR balance: { formatedKAR  } KAR</div> 
    //                 <div> KUSD balance: { formatedKUSD  } KUSD</div> 
    //                 <div> KSM balance: { formatedKSM  } KSM</div> 
    //                 <div> XBTC balance: { formatedXBTC  } XBTC</div> 
    //                 <div> POLKABTC balance: { formatedPOLKABTC  } POLKABTC</div> 
    //                 <div> PLM balance: { formatedPLM  } PLM</div> 
    //                 <div> PHA balance: { formatedPHA  } PHA</div> 
    //                 <div> HDT balance: { formatedHDT  } HDT</div> 
    //                 <div> BCG balance: { formatedBCG  } BCG</div> 
    //                 <div> LKSM balance: { formatedLKSM  } LKSM</div> 
    //                 <div> SDN balance: { formatedSDN } SDN</div> 
    //                 <div> -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --</div>  
    //             </div>
    //             )}

    //             <div>
    //                 <h3>Oracle Prices</h3>
    //                 <div>ACAAUSD: {ACAAUSD}  Status: {statusACAAUSD} </div> 
    //                 <div>DOTAUSD: {DOTAUSD} Status: {statusDOTAUSD} </div>
    //                 <div>LDOTAUSD: {LDOTAUSD} Status: {statusLDOTAUSD} </div>
    //                 <div>XBTCAUSD: {XBTCAUSD} Status: {statusXBTCAUSD} </div>
    //                 <div>RENBTCAUSD: {RENBTCAUSD} Status: {statusRENBTCAUSD} </div>
    //                 <div>POLKABTCAUSD: {POLKABTCAUSD} Status: {statusPOLKABTCAUSD} </div>
    //                 <div>PLMAUSD: {PLMAUSD} Status: {statusPLMAUSD} </div>
    //                 <div>HDTAUSD: {HDTAUSD} Status: {statusHDTAUSD} </div>
    //                 <div>SDNAUSD: {SDNAUSD} Status: {statusSDNAUSD} </div>
    //                 <div>BCGAUSD: {BCGAUSD} Status: {statusBCGAUSD} </div>
    //             </div>
    //             <div> -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --</div>  

    //             { selectedAddress && ( 
    //             <div> 
    //                 <h3>DEX</h3>
    //                 <br/> 
    //                 <h6>Swap</h6>
    //                 <div> 
    //                     Input ACA: <input type = "text" value = { input_Supply_ACA } onChange = { (event) => setInput_Supply_ACA(event.target.value) }/> 
    //                     <button disabled = { swapWithExactSupply_IsSubmiting } onClick = { swapWithExactSupply } > SWAP ACA </button> 
    //                     <div> 
    //                         To receive: { (input_Supply_ACA * ACAAUSD).toFixed(2) || 0 } AUSD 
    //                     </div> 
    //                 </div> 
    //                 <br/> 
    //                 <h6>Swap With Eact Target</h6>
    //                 <div> 
    //                     Target Receive AUSD: <input type = "text" value = { input_target_AUSD } onChange = { (event) => setInput_target_AUSD(event.target.value) }/> 
    //                     Max Supply ACA: <input type = "text" value = { input_maxSupply_ACA } onChange = { (event) => setInput_maxSupply_ACA(event.target.value) }/> 
    //                     <button disabled = { swapWithExactTarget_IsSubmiting } onClick = { swapWithExactTarget } > SWAP ACA for target AUSD </button> 
    //                     <div> 
    //                         To swap: { (input_target_AUSD / ACAAUSD).toFixed(2) || 0 } ACA 
    //                     </div> 
    //                 </div> 
    //                 <br/> 
    //                 <h6>Add Liquidity</h6>
    //                 <div> 
    //                     Input ACA: <input type = "text" value = { input_liq_ACA } onChange = { (event) => setInput_Liq_ACA(event.target.value) }/> 
    //                     Input AUSD: <input type = "text" value = { input_liq_AUSD } onChange = { (event) => setInput_Liq_AUSD(event.target.value) }/> 
    //                     <button disabled = { isAddLiquiditySubmiting } onClick = { addLiquidity } > Add Liquidity </button> 
    //                 </div> 
    //                 <br/><br/>
    //                 <h6>Remove Liquidity</h6>
    //                 <div> 
    //                     Remove Liquidity Shares: <input type = "text" value = { input_removeliquidity_Shares } onChange = { (event) => setInput_RemoveLiquidityShares(event.target.value) }/> 
    //                     <button disabled = { isRemovingLiquiditySubmiting } onClick = { removeLiquidity } > Remove Liquidity </button> 
    //                 </div> 
    //                 <br/><br/>

    //                 <h6>Transfers</h6>
    //                 <div> 
    //                     Transfer ACA Balance Amount: <input type = "text" value = { input_balanceToTransfer } onChange = { (event) => setInput_BalanceToTransfer(event.target.value) }/> 
    //                     Destination Address: <input type = "text" value = { destinationAddress } onChange = { (event) => setDestinationAddress(event.target.value) }/> 
    //                     <button disabled = { isBalanceToTransferSubmiting } onClick = { transfer_Balance } > Transfer Balance </button> 
    //                 </div> 
    //                 <br/><br/>
    //                 <div> 
    //                     Transfer Currency Amount (non-native ACA): <input type = "text" value = { input_currencyToTransfer } onChange = { (event) => setInput_CurrencyToTransfer(event.target.value) }/> 
    //                     Transfer Token: <input type = "text" value = { input_transferToken } onChange = { (event) => setInput_transferToken(event.target.value) }/> 
    //                     Currency Destination Address: <input type = "text" value = { currencyDestinationAddress } onChange = { (event) => setCurrencyDestinationAddress(event.target.value) }/> 
    //                     <button disabled = { isCurrencyToTransferSubmiting } onClick = { transfer_Currency } > Transfer Currency </button> 
    //                 </div> 
    //                 <br/><br/>

    //                 <br/> 
    //             </div>
    //             )}  
                
    //             <div> -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --</div>  
    //             <h3>LOANS</h3>
    //             <h6>Outstanding Account Loans</h6>
    //             <div>
    //                 <div>Hash: {loans_DOT.hash}  Collateral:{loans_DOT.collateral} DOT  Debit: {loans_DOT.debit} AUSD </div> 
    //                 <div>Hash: {loans_LDOT.hash}  Collateral:{loans_LDOT.collateral} LDOT  Debit: {loans_LDOT.debit} AUSD </div> 
    //                 <div>Hash: {loans_XBTC.hash}  Collateral:{loans_XBTC.collateral} XBTC  Debit: {loans_XBTC.debit} AUSD </div> 
    //                 <div>Hash: {loans_RENBTC.hash}  Collateral:{loans_RENBTC.collateral} RENBTC  Debit: {loans_RENBTC.debit} AUSD </div> 
    //                 <div>Hash: {loans_POLKABTC.hash}  Collateral:{loans_POLKABTC.collateral} POLKABTC  Debit: {loans_POLKABTC.debit} AUSD </div> 
    //             </div>
    //             <h6>Total Loans</h6>
    //             <div>
    //                 <div>DOT Loans Collateral:{total_loans_DOT.collateral} ACA  Debit: {total_loans_DOT.debit} AUSD  debitExchangeRate: {total_loans_DOT.debitExchangeRate} </div> 
    //                 <div>LDOT Loans Collateral:{total_loans_LDOT.collateral} ACA  Debit: {total_loans_LDOT.debit} AUSD debitExchangeRate: {total_loans_LDOT.debitExchangeRate}</div> 
    //                 <div>XBTC Loans Collateral:{total_loans_XBTC.collateral} ACA  Debit: {total_loans_XBTC.debit} AUSD debitExchangeRate: {total_loans_XBTC.debitExchangeRate}</div> 
    //                 <div>RENBTC Loans Collateral:{total_loans_RENBTC.collateral} ACA  Debit: {total_loans_RENBTC.debit} AUSD debitExchangeRate: {total_loans_RENBTC.debitExchangeRate}</div> 
    //                 <div>POLKABTC Loans Collateral:{total_loans_POLKABTC.collateral} ACA  Debit: {total_loans_POLKABTC.debit} AUSD debitExchangeRate: {total_loans_POLKABTC.debitExchangeRate}</div> 
    //             </div>
    //             <h6>Loan Parameters</h6>
    //             <div>
    //                 <div>DOT Loans maximumTotalDebitValue: {loans_DOT_Params.maximumTotalDebitValue} stabilityFee: {loans_DOT_Params.stabilityFee}% liquidationRatio: {loans_DOT_Params.liquidationRatio}% liquidationPenalty: {loans_DOT_Params.liquidationPenalty}% requiredCollateralRatio: {loans_DOT_Params.requiredCollateralRatio}% </div> 
    //                 <div>LDOT Loans maximumTotalDebitValue: {loans_LDOT_Params.maximumTotalDebitValue} stabilityFee: {loans_LDOT_Params.stabilityFee}% liquidationRatio: {loans_LDOT_Params.liquidationRatio}% liquidationPenalty: {loans_LDOT_Params.liquidationPenalty}% requiredCollateralRatio: {loans_LDOT_Params.requiredCollateralRatio}% </div> 
    //                 <div>XBTC Loans maximumTotalDebitValue: {loans_XBTC_Params.maximumTotalDebitValue} stabilityFee: {loans_XBTC_Params.stabilityFee}% liquidationRatio: {loans_XBTC_Params.liquidationRatio}% liquidationPenalty: {loans_XBTC_Params.liquidationPenalty}% requiredCollateralRatio: {loans_XBTC_Params.requiredCollateralRatio}% </div> 
    //                 <div>RENBTC Loans maximumTotalDebitValue: {loans_RENBTC_Params.maximumTotalDebitValue} stabilityFee: {loans_RENBTC_Params.stabilityFee}% liquidationRatio: {loans_RENBTC_Params.liquidationRatio}% liquidationPenalty: {loans_RENBTC_Params.liquidationPenalty}% requiredCollateralRatio: {loans_RENBTC_Params.requiredCollateralRatio}% </div> 
    //                 <div>POLKABTC Loans maximumTotalDebitValue: {loans_POLKABTC_Params.maximumTotalDebitValue} stabilityFee: {loans_POLKABTC_Params.stabilityFee}% liquidationRatio: {loans_POLKABTC_Params.liquidationRatio}% liquidationPenalty: {loans_POLKABTC_Params.liquidationPenalty}% requiredCollateralRatio: {loans_POLKABTC_Params.requiredCollateralRatio}% </div> 
    //             </div>
    //             <h6>Authorize/Unauthorize Account For Loan Management</h6>
    //             <div> 
    //                 Collateral Token <input type = "text" value = { input_CollateralTokenSumbol } onChange = { (event) => setInput_CollateralTokenSumbol(event.target.value) }/> 
    //                 Authorizee Address: <input type = "text" value = { autorizeeAddress } onChange = { (event) => setAuthorizeeAddress(event.target.value) }/> 
    //                 <button disabled = { isCollateralTokenSubmiting } onClick = { authorize_LoanForTransferTo3rdParty } > Authorize Loan of Token for Adress </button> 
    //                 <button disabled = { isUnauthorizeSubmiting } onClick = { unauthorize_LoanForTransferTo3rdParty } > Unauthorize Loan of Token for Adress </button> 
    //                 <button disabled = { isUnauthorizeALLSubmiting } onClick = { unauthorizeALL_Loans } > Unauthorize ALL Loans for authorizees </button> 
    //             </div> 
    //             <h6>Adjust Existing Loan</h6>
    //             <div> 
    //                 Collateral Token <input type = "text" value = { input_LoanAdjust_CollateralTokenSymbol } onChange = { (event) => setInput_LoanAdjust_CollateralTokenSymbol(event.target.value) }/> 
    //                 Deposit/Wothdraw Collateral Tokens (+/-): <input type = "text" value = { input_adjust_collateral_depositWithdraw } onChange = { (event) => setInput_adjust_collateral_depositWithdraw(event.target.value) }/> 
    //                 Borrow/Repay AUSD (+/-): <input type = "text" value = { input_adjust_borrowRepay_AUSD } onChange = { (event) => setInput_adjust_borrowRepay_AUSD(event.target.value) }/> 
    //                 <button disabled = {isAdjustLoanSubmiting} onClick = { adjustLoan } > Adjust Loan </button> 
    //             </div> 
    //             <h6>Close Existing Loan</h6>
    //             <div> 
    //                 Collateral Token <input type = "text" value = { input_LoanClose_CollateralTokenSymbol } onChange = { (event) => setInput_LoanClose_CollateralTokenSymbol(event.target.value) }/> 
    //                 <button disabled = {isCloseLoanSubmiting} onClick = { closeLoan } > Close Loan </button> 
    //             </div> 
    //             <h6>Transfer Loan From</h6>
    //             <div> 
    //                 Collateral Token <input type = "text" value = { input_LoanTransfer_CollateralTokenSymbol } onChange = { (event) => setInput_LoanTransfer_CollateralTokenSymbol(event.target.value) }/> 
    //                 Transfer From Account <input type = "text" value = { input_LoanTransfer_FromAccount } onChange = { (event) => setInput_LoanTransfer_FromAccount (event.target.value) }/> 
    //                 <button disabled = {isTransferLoanSubmiting} onClick = { tranferLoanFrom } > Transfer Loan </button> 
    //             </div> 
    //             <br/><br/>



    //             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    //         </div> 

    //     </div>

    // );
 

// };



// export default AMTC6_FE;

export {
    API_Setup,
    decimals,
    update_CustomerAccount,
    setExtensionAPI,
    getAccountBalanceSnapshot,
    subscribeToAccountEvents,
    unsubscribeToAccountEvents,
    customer_portfolio,
    get_API_OraclePrices,
    oracle_API_Prices,

    swapWithExactSupply,
    swapWithExactTarget,
    transfer_Balance,
    transfer_Currency,

    getAccountLoans,
    accountLoans,
    getLoansOverview,
    loansOverview,

    adjustLoan,
    authorize_LoanForTransferTo3rdParty,
    unauthorize_LoanForTransferTo3rdParty,
    unauthorizeALL_Loans,
    tranferLoanFrom,

    addLiquidity,
    removeLiquidity,
};
