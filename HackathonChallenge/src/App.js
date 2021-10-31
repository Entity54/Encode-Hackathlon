// import { lazy, Suspense, useEffect } from 'react';
import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import { web3Enable } from '@polkadot/extension-dapp';
import {setup, getGasPrice} from './Setup.js';     //Blockchain provider,signer setup and helper functions
// import BlockchainData from './BlockchainData.js';
// import Token54u from './Token54u.js';
// import Predeployed from './Predeployed.js';   //Acala Mandala TC6 Predeployed contract
import {EVM_Setup, get_EVM_OraclePrices, TokenBindings} from './Predeployed_EVM.js';     //Blockchain provider,signer setup and helper functions

import {API_Setup, decimals, update_CustomerAccount, customer_portfolio, accountLoans, loansOverview, setExtensionAPI, subscribeToAccountEvents, unsubscribeToAccountEvents, get_API_OraclePrices, oracle_API_Prices} from './AMTC6_API.js';          

 
 
/// Components
import Index from "./jsx";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

let EVMisSetup = false, APIisSetup = false;


function App (props) {
    const [setupSpecs,setSetupSpecs]            = useState({ wallet: null, provider: null, pair: null, connected: "Not connected", walletAddress: null });
    const [blockChainSpecs,setBlockChainSpecs]  = useState({ networkName: undefined, chainID: undefined, blockNumber: undefined, gasPrice: undefined});
    const [blockHeader, setBlockHeader]         = useState({ number: undefined , hash: undefined, size: undefined });
    const [blockTimestamp, setBlockTimestamp]   = useState(undefined);

    const [extension, setExtension] = useState();      //stores the polkadot browser extension
    const [accountList, setAccountList] = useState();  //stores the list of accounts from the extensions

    const [selectedAddress, setSelectedAddress] = useState("Choose Account");
    const [selectedAccountName, setSelectedAccountName] = useState("");
    const [selected_EVM_Address, setSelected_EVM_Address] = useState("");

    const [evm_api_state,setEvm_Api_State] = useState(false);

    const [customerPortfolio, setCustomerPortfolio] = useState(
          { 
              ACA: undefined , AUSD: undefined, DOT: undefined , LDOT: undefined, RENBTC: undefined  , KAR: undefined
            , KUSD: undefined, KSM: undefined , LKSM: undefined, XBTC: undefined, POLKABTC: undefined, PLM: undefined 
            , PHA: undefined , HDT: undefined, BCG: undefined, SDN: undefined
          }
    );

    const [customerPortfolioAnalytics, setCustomerPortfolioAnalytics] = useState();

    const [oraclePrices,setOraclePrices] = useState({ ACA: undefined, DOT: undefined, LDOT: undefined, XBTC: undefined, RENBTC: undefined, POLKABTC: undefined, PLM: undefined, HDT: undefined, SDN: undefined , BCA: undefined  });
    
    const [total_CoinSupply, setTotal_CoinSupply] = useState();

    const [customerLoans, setCustomerLoans] = useState();
    const [loansOverviews, setLoansOverviews] = useState();

    const [message_1, setMessage_1] = useState("Please select account");
        


    const setSubstrateAccount = async (substrateAccount) => {
          console.log(`App => setSubstrateAccount  substrateAccount: `,substrateAccount);
          setSelectedAddress(substrateAccount.address);
          setSelectedAccountName(substrateAccount.name);
          switch (substrateAccount.address) {
            case '5CfNjYygrfiaAfGWaGRVgGdkTuDfykZsgSXfuxTkekqq7JBh' :    //Gillian
              setSelected_EVM_Address("0xda186b64108b4e117a1bbec33098d6cd99f85b63");
              break;
            case '5F1hqrYBhnhhkvYd1q9QzfXy8BYJJXtL3EKfYBkcBtpHRnHx' :    //Emma
              setSelected_EVM_Address("0x5444d6aeb3760a87b2521f619d7ca9689b07e3bd");
              break;
            case '5FNZdmuPipRa8fz5ab12Y8P2dKx9zFbMgNyDwoWQMLynbPg8' :    //Hellen
              setSelected_EVM_Address("0x20518975941a280ec37b1285613b34446fb9f1d3");
              break;
            case '5G9KtfNMn6mqFq5BJueXZWqvEppagLRQiK7Hkd5Ng9aTRdKC' :    //Olivia
              setSelected_EVM_Address("0xeB0f1c5971CE15E6cfC154e835a111536917E36D");
              break;
            default:
              setSelected_EVM_Address("Substrate needs to be binded to EVM account");
              break;
          }
          // setSelected_EVM_Address("todo");

          setMessage_1('loading');

          if (APIisSetup) 
          {
            await update_CustomerAccount(substrateAccount.address, blockHeader);
            setCustomerPortfolio(customer_portfolio)
            console.log(`>>>>>>>>>>>> APP.JS   customer_portfolio: `,customer_portfolio);

            setCustomerLoans(accountLoans);
            setLoansOverviews(loansOverview);
          }
    }

    useEffect(() => {
        const runSetup = async () => {
          const { wallet, provider, pair } = await setup('AcalaMandalaTC6', process.env.REACT_APP_seed_Gillian)
          console.log(`wallet address that signs transactions: `, await wallet.getAddress());
          
          let current_block_number = Number(await provider.api.query.system.number());
          console.log(`current_block_number: ${current_block_number}`);  //blockNumber: 1544302
          
          const _setupSpecs = { wallet, provider, pair, connected: "Connected to AcalaMandalaTC6", walletAddress: await wallet.getAddress() };
          setSetupSpecs(_setupSpecs);
          setBlockChainSpecs({ networkName: (await provider.getNetwork()).name, chainID: (await provider.getNetwork()).chainId, blockNumber: await provider.getBlockNumber(), gasPrice: (await provider.getGasPrice()).toString() });
  
          //set up EVM 
          EVMisSetup = await EVM_Setup(_setupSpecs);

          //set up Acala API
          APIisSetup = await API_Setup(_setupSpecs);
          // console.log(`APP.JS decimals: `,decimals)

          //oracle_EVM_PricesHuman = { ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined };
          const oracleEVMPrices = await get_EVM_OraclePrices(); //get fresh EVM Oracle Prices NOTE:ONLY DOTAUSD and XBTCAUSD IS NON ZERO
          console.log(`APP.JS >>> oracleEVMPrices: `,oracleEVMPrices);

          //oracle_API_Prices = { ACA: _ACAAUSD, DOT: _DOTAUSD, LDOT: _LDOTAUSD, XBTC: _XBTCAUSD, RENBTC: _RENBTCAUSD, POLKABTC: _POLKABTCAUSD, 
          //PLM: _PLMAUSD, HDT: _HDTAUSD, SDN: _SDNAUSD , BCA: _BCGAUSD  };
          const oracleAPIPrices = await get_API_OraclePrices(); //get fresh API Oracle Prices NOTE:ONLY ACAUSD IS NON ZERO
          // console.log(`APP.JS  oracleAPIPrices: `,oracleAPIPrices);
          
          oracleAPIPrices["DOT"] = oracleEVMPrices["DOT"];
          oracleAPIPrices["XBTC"] = oracleEVMPrices["RENBTC"];
            oracleAPIPrices["LDOT"] = oracleEVMPrices["DOT"];         //artificial
            oracleAPIPrices["RENBTC"] = oracleEVMPrices["RENBTC"];    //artificial
            oracleAPIPrices["POLKABTC"] = oracleEVMPrices["RENBTC"];  //artificial
            oracleAPIPrices["PLM"] = 47.8;                            //artificial
            oracleAPIPrices["KSM"] = 547.25;                          //artificial
            oracleAPIPrices["LKSM"] = 5472.5;                         //artificial
            oracleAPIPrices["AUSD"] = 1;                              //artificial
            oracleAPIPrices["KUSD"] = 1;                              //artificial
            oracleAPIPrices["KAR"] = 83.95;                           //artificial
            oracleAPIPrices["SDN"] = 64.75;                           //artificial
            oracleAPIPrices["PHA"] = 7.89;                           //artificial


          setOraclePrices(oracleAPIPrices);
          // console.log(`APP.JS  oracleAPIPricesADJUSTED: `,oracleAPIPrices);


          const keys= Object.keys(TokenBindings);
          let totalSupplyCoinSupply =[];
          keys.forEach((item) => {
            totalSupplyCoinSupply.push( TokenBindings[item].totalSupply );
          });
          // console.log(`APP.JS  totalSupplyCoinSupply: `,totalSupplyCoinSupply);
          setTotal_CoinSupply(totalSupplyCoinSupply);

          setEvm_Api_State(true);
        }
        runSetup();
    
        //enabling polkadot extension for the user to be able to sign transactions
        async function enable() {
          const extensions = await web3Enable("ACALA EXAMPLE");
          const extension =
            extensions.find(({
              name
            }) => name === "polkadot-js") || null;
    
          // console.log(`web3Enable enable is run extension: `,extension);  
          setExtension(extension);
          setExtensionAPI(extension);
        }
        enable();
    
    }, []);   

      //load accounts from extension
    useEffect(() => {
        if (extension) {
        extension.accounts.get().then((list) => {
            setAccountList(list);
            console.log(`List of account from extension list: `,list);
        });
        }
    }, [extension]);


    // const calculatePortfolioAnalytics = useCallback(async () => {
    useEffect( async () => {

        if (selectedAddress && customerPortfolio && oraclePrices)
        {
            // let customer_portfolio = { ACA: undefined , AUSD: undefined, DOT: undefined , LDOT: undefined, RENBTC: undefined  , KAR: undefined
            //   , KUSD: undefined, KSM: undefined , LKSM: undefined, XBTC: undefined, POLKABTC: undefined, PLM: undefined 
            //   , PHA: undefined , HDT: undefined, BCG: undefined, SDN: undefined};

            // let oracle_API_Prices = { ACA: undefined, DOT: undefined, LDOT: undefined, XBTC: undefined, RENBTC: undefined, POLKABTC: undefined, PLM: undefined, HDT: undefined, SDN: undefined , BCA: undefined  };
          
            console.log(`APP.JS setCustomerPortfolioAnalytics ==> customerPortfolio:`,customerPortfolio);
            console.log(`APP.JS setCustomerPortfolioAnalytics ==> oraclePrices: `,oraclePrices);

            const totalIn_AUSD = Number(customerPortfolio["AUSD"]);
            const totalIn_KUSD = Number(customerPortfolio["KUSD"]);
            const totalIn_ACA = Number(customerPortfolio["ACA"]) * Number(oraclePrices["ACA"]) ;
            const totalIn_DOT = Number(customerPortfolio["DOT"]) * Number(oraclePrices["DOT"]) ;
            const totalIn_LDOT = Number(customerPortfolio["LDOT"]) * Number(oraclePrices["LDOT"]) ;
            const totalIn_XBTC = Number(customerPortfolio["RENBTC"]) * Number(oraclePrices["RENBTC"]) ;
            const totalIn_RENBTC = Number(customerPortfolio["XBTC"]) * Number(oraclePrices["XBTC"]) ;
            const totalIn_POLKABTC = Number(customerPortfolio["POLKABTC"]) * Number(oraclePrices["POLKABTC"]) ;

            const totalIn_Stablecoins =totalIn_AUSD + totalIn_KUSD;
            const totalIn_Tokens =  totalIn_ACA + totalIn_DOT + totalIn_LDOT + totalIn_XBTC + totalIn_RENBTC + totalIn_POLKABTC;
            const totalIn_Vaults = 1000;
            const totalIn_Loans  = 1000;
            const totalBalance = totalIn_Stablecoins + totalIn_Tokens + totalIn_Vaults + totalIn_Loans;
            const totalFree   = totalIn_Stablecoins + totalIn_Tokens;
            const totalLocked = totalIn_Vaults + totalIn_Loans;


            setCustomerPortfolioAnalytics({totalBalance, totalFree, totalLocked, totalIn_Stablecoins, totalIn_Tokens, totalIn_Vaults, totalIn_Loans,
              totalIn_AUSD, totalIn_KUSD, totalIn_ACA, totalIn_DOT, totalIn_LDOT, totalIn_XBTC, totalIn_RENBTC, totalIn_POLKABTC  });

            console.log(`APP.JS setCustomerPortfolioAnalytics ==> `,{totalBalance, totalFree, totalLocked, totalIn_Stablecoins, totalIn_Tokens, totalIn_Vaults, totalIn_Loans,
                totalIn_AUSD, totalIn_KUSD, totalIn_ACA, totalIn_DOT, totalIn_LDOT, totalIn_XBTC, totalIn_RENBTC, totalIn_POLKABTC  });
  
        }
    },[selectedAddress,customerPortfolio,oraclePrices]);


  //parachain events setup
  useEffect(() => {

    const parachain = async (provider) => {
        console.log(`App.js Parachain is run at  Timestmap: ${new Date()}`);
        const api = provider.api;
    
        //#region *** SUBSCRIPTIONS ***
        //Subscribe to the new headers on-chain. The callback is fired when new headers are found, the call itself returns a promise with a subscription that can be used to unsubscribe from the newHead subscription
        // We only display a few, then unsubscribe
        let count = 0;
        const unsubscribe_NewsHeads = await api.rpc.chain.subscribeNewHeads(async (header) => {
            console.log(`count:${count} Chain is at block: #${header.number} ${typeof header.number} has hash ${header.hash} ${typeof header.hash}  size: ${header.size} ${typeof header.size} header: `,header);
            setBlockHeader({number: `${header.number}`, hash: `${header.hash}`, size: header.size});

            // await get_EVM_OraclePrices();   //get fresh Oracle Prices

            ++count
            // if (count > 5) {
            //   console.log(`We will now unsubscribe new Headers of the parachain`);
            //   unsubscribe_NewsHeads();
            // }
        });
        //#endregion
    
    
        // const lastHdr = await api.rpc.chain.getHeader();
    }

    if (setupSpecs.provider) 
    {
      parachain(setupSpecs.provider).catch((er) => {
          console.log(`APP.JS parachain Error: `,er);
      });
    }
    else console.log(`App.js => setupSpecs.provider is undefined`);

  }, [setupSpecs.provider]);  
  //#endregion  parachain events setup


  //function get called from any Component for latest gasPrice
  const getCurrentGasPrice = async () => {
        const gasPrice = await getGasPrice(setupSpecs.provider);
        setBlockChainSpecs({gasPrice});
        return gasPrice;
  };

    
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index setupSpecs={setupSpecs} evm_api_state={evm_api_state} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} 
                           blockTimestamp={blockTimestamp} extension={extension} accountList={accountList} 
                           setSubstrateAccount={setSubstrateAccount} selectedAddress={selectedAddress} 
                           selectedAccountName={selectedAccountName} selected_EVM_Address={selected_EVM_Address} 
                           customerPortfolio={customerPortfolio} message_1={message_1} oraclePrices={oraclePrices} 
                           customerPortfolioAnalytics={customerPortfolioAnalytics} total_CoinSupply={total_CoinSupply} 
                           customerLoans={customerLoans} loansOverviews={loansOverviews} />
                </Suspense>
            </>
        );
	
};


export default App;