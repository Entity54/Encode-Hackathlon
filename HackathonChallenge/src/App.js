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

    //#region  
    const parachain = async (provider) => {
        console.log(`App.js Parachain is run at  Timestmap: ${new Date()}`);
    
        const api = provider.api;
        
        //get parachain stats
        //*** CONSTS ***
        console.log('The length of an epoch (session) in Babe: ', api.consts.babe.epochDuration.toNumber());
        console.log('The amount required to create a new account: ',api.consts.balances.existentialDeposit.toNumber());
        console.log('The amount required per byte on an extrinsic: ',api.consts.transactionPayment.transactionByteFee.toNumber());
    
    
        //#region *** STATE QUERIES ***
            //ACCOUNT ADDRESS
            // const ADDR = '5CfNjYygrfiaAfGWaGRVgGdkTuDfykZsgSXfuxTkekqq7JBh';         //GILLIAN Substrate Address 5CfNjYygrfiaAfGWaGRVgGdkTuDfykZsgSXfuxTkekqq7JBh
            const Gillian_address = '5CfNjYygrfiaAfGWaGRVgGdkTuDfykZsgSXfuxTkekqq7JBh'; 
            // const Emma_address    = '5F1hqrYBhnhhkvYd1q9QzfXy8BYJJXtL3EKfYBkcBtpHRnHx'; 
            // const Hellen_address  = '5FNZdmuPipRa8fz5ab12Y8P2dKx9zFbMgNyDwoWQMLynbPg8'; 
    
            //Retrieve the account balance & nonce via the system module  THE 3 BLOCKS BELOW ARE EQUIVALENT
            //1
            // Retrieve the last timestamp
            // const now = await api.query.timestamp.now();
            // const { nonce, data: balance } = await api.query.system.account(Gillian_address);
            //2
            // const [now, { nonce, data: balance }] = await Promise.all([
            //   api.query.timestamp.now(),
            //   api.query.system.account(Gillian_address)
            // ]);
            // console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
            //3 Account Balances (from acala.js)
            const accountData = await api.query.system.account(Gillian_address);
            console.log(`polkadot_Parachain Gillian_address  accountData.toHuman():  `,accountData.toHuman());
        //#endregion
    
    
    
        //#region *** RPC QUERIES ***
        //All API endpoints such as api.query, api.tx or api.derive just wrap RPC calls, providing information in the encoded format as expected by the node
        //Simple Connect Information 1 AND 2 ARE EQUIVALENT
        //1
        // const chain = await api.rpc.system.chain();           // Retrieve the chain name 
        // const lastHeader = await api.rpc.chain.getHeader();   // Retrieve the latest header
        // console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    
        //2 Simple Connect Information
        const [chain, nodeName, nodeVersion, lastHeader] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
          api.rpc.chain.getHeader()
        ]);
        console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion} last block #${lastHeader.number} has hash ${lastHeader.hash}  lastHeader: `,lastHeader);
        //#endregion
         
    
    
        //#region *** SUBSCRIPTIONS ***
    
        //Subscribe to the new headers on-chain. The callback is fired when new headers are found, the call itself returns a promise with a subscription that can be used to unsubscribe from the newHead subscription
        // We only display a couple, then unsubscribe
        let count = 0;
        const unsubscribe_NewsHeads = await api.rpc.chain.subscribeNewHeads(async (header) => {
            console.log(`count:${count} Chain is at block: #${header.number} ${typeof header.number} has hash ${header.hash} ${typeof header.hash}  size: ${header.size} ${typeof header.size} header: `,header);
            setBlockHeader({number: `${header.number}`, hash: `${header.hash}`, size: header.size});

            await get_EVM_OraclePrices();   //get fresh Oracle Prices

            if (++count > 5) {
              console.log(`We will now unsubscribe new Headers of the parachain`);
              unsubscribe_NewsHeads();
            }
        });

    
    
        // Retrieve the current timestamp via subscription
        const unsubscribe_Timestamp = await api.query.timestamp.now((moment) => {
            console.log(`count:${count} The last block has a timestamp of ${moment} }`);
            setBlockTimestamp(parseInt(moment));
    
            if (count > 5) {
                console.log("We will now unsubscribe from listening to new headers timestamp");
                unsubscribe_Timestamp();
            }
        });
        //remember that further up we had the equivalent without any function as a parmeter that runs only once
        // const now = await api.query.timestamp.now();
    
        //FOR ANY SUBSCRIPTION WITH A PARAMETER INPUT ALL PARAMETRS FIRST AND AT THE END INCLUDE THE CALLBACK FUNCTION
        // Subscribe to balance changes for our account
        // const unsub2 = await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
        //   console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
        // });
    
        //#endregion
    
    
        //#region MULTIPLE QUERIES AT ONCE TO OPTIMISE COMMUNICATION WITH THE NODE
        // => Multi queries, same type
        //Where possible, the use of multi queries are encouraged since it tracks a number of state entries over a single RPC call, instead of making a call for each single item. In addition it allows you to have a single callback to track changes. For queries of the same type we can use .multi, for example to retrieve the balances of a number of accounts at once -
        //Example 1
        // Subscribe to balance changes for 2 accounts, ADDR1 & ADDR2 (already defined)
        // const unsub = await api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
        //   const [{ data: balance1 }, { data: balance2 }] = balances;
    
        //   console.log(`The balances are ${balance1.free} and ${balance2.free}`);
        // });
    
        //Example 2
        // Retrieve a snapshot of the validators
        // (all active & waiting based on ValidatorPrefs storage)
        // const validatorKeys = await api.query.staking.validators.keys();
        // Subscribe to the balances for these accounts
        // const unsub = await api.query.balances.account.multi(validatorKeys, (balances) => {
        //   console.log(`The nonce and free balances are: ${balances.map(([nonce, { free }]) => [nonce, free])}`);
        // });
    
    
        // => Multi queries, distinct types
        // The previous .multi examples assumes that we do queries for the same types, i.e. we retrieve the balances for a number of accounts. However, there is also a need to retrieve various distinct types, as an example we would like to track the block timestamp in addition to the nonce and balance of a specific account. 
        // To cater for this, the api has a specific api.queryMulti interface that can be used to perform this query -
        // Subscribe to the timestamp, our index and balance
        // The above example certainly does not quite look as ergonomic and clean, but the API needs to understand 
        // (a) which are all the calls we need to make and (b) the calls and their params (if required). So breaking it down -
        // const unsub = await api.queryMulti([
        //   api.query.timestamp.now,
        //   [api.query.system.account, ADDR]
        // ], ([now, { nonce, data: balance }]) => {
        //   console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
        // });
        //#endregion
    
        //#region Query extras  This section will aim to extend that knowledge showing some other features and utilities that are available on the api.query interfaces.
        //State at a specific block
          // Quite often it is useful (taking pruning into account, more on this later) to retrieve the state at a specific block. For instance we may wish to retrieve the current balance as well as the balance at a previous block for a specific account -
          // Retrieve the current block header
          // const lastHdr = await api.rpc.chain.getHeader();
          
          //=> at
          // Retrieve the balance at both the current and the parent hashes
          // const [{ data: balanceNow }, { data: balancePrev }] = await Promise.all([
          //   api.query.system.account.at(lastHdr.hash, ADDR),
          //   api.query.system.account.at(lastHdr.parentHash, ADDR)
          // ]);
          
          // Display the difference
          // console.log(`The delta was ${balanceNow.free.sub(balancePrev.free)}`);  
          // Retrieve the timestamp for the previous block
          // const momentPrev = await api.query.timestamp.now.at(lastHdr.parentHash);
          // The .at queries are all single-shot, i.e. there are no subscription option to these, since the state for a previous block should be static. (This is true to a certain extent, i.e. when blocks have been finalized).
          // An additional point to take care of (briefly mentioned above), is state pruning. By default a Polkadot/Substrate node will only keep state for the last 256 blocks, unless it is explicitly run in archive mode. This means that querying state further back than the pruning period will result in an error returned from the Node. (Generally most public RPC nodes only run with default settings, which includes aggressive state pruning)
    
          //=> range
          // State for a range of blocks  In addition to the .at queries, you can also query state starting at a specific historic block and up to either a specified or the latest blocks. This is done via the .range([from, to?], <...opt params>): [Hash, Type][] query. As an example -
          // Retrieve the current block header
          // const lastHdr = await api.rpc.chain.getHeader();
          // const startHdr = await api.rpc.chain.getBlockHash(lastHdr.number.unwrap().subn(500));
          // console.log(`lastHdr hash is: `,lastHdr.hash);
    
          // retrieve the range of changes
          // const changes = await api.query.system.account.range([startHdr],ADDR);
    
          // changes.forEach(([hash, value]) => {
          //   console.log(hash.toHex(), value.toHuman());
          // });
    
    
          //=> Map keys & entries
    
          //=> State entries
          // In addition to using api.query to make actual on-chain queries, it can also be used to retrieve some information on the state entries. For instance to retrieve both the hash and size of an existing entry, we can make the following calls -
          // Retrieve the hash & size of the entry as stored on-chain
          // const [entryHash, entrySize] = await Promise.all([
          //   api.query.system.account.hash(ADDR),
          //   api.query.system.account.size(ADDR)
          // ]);
          // Output the info
          // console.log(`The current size is ${entrySize} bytes with a hash of ${entryHash}`);
    
    
          //=> Entry metadata
          // It has been explained that the api.query interfaces are decorated from the metadata. This also means that there is some information that we can gather from the entry, as decorated -
          // Extract the info
          // const { meta, method, section } = api.query.system.account;
          // The section & method is an indication of where it is exposed on the API. In addition the meta holds an array with the metadata documentation for the entry.
    
          // Display some info on a specific entry
          // console.log(`${section}.${method}: ${meta.documentation.join(' ')}`);    //system.account:  The full account information for a particular account ID.
          // console.log(`query key: ${api.query.system.account.key(ADDR)}`);
          // The key endpoint requires some explanation. In the chain state, the key values (identified by the module, method & params) are hashed and this is used as a lookup. So underlying a single-shot query would utilize the api.rpc.state.getStorage entry, passing the output of key (which is a hashed representation of the values). Apart from the hashing, the API also takes care of type formatting, handling optional values and merging results across multiple subscriptions.
          
          //#endregion
          //#region *** KEYRING ***
            //#region Additionally you can sign and verify using the pairs. This is the same internally to the API when constructing transactions -
            // // Some helper functions used here
            // // import { stringToU8a, u8aToHex } from '@polkadot/util';
            // const { stringToU8a, u8aToHex } = require('@polkadot/util');
    
            // // Convert message, sign and then verify
            // const message = stringToU8a('this is our message');
            // const signature = alice.sign(message);
            // const isValid = alice.verify(message, signature);
            // // Log info
            // console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
          //#endregion
                //#region *** TRANSACTIONS ****
        //   // Transaction endpoints are exposed, as determined by the metadata, on the api.tx endpoint. These allow you to submit transactions for inclusion in blocks, be it transfers, setting information or anything else your chain supports.
    
        //   //=> Simple transactions
        //   // // Sign and send a transfer from Gillian to Emma To start off, let's make a balance transfer from Gillian to Emma.
        //   // const txHash = await api.tx.balances
        //   //   .transfer(Emma.address, 1234567)
        //   //   .signAndSend(Gillian);
          
            
        //   // // Show the hash
        //   // console.log(`Gillian made a transfer to Emma. Submitted with hash ${txHash}`);
        //   // // We construct a transaction by calling balances.transfer(<accountId>, <value>) with the required params and then as a next step we submit it to the node.
        //   // // As with all other API operations, the to params just needs to be "account-like" and the value params needs to be "number-like", the API will take care of encoding and conversion into the correct format.
        //   // // The result for this call (we will deal with subscriptions in a short while), is the transaction hash. This is a hash of the data and receiving this does not mean that transaction has been included, but rather only that it has been accepted for propagation by the node. (It can still fail on execution, we will handle this in some of our follow-up sections.)
    
        //   //=> Under the hood
        //   // Despite the single-line format of signAndSend, there is a lot happening under the hood (and all of this can be manually provided) -
        //   // Based on the sender, the API will query system.account (or system.accountNonce on older chains) to determine the next nonce to use
        //   // The API will retrieve the current block hash and use it to create a mortal transaction, i.e. the transaction will only be valid for a limited number of blocks (by default this is 5 mins at 6s block times)
        //   // It will construct a payload and sign this, this includes the genesisHash, the blockHash for the start of the mortal era as well as the current chain specVersion
        //   // The transaction is submitted to the node
        //   // As suggested, you can override all of this, i.e. by retrieving the nonce yourself and passing that as an option, i.e. signAndSend(alice, { nonce: aliceNonce }), this could be useful when manually tracking and submitting transactions in bulk.
    
    
        //   //=> Transaction subscriptions  See when the transaction is incuded in a Block and when it is Finalized
        //   // Transaction inclusion  To send a transaction and then waiting until it has been included in a block, we will use a subscription interface instead of just waiting for the transaction pool addition to yield the extrinsic hash.
        //   // Make a transfer from Alice to Emma, waiting for inclusion
        //   // const unsub = await api.tx.balances
        //   //   .transfer(Emma.address, 12345)
        //   //   .signAndSend(alice, (result) => {
        //   //     // The result object has 2 parts, events (to to covered in the next section) and the status enum.
        //   //     // When the status enum is in Finalized state (checked via isFinalized), the underlying value contains the block hash of the block where the transaction has been finalized. 
        //   //     // Finalized will follow InBlock, which is the block where the transaction has been included. 
        //   //     // InBlock does not mean the block is finalized, but rather applies to the transaction state, where Finalized means that the transaction cannot be forked off the chain.
    
        //   //     console.log(`Current status is ${result.status}`);
    
        //   //     if (result.status.isInBlock) {
        //   //       console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
        //   //     } else if (result.status.isFinalized) {
        //   //       console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
        //   //       unsub();
        //   //     }
        //   //   });
    
    
        //   //=> Transaction events
        //   // Any transaction will emit events, as a bare minimum this will always be either a system.ExtrinsicSuccess or system.ExtrinsicFailed event for the specific transaction. 
        //   // These provide the overall execution result for the transaction, i.e. execution has succeeded or failed.
    
        //   // Depending on the transaction sent, some other events may however be emitted, for instance for a balances.transfer this could include one or more of Transfer, NewAccount or ReapedAccount, as defined in the substrate balances event defaults (http://polkadot.js.org/docs/substrate/events/#balances).
        //   // To display or act on these events, we can do the following -
          
        //   // // Make a transfer from Alice to Emma, waiting for inclusion
        //   // const unsub = await api.tx.balances
        //   //   .transfer(Emma.address, 123456789)
        //   //   .signAndSend(Gillian, ({ events = [], status }) => {
        //   //     console.log(`Current status is ${status.type}`);
          
        //   //     if (status.isFinalized) {
        //   //       console.log(`Transaction included at blockHash ${status.asFinalized}`);
          
        //   //       // Loop through Vec<EventRecord> to display all events
        //   //       events.forEach(({ phase, event: { data, method, section } }) => {
        //   //         console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
        //   //       });
          
        //   //       unsub();
        //   //     }
    
        //   //   });
        //   //   // Be aware that when a transaction status is isFinalized, it means it is included, but it may still have failed - for instance 
        //   //   // if you try to send a larger amount that you have free, the transaction is included in a block, however from a end-user perspective the transaction failed since the transfer did not occur. 
        //   //   // In these cases a system.ExtrinsicFailed event will be available in the events array.
    
    
        //   //=> Payment information
        //   // The Polkadot/Substrate RPC endpoints exposes weight/payment information that takes an encoded extrinsic and calculates the on-chain weight fees for it. 
        //   // A wrapper for this is available on the tx itself, taking exactly the same parameters as you would pass to a normal .signAndSend operation, specifically .paymentInfo(sender, <any options>)
          
        //   // construct a transaction
        //   const transfer = api.tx.balances.transfer(Emma.address, 22334455);
    
        //   // retrieve the payment info
        //   const { partialFee, weight } = await transfer.paymentInfo(Gillian);
        //   console.log(`transaction will have a weight of ${weight}, with ${partialFee.toHuman()} weight fees`);
    
        //   // send the tx
        //   const unsub = await transfer
        //   .signAndSend(Gillian, ({ events = [], status }) => {
        //     console.log(`Current status is ${status.type}`);
        
        //     if (status.isFinalized) {
        //       console.log(`Transaction included at blockHash ${status.asFinalized}`);
        
        //       // Loop through Vec<EventRecord> to display all events
        //       events.forEach(({ phase, event: { data, method, section } }) => {
        //         console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
        //       });
        
        //       unsub();
        //     }
    
        //   });
    
          //#endregion
    
    }

    if (setupSpecs.provider) parachain(setupSpecs.provider)
    else console.log(`App.js => setupSpecs.provider is undefined`);
    //#endregion  parachin events setup

  }, [setupSpecs.provider]);  


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