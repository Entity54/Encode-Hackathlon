// import React, { useState, useEffect } from 'react';

import {createWallet} from './Setup.js';     //Blockchain provider,signer setup  createWallet for a customer and helper functions

import { ethers } from 'ethers';

// import Token54u_raw from './Abis/AMTC6_Predeployed_bytecodes';
import bytecodes from './Abis/AcalaMandalaTC6/AMTC6_Predeployed_bytecodes';   //addresses and names of predeployed sc
import Token_raw from './Abis/AcalaMandalaTC6/Token';  //abi of ERC20 token
import Oracle_raw from './Abis/AcalaMandalaTC6/Oracle';  //abi of Oracle
import Schedule_raw from './Abis/AcalaMandalaTC6/Schedule';  //abi of Scheduler
import DEX_raw from './Abis/AcalaMandalaTC6/DEX';  //abi of DEX

import Identicon from '@polkadot/react-identicon';   //used for icons of Substrate account
import aca_icon from "./icons/crypto/aca.png";
import ausd_icon from "./icons/crypto/ausd.png";
import dot_icon from "./icons/crypto/dot.png";
import ldot_icon from "./icons/crypto/ldot.png";
import renBTC_icon from "./icons/crypto/renbtc.png";
import kar_icon from "./icons/crypto/kar.png";
import kusd_icon from "./icons/crypto/kusd.png";
import ksm_icon from "./icons/crypto/ksm.png";
import lksm_icon from "./icons/crypto/lksm.png";
import xbtc_icon from "./icons/crypto/xbtc.png";
import polkaBTC_icon from "./icons/crypto/polkabtc.png";
import pha_icon from "./icons/crypto/pha.png";
import plm_icon from "./icons/crypto/plm.png";

let TokenBindings = {}, LP_TokenBindings = {};   //This will hold an object with all ERC20 token smart contracts

let customerAccount ;
let customerSubstrateAccount;
let customerWallet ;
let customerSCabstraction ;    //defines a scAbstraction connected to customer wallet so customer can sign transactions
let customerBalance ;
let spender        = { spenderAddress: undefined, spenderAllowance: undefined};
let customerSpenders = { spenders: []};
let baseToken;

let portfolio_Gillian = { ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined, ACA: undefined, LP_ACA_AUSD: undefined, LP_DOT_AUSD: undefined, LP_LDOT_AUSD: undefined, LP_RENBTC_AUSD: undefined, LP_KAR_KUSD: undefined, LP_KSM_KUSD: undefined, LP_LKSM_KUSD: undefined };
let portfolio_Emma   = { ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined, ACA: undefined, LP_ACA_AUSD: undefined, LP_DOT_AUSD: undefined, LP_LDOT_AUSD: undefined, LP_RENBTC_AUSD: undefined, LP_KAR_KUSD: undefined, LP_KSM_KUSD: undefined, LP_LKSM_KUSD: undefined };
let portfolio_Helen   = { ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined, ACA: undefined, LP_ACA_AUSD: undefined, LP_DOT_AUSD: undefined, LP_LDOT_AUSD: undefined, LP_RENBTC_AUSD: undefined, LP_KAR_KUSD: undefined, LP_KSM_KUSD: undefined, LP_LKSM_KUSD: undefined };

let sc_ACA                      = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_AUSD                      = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_DOT                       = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LDOT                      = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_RENBTC                  = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_KAR                        = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_KUSD                      = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_KSM                       = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LKSM                    = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LP_ACA_AUSD        = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LP_DOT_AUSD        = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LP_LDOT_AUSD      = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LP_RENBTC_AUSD  = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LP_KAR_KUSD        = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LP_KSM_KUSD        = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };
let sc_LP_LKSM_KUSD   = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined };

let sc_Oracle  = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined };
let oracle_EVM_Prices = { ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined };
let oracle_EVM_Icons = { ACA: aca_icon, AUSD: ausd_icon, DOT: dot_icon, LDOT: ldot_icon, RENBTC: renBTC_icon, KAR: kar_icon, KUSD: kusd_icon, KSM: ksm_icon, LKSM: lksm_icon, XBTC: xbtc_icon, POLKABTC: polkaBTC_icon, PHA: pha_icon, PLM: plm_icon };
let oracle_EVM_Description = { ACA: "Acala", AUSD: "Acala USD", DOT: "Polkadot", LDOT: "Liquid Dot", RENBTC: "Ren Bitcoin", KAR: "Karura", KUSD: "Karura USD", KSM: "Kusama", LKSM: "Liquid Kusama", XBTC: "XBTC", POLKABTC: "Polka Bitcoin", PHA: "Phala", PLM: "Astar Network" };
let oracle_EVM_PricesHuman = { ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined };


let sc_Schedule = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined };
    
let sc_DEX = { scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined };
let dexLiquidity = { tokenA: undefined, tokenB: undefined};



// const Predeployed = ({setupSpecs, getCurrentGasPrice}) => {
    //#region
    // const [sc, setSC]                             = useState({ scAddress: undefined, scABI: undefined, scReadOnly: undefined, scAbstraction: undefined });
    // const [scStateVariables, setSCStateVariables] = useState({ name: undefined, symbol: undefined, administrator: "", decimals: undefined, totalSupply: undefined });
    
    // const [customerAccount, setCustomerAccount]   = useState(undefined);
    // const [customerWallet, setCustomerWallet]     = useState(undefined);
    // const [customerSCabstraction, setCustomerSCAbstraction] = useState(undefined);    //defines a scAbstraction connected to customer wallet so customer can sign transactions
    // const [customerBalance, setCustomerBalance]   = useState(undefined);
    // const [spender, setSpender]                   = useState({ spenderAddress: undefined, spenderAllowance: undefined});
    // const [customerSpenders, setCustomerSpenders] = useState({ spenders: []});
    // const [customerSubstrateAccount, setCustomerSubstrateAccount]   = useState(undefined);


    // const [portfolio_Gillian, setPortfolio_Gillian] = useState({ ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined, ACA: undefined, LP_ACA_AUSD: undefined, LP_DOT_AUSD: undefined, LP_LDOT_AUSD: undefined, LP_RENBTC_AUSD: undefined, LP_KAR_KUSD: undefined, LP_KSM_KUSD: undefined, LP_LKSM_KUSD: undefined });
    // const [portfolio_Emma, setPortfolio_Emma]       = useState({ ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined, ACA: undefined, LP_ACA_AUSD: undefined, LP_DOT_AUSD: undefined, LP_LDOT_AUSD: undefined, LP_RENBTC_AUSD: undefined, LP_KAR_KUSD: undefined, LP_KSM_KUSD: undefined, LP_LKSM_KUSD: undefined });
    // const [portfolio_Helen, setPortfolio_Helen]     = useState({ ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined, ACA: undefined, LP_ACA_AUSD: undefined, LP_DOT_AUSD: undefined, LP_LDOT_AUSD: undefined, LP_RENBTC_AUSD: undefined, LP_KAR_KUSD: undefined, LP_KSM_KUSD: undefined, LP_LKSM_KUSD: undefined });

    // const [baseToken, setBaseToken]               = useState(undefined);


    // const [sc_ACA, setSC_ACA]                       = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_AUSD, setSC_AUSD]                     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_DOT, setSC_DOT]                       = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LDOT, setSC_LDOT]                     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_RENBTC, setSC_RENBTC]                 = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_KAR, setSC_KAR]                       = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_KUSD, setSC_KUSD]                     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_KSM, setSC_KSM]                       = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LKSM, setSC_LKSM]                     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LP_ACA_AUSD, setSC_LP_ACA_AUSD]       = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LP_DOT_AUSD, setSC_LP_DOT_AUSD]       = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LP_LDOT_AUSD, setSC_LP_LDOT_AUSD]     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LP_RENBTC_AUSD, setSC_LP_RENBTC_AUSD] = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LP_KAR_KUSD, setSC_LP_KAR_KUSD]       = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LP_KSM_KUSD, setSC_LP_KSM_KUSD]       = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // const [sc_LP_LKSM_KUSD, setSC_LP_LKSM_KUSD]     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    // // const [sc_CASH, setSC_CASH]                     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined, name: undefined, symbol: undefined, decimals: undefined, totalSupply: undefined });
    
    // const [sc_Oracle, setSC_Oracle]     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined });
    // const [oraclePrices, setOraclePrices] = useState({ ACA: undefined, AUSD: undefined, DOT: undefined, LDOT: undefined, RENBTC: undefined, KAR: undefined, KUSD: undefined, KSM: undefined, LKSM: undefined });
    // const [sc_Schedule, setSC_Schedule]     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined });
    // const [sc_DEX, setSC_DEX]     = useState({ scAddress: undefined, scReadOnly: undefined, scAbstraction: undefined });
    // const [dexLiquidity, setDexLiquidity]     = useState({ tokenA: undefined, tokenB: undefined});
    //#endregion


    //#region EVM_Setup
        const EVM_Setup = async (setupSpecs) => {
            if (setupSpecs.connected === 'Connected to AcalaMandalaTC6')
            {
                console.log('Predeployed_EVM setupSpecs.connected : ',setupSpecs.connected);
        
                //SMART CONTRACT SETUP SPECS
                //TOKENS
                const Token_ABI =  Token_raw.abi;                       
        
                //SMART CONTRACT ADDRESS  
                // const Token54u_Address = bytecodes[2][1]; //found in https://evm.acala.network/#/execute
        
                //CONTRACT ABSTRACTIONS
                // The Contracts object below are connected to the Provider which is read-only.for Read Only transactions
                // const Token54u_Contract =  new ethers.Contract(Token54u_Address, Token54u_ABI, setupSpecs.provider);

                //ACA
                const ACA_Contract =  new ethers.Contract( bytecodes[0][1], Token_ABI, setupSpecs.provider);
                sc_ACA = { scAddress: ACA_Contract.address, scReadOnly: ACA_Contract, scAbstraction: undefined, name: await ACA_Contract.name(), symbol: await ACA_Contract.symbol(), decimals: await ACA_Contract.decimals(), totalSupply: (await ACA_Contract.totalSupply()).toString() };
                //AUSD
                const AUSD_Contract =  new ethers.Contract( bytecodes[1][1], Token_ABI, setupSpecs.provider);
                sc_AUSD = { scAddress: AUSD_Contract.address, scReadOnly: AUSD_Contract, scAbstraction: undefined, name: await AUSD_Contract.name(), symbol: await AUSD_Contract.symbol(), decimals: await AUSD_Contract.decimals(), totalSupply: (await AUSD_Contract.totalSupply()).toString() };
                //DOT
                const DOT_Contract =  new ethers.Contract( bytecodes[2][1], Token_ABI, setupSpecs.provider);
                sc_DOT = { scAddress: DOT_Contract.address, scReadOnly: DOT_Contract, scAbstraction: undefined, name: await DOT_Contract.name(), symbol: await DOT_Contract.symbol(), decimals: await DOT_Contract.decimals(), totalSupply: (await DOT_Contract.totalSupply()).toString() };
                //LDOT
                const LDOT_Contract =  new ethers.Contract( bytecodes[3][1], Token_ABI, setupSpecs.provider);
                sc_LDOT = { scAddress: LDOT_Contract.address, scReadOnly: LDOT_Contract, scAbstraction: undefined, name: await LDOT_Contract.name(), symbol: await LDOT_Contract.symbol(), decimals: await LDOT_Contract.decimals(), totalSupply: (await LDOT_Contract.totalSupply()).toString() };
                //RENBTC
                const RENBTC_Contract =  new ethers.Contract( bytecodes[4][1], Token_ABI, setupSpecs.provider);
                sc_RENBTC = { scAddress: RENBTC_Contract.address, scReadOnly: RENBTC_Contract, scAbstraction: undefined, name: await RENBTC_Contract.name(), symbol: await RENBTC_Contract.symbol(), decimals: await RENBTC_Contract.decimals(), totalSupply: (await RENBTC_Contract.totalSupply()).toString() };
                //KAR
                const KAR_Contract =  new ethers.Contract( bytecodes[6][1], Token_ABI, setupSpecs.provider);
                sc_KAR = { scAddress: KAR_Contract.address, scReadOnly: KAR_Contract, scAbstraction: undefined, name: await KAR_Contract.name(), symbol: await KAR_Contract.symbol(), decimals: await KAR_Contract.decimals(), totalSupply: (await KAR_Contract.totalSupply()).toString() };
                //KUSD
                const KUSD_Contract =  new ethers.Contract( bytecodes[7][1], Token_ABI, setupSpecs.provider);
                sc_KUSD = { scAddress: KUSD_Contract.address, scReadOnly: KUSD_Contract, scAbstraction: undefined, name: await KUSD_Contract.name(), symbol: await KUSD_Contract.symbol(), decimals: await KUSD_Contract.decimals(), totalSupply: (await KUSD_Contract.totalSupply()).toString() };
                //KSM
                const KSM_Contract =  new ethers.Contract( bytecodes[8][1], Token_ABI, setupSpecs.provider);
                sc_KSM = { scAddress: KSM_Contract.address, scReadOnly: KSM_Contract, scAbstraction: undefined, name: await KSM_Contract.name(), symbol: await KSM_Contract.symbol(), decimals: await KSM_Contract.decimals(), totalSupply: (await KSM_Contract.totalSupply()).toString() };
                //LKSM
                const LKSM_Contract =  new ethers.Contract( bytecodes[9][1], Token_ABI, setupSpecs.provider);
                sc_LKSM = { scAddress: LKSM_Contract.address, scReadOnly: LKSM_Contract, scAbstraction: undefined, name: await LKSM_Contract.name(), symbol: await LKSM_Contract.symbol(), decimals: await LKSM_Contract.decimals(), totalSupply: (await LKSM_Contract.totalSupply()).toString() };

                //LP_ACA_AUSD
                const LP_ACA_AUSD_Contract =  new ethers.Contract( bytecodes[10][1], Token_ABI, setupSpecs.provider);
                sc_LP_ACA_AUSD = { scAddress: LP_ACA_AUSD_Contract.address, scReadOnly: LP_ACA_AUSD_Contract, scAbstraction: undefined }; //, name: await LP_ACA_AUSD_Contract.name(), symbol: await LP_ACA_AUSD_Contract.symbol(), decimals: await LP_ACA_AUSD_Contract.decimals(), totalSupply: (await LP_ACA_AUSD_Contract.totalSupply()).toString() });
                //LP_DOT_AUSD
                const LP_DOT_AUSD_Contract =  new ethers.Contract( bytecodes[11][1], Token_ABI, setupSpecs.provider);
                sc_LP_DOT_AUSD = { scAddress: LP_DOT_AUSD_Contract.address, scReadOnly: LP_DOT_AUSD_Contract, scAbstraction: undefined }; //, name: await LP_DOT_AUSD_Contract.name(), symbol: await LP_DOT_AUSD_Contract.symbol(), decimals: await LP_DOT_AUSD_Contract.decimals(), totalSupply: (await LP_DOT_AUSD_Contract.totalSupply()).toString() });
                //LP_LDOT_AUSD
                const LP_LDOT_AUSD_Contract =  new ethers.Contract( bytecodes[12][1], Token_ABI, setupSpecs.provider);
                sc_LP_LDOT_AUSD = { scAddress: LP_LDOT_AUSD_Contract.address, scReadOnly: LP_LDOT_AUSD_Contract, scAbstraction: undefined }; //, name: await LP_LDOT_AUSD_Contract.name(), symbol: await LP_LDOT_AUSD_Contract.symbol(), decimals: await LP_LDOT_AUSD_Contract.decimals(), totalSupply: (await LP_LDOT_AUSD_Contract.totalSupply()).toString() });
                //LP_RENBTC_AUSD
                const LP_RENBTC_AUSD_Contract =  new ethers.Contract( bytecodes[13][1], Token_ABI, setupSpecs.provider);
                sc_LP_RENBTC_AUSD = { scAddress: LP_RENBTC_AUSD_Contract.address, scReadOnly: LP_RENBTC_AUSD_Contract, scAbstraction: undefined }; //, name: await LP_RENBTC_AUSD_Contract.name(), symbol: await LP_RENBTC_AUSD_Contract.symbol(), decimals: await LP_RENBTC_AUSD_Contract.decimals(), totalSupply: (await LP_RENBTC_AUSD_Contract.totalSupply()).toString() });
                //LP_KAR_KUSD
                const LP_KAR_KUSD_Contract =  new ethers.Contract( bytecodes[14][1], Token_ABI, setupSpecs.provider);
                sc_LP_KAR_KUSD = { scAddress: LP_KAR_KUSD_Contract.address, scReadOnly: LP_KAR_KUSD_Contract, scAbstraction: undefined }; //, name: await LP_KAR_KUSD_Contract.name(), symbol: await LP_KAR_KUSD_Contract.symbol(), decimals: await LP_KAR_KUSD_Contract.decimals(), totalSupply: (await LP_KAR_KUSD_Contract.totalSupply()).toString() });
                //LP_KSM_KUSD
                const LP_KSM_KUSD_Contract =  new ethers.Contract( bytecodes[15][1], Token_ABI, setupSpecs.provider);
                sc_LP_KSM_KUSD = { scAddress: LP_KSM_KUSD_Contract.address, scReadOnly: LP_KSM_KUSD_Contract, scAbstraction: undefined }; //, name: await LP_KSM_KUSD_Contract.name(), symbol: await LP_KSM_KUSD_Contract.symbol(), decimals: await LP_KSM_KUSD_Contract.decimals(), totalSupply: (await LP_KSM_KUSD_Contract.totalSupply()).toString() });
                //LP_LKSM_KUSD
                const LP_LKSM_KUSD_Contract =  new ethers.Contract( bytecodes[16][1], Token_ABI, setupSpecs.provider);
                sc_LP_LKSM_KUSD = { scAddress: LP_LKSM_KUSD_Contract.address, scReadOnly: LP_LKSM_KUSD_Contract, scAbstraction: undefined }; //, name: await LP_LKSM_KUSD_Contract.name(), symbol: await LP_LKSM_KUSD_Contract.symbol(), decimals: await LP_LKSM_KUSD_Contract.decimals(), totalSupply: (await LP_LKSM_KUSD_Contract.totalSupply()).toString() });
                
                TokenBindings = {
                                    "ACA"           : sc_ACA,
                                    "AUSD"          : sc_AUSD,
                                    "DOT"           : sc_DOT,
                                    "LDOT"          : sc_LDOT,
                                    "RENBTC"        : sc_RENBTC,
                                    "XBTC"          : sc_RENBTC,
                                    "KAR"           : sc_KAR,
                                    "KUSD"          : sc_KUSD,
                                    "KSM"           : sc_KSM,
                                    "LKSM"          : sc_LKSM,
                                }
                
                LP_TokenBindings = {
                                    "LP_ACA_AUSD"   : sc_LP_ACA_AUSD,
                                    "LP_DOT_AUSD"   : sc_LP_DOT_AUSD,
                                    "LP_LDOT_AUSD"  : sc_LP_LDOT_AUSD,
                                    "LP_RENBTC_AUSD": sc_LP_RENBTC_AUSD,
                                    "LP_KAR_KUSD"   : sc_LP_KAR_KUSD,
                                    "LP_KSM_KUSD"   : sc_LP_KSM_KUSD,
                                    "LP_LKSM_KUSD"  : sc_LP_LKSM_KUSD,
                                   }

                console.log(`TokenBindings: `,TokenBindings,`LP_TokenBindings: `,LP_TokenBindings);

                //ORACLE
                const Oracle_ABI =  Oracle_raw.abi;                       
                const Oracle_Contract =  new ethers.Contract( bytecodes[19][1], Oracle_ABI, setupSpecs.provider);
                sc_Oracle = { scAddress: Oracle_Contract.address, scReadOnly: Oracle_Contract, scAbstraction: undefined };
                get_EVM_OraclePrices(Oracle_Contract);

                //SCHEDULER 
                const Schedule_ABI =  Schedule_raw.abi;                       
                const Schedule_Contract =  new ethers.Contract( bytecodes[20][1], Schedule_ABI, setupSpecs.provider);
                sc_Schedule = { scAddress: Schedule_Contract.address, scReadOnly: Schedule_Contract, scAbstraction: undefined };

                //DEX      
                const DEX_ABI =  DEX_raw.abi;       
                // const DEX_Contract =  new ethers.Contract( bytecodes[21][1], DEX_ABI, setupSpecs.provider);
                const DEX_Contract =  new ethers.Contract( "0x0000000000000000000000000000000000000804", DEX_ABI, setupSpecs.provider);
                // let liquidity = await DEX_Contract.getLiquidityPool("0x0000000000000000000000000000000001000002", "0x0000000000000000000000000000000001000001");
                // console.log(`liquidity for DOT and AUSD: `,liquidity)
                sc_DEX = { scAddress: DEX_Contract.address, scReadOnly: DEX_Contract, scAbstraction: undefined };
                
                
                //StateRent 18
                 
                
                //The Contract object below is connectedd to a Wallet/Signer so that we can pay to send state-changing transactions
                // const Token54u_Contract_ContractWithSigner = Token54u_Contract.connect(setupSpecs.wallet);
                // // console.log(`Token54u_Contract_ContractWithSigner : `,Token54u_Contract_ContractWithSigner);   

                // setSC({ scAddress: Token54u_Contract.address, scABI: Token54u_ABI, scReadOnly: Token54u_Contract, scAbstraction: Token54u_Contract_ContractWithSigner });
                // // setSCStateVariables({ name: await Token54u_Contract.name(), symbol: await Token54u_Contract.symbol(), administrator: await Token54u_Contract.admin(), decimals: await Token54u_Contract.decimals(), totalSupply: (await Token54u_Contract.totalSupply()).toString() });
                // setSCStateVariables({ name: await Token54u_Contract.name(), symbol: await Token54u_Contract.symbol(), administrator: "_|_", decimals: await Token54u_Contract.decimals(), totalSupply: (await Token54u_Contract.totalSupply()).toString() });

                //TOBE REMOVED ONLY PLACED HERE TEMPORARILY TILL ACCOUNTS ARE LOADED
                customerAccount = '0x5444d6aeb3760a87b2521f619d7ca9689b07e3bd';
                customerSubstrateAccount = '5F1hqrYBhnhhkvYd1q9QzfXy8BYJJXtL3EKfYBkcBtpHRnHx';

                return true;
            } else { 
                console.log(`NOT Connected to AcalaMandalaTC6'`); 
                return false; 
            }
        };
    //#endregion


    //#region  THIS IS NECESSARY BUT WILL NEED TO BE ALTERED GIVE ME SUBSTRATE ACCOUNT AND CREATE EVM ACCOUNT CREATE  WALLETs for the 4 addresses
    //updates everytime we have a new customer address
    // useEffect(() => {
    //     if (typeof(customerAccount) !== 'undefined')
    //     {
    //         console.log(`Customer Address : ${customerAccount}`);
    //         // getPortfolioHoldings(customerAccount);
    //         // getPortfolioHoldings(process.env.REACT_APP_evmAddress_Gillian);
    //         getPortfolioHoldings(process.env.REACT_APP_evmAddress_Emma);
    //         getPortfolioHoldings(process.env.REACT_APP_evmAddress_Helen);
            

    //         //POSSIBLE CUSTOMERS  GILLIAN, EMMA, OLIVIA
    //         let customWallet, customerName;
    //         if (customerAccount === process.env.REACT_APP_evmAddress_Gillian) 
    //         {
    //             customWallet = createWallet(setupSpecs.provider, process.env.REACT_APP_seed_Gillian);
    //             customerName= 'Gillian';
    //             setCustomerSubstrateAccount(process.env.REACT_APP_substrateAddress_Gillian);
    //         }
    //         else if (customerAccount === process.env.REACT_APP_evmAddress_Emma ) 
    //         {
    //             customWallet = createWallet(setupSpecs.provider, process.env.REACT_APP_seed_Emma);
    //             customerName= 'Emma';
    //             setCustomerSubstrateAccount(process.env.REACT_APP_substrateAddress_Emma);
    //         }
    //         else if (customerAccount === process.env.REACT_APP_evmAddress_Olivia) 
    //         {
    //             customWallet = createWallet(setupSpecs.provider, process.env.REACT_APP_rawSeed_Olivia);
    //             customerName= 'Olivia';
    //             setCustomerSubstrateAccount(process.env.REACT_APP_substrateAddress_Olivia);
    //         }
    //         else if (customerAccount === process.env.REACT_APP_evmAddress_Helen) 
    //         {
    //             customWallet = createWallet(setupSpecs.provider, process.env.REACT_APP_seed_Helen);
    //             customerName= 'Helen';
    //             setCustomerSubstrateAccount(process.env.REACT_APP_substrateAddress_Helen);
    //         }
    //         console.log(`customerName: ${customerName} customerAccount: ${customerAccount} customWallet: `,customWallet);

    //         //Update Singer and ContractAbstraction set for Customer To console log this will update after React refreshes  
    //         setCustomerWallet(customWallet);
    //         // const smartContractAbstraction_WithCustomerSigner = (sc.scReadOnly).connect(customWallet);
    //         // setCustomerSCAbstraction(smartContractAbstraction_WithCustomerSigner);   //sets customerSCabstraction
    //     }
    // },[customerAccount]);
    //#endregion 


    //#region get_EVM_OraclePrices
    const get_EVM_OraclePrices = async () => {
        console.log(`get_EVM_OraclePrices is run`);
        const Oracle_Contract = sc_Oracle.scReadOnly;

        if (Oracle_Contract)
        {
            const ACA_price =  (await Oracle_Contract.getPrice(bytecodes[0][1])).toString();
            console.log(`ACAprice : `,ACA_price);
            const AUSD_price =  (await Oracle_Contract.getPrice(bytecodes[1][1])).toString();
            console.log(`AUSD_price : `,AUSD_price);
            const DOT_price =  (await Oracle_Contract.getPrice(bytecodes[2][1])).toString();
            console.log(`DOT_price : `,DOT_price);
            const LDOT_price =  (await Oracle_Contract.getPrice(bytecodes[3][1])).toString();
            console.log(`LDOT_price : `,LDOT_price);
            const RENBTC_price =  (await Oracle_Contract.getPrice(bytecodes[4][1])).toString();
            console.log(`RENBTC_price : `,RENBTC_price);
            const KAR_price =  (await Oracle_Contract.getPrice(bytecodes[6][1])).toString();
            console.log(`KAR_price : `,KAR_price);
            const KUSD_price =  (await Oracle_Contract.getPrice(bytecodes[7][1])).toString();
            console.log(`KUSD_price : `,KUSD_price);
            const KSM_price =  (await Oracle_Contract.getPrice(bytecodes[8][1])).toString();
            console.log(`KSM_price : `,KSM_price);
            const LKSM_price =  (await Oracle_Contract.getPrice(bytecodes[8][1])).toString();
            console.log(`LKSM_price : `,LKSM_price);
    
            oracle_EVM_Prices = { ACA: ACA_price, AUSD: AUSD_price, DOT: DOT_price, LDOT: LDOT_price, RENBTC: RENBTC_price, KAR: KAR_price, KUSD: KUSD_price, KSM: KSM_price, LKSM: LKSM_price };
            oracle_EVM_PricesHuman = { ACA: (+ACA_price / 10**sc_ACA.decimals)  , AUSD: (+AUSD_price / 10**sc_AUSD.decimals), DOT: (+DOT_price / 10**18).toFixed(2), LDOT: (+LDOT_price/ 10**sc_LDOT.decimals), RENBTC: (+RENBTC_price / 10**18).toFixed(2), KAR: (+KAR_price / 10**sc_KAR.decimals), KUSD: (+KUSD_price / 10**sc_KUSD.decimals), KSM: (+KSM_price / 10**sc_KSM.decimals), LKSM: (+LKSM_price / 10**sc_LKSM.decimals) };
            console.log(`get_EVM_OraclePrices  sc_DOT.decimals: ${sc_DOT.decimals}    oracle_EVM_PricesHuman: `,oracle_EVM_PricesHuman);

            return oracle_EVM_PricesHuman;
        } else return null

    };
    //#endregion


    //#region btnGetTotalSupply  mint  burn
    // const btnGetTotalSupply = async () => {

    //     console.log(`customerWallet: `,customerWallet);
    //     console.log(`New customerSCabstraction is : `,customerSCabstraction);

    //     if (typeof(sc.scReadOnly) !== 'undefined')
    //     {
    //         const totalSupply =  (await sc.scReadOnly.totalSupply()).toString();
    //         const new_scStateVariables = {...scStateVariables, totalSupply, };
    //         console.log(`totalSupply is ${totalSupply}  new_scStateVariables: `,new_scStateVariables);
    //         setSCStateVariables( new_scStateVariables );
    //     }
    // };

    
    // const mint = async (e) => {
    //     e.preventDefault();

    //     const mintToAddress = e.target.elements[0].value;
    //     const mint_amount = e.target.elements[1].value;

    //     console.log(`scStateVariables.administrator : ${scStateVariables.administrator} customerAccount: ${customerAccount}`)

    //     if (typeof(sc.scAbstraction) !== 'undefined' && customerAccount === scStateVariables.administrator)
    //     {
    //         const gasPrice = await getCurrentGasPrice();
    //         const tx = await sc.scAbstraction.mint(mintToAddress, mint_amount,{ gasPrice, gasLimit: 100000, });
    //         console.log(`We have now minted ${mint_amount} to Account Address ${mintToAddress} tx: `,tx);
    //         btnGetTotalSupply();
    //     }
    // };

    // const burn = async (e) => {
    //     e.preventDefault();

    //     const burnToAddress = e.target.elements[0].value;
    //     const burn_amount = e.target.elements[1].value;

    //     if (typeof(sc.scAbstraction) !== 'undefined' && customerAccount === scStateVariables.administrator)
    //     {
    //         const gasPrice = await getCurrentGasPrice();
    //         // const tx = await sc.scAbstraction.burn(burnToAddress, burn_amount,{ gasPrice, gasLimit: 100000, });
    //         // console.log(`We have now burned ${burn_amount} to Account Address ${burnToAddress} tx: `,tx);
    //         btnGetTotalSupply();
    //     }
    // };
    //#endregion



    //#region get_EVM_Balance
    const get_EVM_Balance = async (customerAddress, tokenTicker) => {
        
        if (customerAddress)
        {
            const scReadOnly = TokenBindings[`${tokenTicker}`].scReadOnly;
            const decimals = TokenBindings[`${tokenTicker}`].decimals;
            const balance_WEI =  await scReadOnly.balanceOf(customerAddress);  
            const balance = ( balance_WEI / Math.pow(10,decimals) ).toFixed(4);
            console.log(`BALANCE FOR ${customerAddress} and tokenTicker: ${tokenTicker}  IS: `,balance);
            customerBalance = balance;
            baseToken = tokenTicker;
            return {balance, tokenTicker};
        }
        else 
        {
            console.log(`customerAddress is not provided in get_EVM_Balance`);
            return null;
        }
    };
    //#endregion


    //#region get_EVM_PortfolioHoldings
    const get_EVM_PortfolioHoldings = async (customerAddress) => {

        console.log(`get_EVM_PortfolioHoldings portfolio_Gillian : `,portfolio_Gillian);

        const tokenTickers = Object.keys(TokenBindings);
        console.log(`get_EVM_PortfolioHoldings tokenTickers : `,tokenTickers);

        let portfolio = {};
        for (let i=0; i<tokenTickers.length; i++)
        {
            let tokenTicker = tokenTickers[i];
            const scReadOnly = TokenBindings[`${tokenTicker}`].scReadOnly;
            const decimals = TokenBindings[`${tokenTicker}`].decimals;
            const balance_WEI =  await scReadOnly.balanceOf(customerAddress);  
            const balance = ( balance_WEI / Math.pow(10,decimals) ).toFixed(4);
            console.log(`BALANCE FOR ${customerAddress} and tokenTicker: ${tokenTicker}  IS: `,balance);
            portfolio[`${tokenTicker}`] = balance;
        }

        if (customerAddress === process.env.REACT_APP_evmAddress_Gillian) portfolio_Gillian = portfolio
        else if (customerAddress === process.env.REACT_APP_evmAddress_Emma) portfolio_Emma = portfolio
        else if (customerAddress === process.env.REACT_APP_evmAddress_Helen) portfolio_Helen = portfolio

        console.log(`get_EVM_PortfolioHoldings portfolio_Gillian : `,portfolio_Gillian);
        console.log(`get_EVM_PortfolioHoldings portfolio_Emma : `,portfolio_Emma);
        console.log(`get_EVM_PortfolioHoldings portfolio_Helen : `,portfolio_Helen);
    }
    //#endregion


    //#region handleGetBalance_EVM
    const handleGetBalance_EVM = async (e) => {
        e.preventDefault();
        const accountAddress = e.target.elements[0].value;
        const tokenTicker    = e.target.elements[1].value;

        // setCustomerAccount(accountAddress);
        get_EVM_Balance(accountAddress, tokenTicker);   //placed so if we request twice the balance for the same account we get an update without running again  //updates everytime we have a new customer address useEffect(() => {

        // getPortfolioHoldings(accountAddress);
        get_EVM_PortfolioHoldings(process.env.REACT_APP_evmAddress_Gillian);
        get_EVM_PortfolioHoldings(process.env.REACT_APP_evmAddress_Emma);
        get_EVM_PortfolioHoldings(process.env.REACT_APP_evmAddress_Helen);
    };
    //#endregion


    //#region approveSpender
    const approveSpender = async (e) => {
        e.preventDefault();

        const spenderAddress = e.target.elements[0].value;
        let amountForSpender = e.target.elements[1].value;
        const tokenToApprove = e.target.elements[2].value;

        let smartContractAbstraction_WithCustomerSigner;

        if (Object.keys(TokenBindings).includes(tokenToApprove) && typeof customerWallet !== "undefined") 
        {
            amountForSpender = amountForSpender * Math.pow(10,TokenBindings[tokenToApprove].decimals);
            console.log(`tokenToApprove :${tokenToApprove} has been found on TokenBindings => proceed`);
            const scReadOnly = TokenBindings[tokenToApprove].scReadOnly;
            smartContractAbstraction_WithCustomerSigner = scReadOnly.connect(customerWallet);
        }
        else 
        {
            console.log(`tokenToApprove :${tokenToApprove} has NOT been found on TokenBindings => return`);
            return;
        }

        console.log(`approveSpender=> customerAccount: ${customerAccount} spenderAddress: ${spenderAddress} amountForSpender: ${amountForSpender} tokenToApprove: ${tokenToApprove}`);

        if (typeof(smartContractAbstraction_WithCustomerSigner) !== 'undefined') {

            const gasPrice = "100000000"; //await getCurrentGasPrice();
            console.log(`Getting ready to submit an Approval`);

            try {
                const tx = await smartContractAbstraction_WithCustomerSigner.approve(spenderAddress, amountForSpender,{ gasPrice, gasLimit: 100000, });
                console.log(`We have now submitted a new approval of ${amountForSpender} for spenderAddress ${spenderAddress}  transaction tx: `,tx);
                const receiptOfMinedTransactions = await tx.wait();
                console.log(`APPROVAL => blockHash: ${receiptOfMinedTransactions.blockHash} blockNumber:${receiptOfMinedTransactions.blockNumber} confirmations:${receiptOfMinedTransactions.confirmations} status: ${receiptOfMinedTransactions.status} receiptOfMinedTransactions: `,receiptOfMinedTransactions);
            } catch(err) {
                console.log(`There has been an error in tx Approval error: `,err);
            }
        };

    };
    //#endregion


    //#region getAllowanceForSpender
    const getAllowanceForSpender = async (e) => {
        e.preventDefault();
        const spenderAddress = e.target.elements[0].value;
        const accountAddress = e.target.elements[1].value;
        const tokenToApprove = e.target.elements[2].value;

        let scReadOnly;

        if (Object.keys(TokenBindings).includes(tokenToApprove) && typeof customerWallet !== "undefined") 
        {
            console.log(`AllowancetokenToApprove :${tokenToApprove} has been found on TokenBindings => proceed`);
            scReadOnly = TokenBindings[tokenToApprove].scReadOnly;
        }
        else 
        {
            console.log(`AllowancetokenToApprove :${tokenToApprove} has NOT been found on TokenBindings => return`);
            return;
        }

        
        if (typeof(scReadOnly) !== 'undefined')
        {
            let allowance =  await scReadOnly.allowance(accountAddress, spenderAddress);
            allowance = (allowance / Math.pow(10,TokenBindings[tokenToApprove].decimals) ).toString();
            console.log(`Account ${accountAddress} has provided an allowance of ${allowance} for spender ${spenderAddress}`);
            // setSpender({spenderAddress: spenderAddress, spenderAllowance: allowance  });
        }
    };
    //#endregion


    //#region handleTransfer
    const handleTransfer = async (e) => {
        e.preventDefault();

        const amount = e.target.elements[0].value;
        const to = e.target.elements[1].value;
        console.log(`handleTransfer to: ${to} amount: ${amount}  customerWallet: `,customerWallet,` customerSCabstraction: `,customerSCabstraction);
        // console.log(`setupSpecs.wallet: `,setupSpecs.wallet,`   sc.scAbstraction: `,sc.scAbstraction);

        if (typeof(customerSCabstraction) !== 'undefined') {

            const gasPrice = "100000"; //await getCurrentGasPrice();
            console.log(`Getting ready to submit a handleTransfer`);
            // const tx = await sc.scAbstraction.transfer(to, amount,{ gasPrice, gasLimit: 100000, });
            // console.log(`We have now submitted a new transfer to Account address ${to} for ${amount} tokens tx: `,tx);
            const tx = await customerSCabstraction.transfer(to, amount,{ gasPrice, gasLimit: 100000, });
            console.log(`We have now submitted a new transfer to Account address ${to} for ${amount} tokens tx: `,tx);
        };

    };
    //#endregion


    //#region transferFrom
    const transferFrom = async (e) => {
        e.preventDefault();

        const from = e.target.elements[0].value;
        const to = e.target.elements[1].value;
        const tokenTicker = e.target.elements[2].value;
        let amount = e.target.elements[3].value;

        console.log(`transferFrom   from: ${from}  to: ${to} amount: ${amount} tokenTicker:${tokenTicker} customerWallet: `,customerWallet);

        let smartContractAbstraction_WithCustomerSigner;

        if (Object.keys(TokenBindings).includes(tokenTicker) && typeof customerWallet !== "undefined") 
        {
            amount = amount * Math.pow(10,TokenBindings[tokenTicker].decimals);
            console.log(`tokenTicker :${tokenTicker} has been found on TokenBindings => proceed`);
            const scReadOnly = TokenBindings[tokenTicker].scReadOnly;
            smartContractAbstraction_WithCustomerSigner = scReadOnly.connect(customerWallet);
        }
        else 
        {
            console.log(`tokenTicker :${tokenTicker} has NOT been found on TokenBindings => return`);
            return;
        }

        if (typeof(smartContractAbstraction_WithCustomerSigner) !== 'undefined') {

            const gasPrice = "100000"; //await getCurrentGasPrice();
            console.log(`Getting ready to submit a transferFrom`);

            try {
                const tx = await smartContractAbstraction_WithCustomerSigner.transferFrom(from, to, amount,{ gasPrice, gasLimit: 100000, });
                console.log(`We have now submitted a new transferFROM from Sender ${from} to Account address ${to} for ${amount} ${tokenTicker} EXTRINSIC HASH = tx.hash: ${tx.hash} tx.nonce: ${tx.nonce} tokens tx: `,tx);
                const receiptOfMinedTransactions = await tx.wait(); 
                console.log(`TRANSFER FROM => blockHash: ${receiptOfMinedTransactions.blockHash} blockNumber:${receiptOfMinedTransactions.blockNumber} confirmations:${receiptOfMinedTransactions.confirmations} status: ${receiptOfMinedTransactions.status} receiptOfMinedTransactions: `,receiptOfMinedTransactions);
            } catch(err) {
                console.log(`There has been an error in tx TransferFrom error: `,err);
                //examples:  trying to transfer more than possible, tx created to be mined but failed due to gas been low
            }

        };

    };
    //#endregion



    //#region getOraclePrices
    const dex_getLiquidity = async (e) => {
        console.log(`dex_getLiquidity is run`);

        e.preventDefault();
        const tokenA = e.target.elements[0].value;
        const tokenB = e.target.elements[1].value;

        if (typeof sc_DEX.scReadOnly !=="undefined")
        {
            const tokenA_address = TokenBindings[tokenA].scAddress;
            const tokenB_address = TokenBindings[tokenB].scAddress;
            console.log(`tokenA_address: ${tokenA_address} tokenB_address: ${tokenB_address}  sc_DEX.scReadOnly: `,sc_DEX.scReadOnly);
            // let liquidity = await (sc_DEX.scReadOnly).getLiquidityPool(tokenA_address, tokenB_address);
            let liquidity = await (sc_DEX.scReadOnly).getLiquidityPool("0x0000000000000000000000000000000001000002", "0x0000000000000000000000000000000001000001");


            // let liquidity = await (sc_DEX.scReadOnly).getLiquidityTokenAddress(0x0000000000000000000000000000000001000002, 0x0000000000000000000000000000000001000001);


            console.log(`dex_getLiquidity=> for ${tokenA} and ${tokenB} liquidity: `,liquidity);
            // setDexLiquidity({tokenA: undefined, tokenB: undefined});
        } else console.log(`sc_DEX.scReadOnly is undefined`);

    };
    //#endregion

   
    

    
    // return (
        // <div className="container">
            
            {/* Table */}
            {/* <div>
                <label style={{backgroundColor: "#17A2DA", color:"black", fontSize:"20px"}}>PREDEPLOYED SC</label>
                <table style={{backgroundColor: "#0D8EC2", color:"black", width:"100%"}}>
                        <thead>
                            <tr><th>Smart Contract Address</th><th>Name</th><th>Symbol</th><th>Decimals</th><th>Total Supply</th><th>Price</th><th>Gillian</th><th>Emma</th><th>Helen</th><th>Timestamp</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>{sc_ACA.scAddress? sc_ACA.scAddress : null}</td><td>{sc_ACA.name? sc_ACA.name : null}</td><td>{sc_ACA.symbol? sc_ACA.symbol : null}</td><td>{sc_ACA.decimals? sc_ACA.decimals : null}</td><td>{sc_ACA.totalSupply? sc_ACA.totalSupply : null}</td><td>{oraclePrices.ACA? oraclePrices.ACA : null}</td><td>{portfolio_Gillian.ACA}</td><td>{portfolio_Emma.ACA}</td><td>{portfolio_Helen.ACA}</td></tr>
                            <tr><td>{sc_AUSD.scAddress? sc_AUSD.scAddress : null}</td><td>{sc_AUSD.name? sc_AUSD.name : null}</td><td>{sc_AUSD.symbol? sc_AUSD.symbol : null}</td><td>{sc_AUSD.decimals? sc_AUSD.decimals : null}</td><td>{sc_AUSD.totalSupply? sc_AUSD.totalSupply : null}</td><td>{oraclePrices.AUSD? oraclePrices.AUSD : null}</td><td>{portfolio_Gillian.AUSD}</td><td>{portfolio_Emma.AUSD}</td><td>{portfolio_Helen.AUSD}</td></tr>
                            <tr><td>{sc_DOT.scAddress? sc_DOT.scAddress : null}</td><td>{sc_DOT.name? sc_DOT.name : null}</td><td>{sc_DOT.symbol? sc_DOT.symbol : null}</td><td>{sc_DOT.decimals? sc_DOT.decimals : null}</td><td>{sc_DOT.totalSupply? sc_DOT.totalSupply : null}</td><td>{typeof oraclePrices.DOT !=="undefined"? (Number(oraclePrices.DOT)/ Math.pow(10,18)).toFixed(2) : null}</td><td>{portfolio_Gillian.DOT}</td><td>{portfolio_Emma.DOT}</td><td>{portfolio_Helen.DOT}</td></tr>
                            <tr><td>{sc_LDOT.scAddress? sc_LDOT.scAddress : null}</td><td>{sc_LDOT.name? sc_LDOT.name : null}</td><td>{sc_LDOT.symbol? sc_LDOT.symbol : null}</td><td>{sc_LDOT.decimals? sc_LDOT.decimals : null}</td><td>{sc_LDOT.totalSupply? sc_LDOT.totalSupply : null}</td><td>{oraclePrices.LDOT? oraclePrices.LDOT : null}</td><td>{portfolio_Gillian.LDOT}</td><td>{portfolio_Emma.LDOT}</td><td>{portfolio_Helen.LDOT}</td></tr>
                            <tr><td>{sc_RENBTC.scAddress? sc_RENBTC.scAddress : null}</td><td>{sc_RENBTC.name? sc_RENBTC.name : null}</td><td>{sc_RENBTC.symbol? sc_RENBTC.symbol : null}</td><td>{sc_RENBTC.decimals? sc_RENBTC.decimals : null}</td><td>{sc_RENBTC.totalSupply? sc_RENBTC.totalSupply : null}</td><td>{typeof oraclePrices.RENBTC !=="undefined"? (Number(oraclePrices.RENBTC)/ Math.pow(10,18)).toFixed(2) : null}</td><td>{portfolio_Gillian.XBTC}</td><td>{portfolio_Emma.XBTC}</td><td>{portfolio_Helen.XBTC}</td></tr>
                            <tr><td>{sc_KAR.scAddress? sc_KAR.scAddress : null}</td><td>{sc_KAR.name? sc_KAR.name : null}</td><td>{sc_KAR.symbol? sc_KAR.symbol : null}</td><td>{sc_KAR.decimals? sc_KAR.decimals : null}</td><td>{sc_KAR.totalSupply? sc_KAR.totalSupply : null}</td><td>{oraclePrices.KAR? oraclePrices.KAR : null}</td><td>{portfolio_Gillian.KAR}</td><td>{portfolio_Emma.KAR}</td><td>{portfolio_Helen.KAR}</td></tr>
                            <tr><td>{sc_KUSD.scAddress? sc_KUSD.scAddress : null}</td><td>{sc_KUSD.name? sc_KUSD.name : null}</td><td>{sc_KUSD.symbol? sc_KUSD.symbol : null}</td><td>{sc_KUSD.decimals? sc_KUSD.decimals : null}</td><td>{sc_KUSD.totalSupply? sc_KUSD.totalSupply : null}</td><td>{oraclePrices.KUSD? oraclePrices.KUSD : null}</td><td>{portfolio_Gillian.KUSD}</td><td>{portfolio_Emma.KUSD}</td><td>{portfolio_Helen.KUSD}</td></tr>
                            <tr><td>{sc_KSM.scAddress? sc_KSM.scAddress : null}</td><td>{sc_KSM.name? sc_KSM.name : null}</td><td>{sc_KSM.symbol? sc_KSM.symbol : null}</td><td>{sc_KSM.decimals? sc_KSM.decimals : null}</td><td>{sc_KSM.totalSupply? sc_KSM.totalSupply : null}</td><td>{oraclePrices.KSM? oraclePrices.KSM : null}</td><td>{portfolio_Gillian.KSM}</td><td>{portfolio_Emma.KSM}</td><td>{portfolio_Helen.KSM}</td></tr>
                            <tr><td>{sc_LKSM.scAddress? sc_LKSM.scAddress : null}</td><td>{sc_LKSM.name? sc_LKSM.name : null}</td><td>{sc_LKSM.symbol? sc_LKSM.symbol : null}</td><td>{sc_LKSM.decimals? sc_LKSM.decimals : null}</td><td>{sc_LKSM.totalSupply? sc_LKSM.totalSupply : null}</td><td>{oraclePrices.LKSM? oraclePrices.LKSM : null}</td><td>{portfolio_Gillian.LKSM}</td><td>{portfolio_Emma.LKSM}</td><td>{portfolio_Helen.LKSM}</td></tr>
                            <tr><td>{sc_LP_ACA_AUSD.scAddress? sc_LP_ACA_AUSD.scAddress : null}</td><td>LP_ACA_AUSD</td></tr>
                            <tr><td>{sc_LP_DOT_AUSD.scAddress? sc_LP_DOT_AUSD.scAddress : null}</td><td>LP_DOT_AUSD</td></tr>
                            <tr><td>{sc_LP_LDOT_AUSD.scAddress? sc_LP_LDOT_AUSD.scAddress : null}</td><td>LP_LDOT_AUSD</td></tr>
                            <tr><td>{sc_LP_RENBTC_AUSD.scAddress? sc_LP_RENBTC_AUSD.scAddress : null}</td><td>LP_RENBTC_AUSD</td></tr>    
                            <tr><td>{sc_LP_KAR_KUSD.scAddress? sc_LP_KAR_KUSD.scAddress : null}</td><td>LP_KAR_KUSD</td></tr> 
                            <tr><td>{sc_LP_KSM_KUSD.scAddress? sc_LP_KSM_KUSD.scAddress : null}</td><td>LP_KSM_KUSD</td></tr>  
                            <tr><td>{sc_LP_LKSM_KUSD.scAddress? sc_LP_LKSM_KUSD.scAddress : null}</td><td>LP_LKSM_KUSD</td></tr>   
                        </tbody>
                </table>
                <br/>
            </div> */}

        {/* Wallet */}
        {/* <div className="row">
            <div className="col-sm-12">
                <h2 className="text-center">Wallet</h2>
                <div className="row">
                    <div className="col-sm-4">  
                        <label style={{backgroundColor: "#34495E", color:"white", fontSize:"18px", width:"450px"}}> SIGNER customerAccount </label> 
                        <label style={{backgroundColor: "#34495E", color:"white", fontSize:"18px", width:"450px"}}> 
                             <Identicon value={customerSubstrateAccount} size={48} theme={'polkadot'}/>
                             {customerAccount}
                        </label> 
                    </div>
                    <div className="col-sm-4"><label style={{backgroundColor: "#34495E", color:"white", fontSize:"18px"}}>customerBalance: {customerBalance} {baseToken}</label></div>
                    <div className="col-sm-4">
                        <table style={{backgroundColor: "#34495E", color:"white", width:"100%"}}>
                            <thead>
                                <tr><th>Customer Name</th><th>Customer EVM Address</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Gillian</td> <td>{process.env.REACT_APP_evmAddress_Gillian? process.env.REACT_APP_evmAddress_Gillian : null}</td></tr>
                                <tr><td>Emma</td> <td>{process.env.REACT_APP_evmAddress_Emma? process.env.REACT_APP_evmAddress_Emma : null}</td></tr>
                                <tr><td>Helen</td> <td>{process.env.REACT_APP_evmAddress_Helen? process.env.REACT_APP_evmAddress_Helen : null}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <form onSubmit={e => handleGetBalance(e)}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-3">  
                                <label htmlFor="accountAddress">Input Account Address</label>
                                <input type="text" className="form-control text-center" id="accountAddress" />
                            </div>
                            <div className="col-sm-1">  
                                <label htmlFor="tokenA">Token A</label>
                                <input type="text" className="form-control text-center" id="tokenA" />
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <br/>
                                    <button type="submit" className="btn btn-primary">Get Account Balance</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div> */}


        {/* handleTransfer */}
        // <div>
        // <div className="row">
        //     <div className="col-sm-12">
        //         <h2>Transfer</h2>
        //         <form onSubmit={e => handleTransfer(e)}>
        //             <div className="form-group">
        //                 <label htmlFor="amount">Amount</label>
        //                 <input type="number" className="form-control text-center" id="amount" />
        //             </div>
        //             <div className="form-group">
        //                  <label htmlFor="to">To</label>
        //                  <input type="text" className="form-control text-center" id="to" />
        //              </div>
        //              <button type="submit" className="btn btn-primary">Submit</button>
        //          </form>
        //     </div>
        // </div>
        // </div>


        // <br/>


        {/* approveSpender */}
        {/* <div className="row">
                <form onSubmit={e => approveSpender(e)}>
                <h4>Approve Spender</h4>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label htmlFor="spenderAddress">Spender Address</label>
                            <input type="text" className="form-control text-center" id="spenderAddress" />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label htmlFor="amountForSpender">Amount</label>
                            <input type="number" className="form-control text-center" id="amountForSpender" />
                        </div>
                    </div>
                    <div className="col-sm-1">
                        <div className="form-group">
                            <label htmlFor="tokenToApprove">Token</label>
                            <input type="text" className="form-control text-center" id="tokenToApprove" />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <br/>
                            <button type="submit" className="btn btn-primary">Approve amount for Spender</button>
                        </div>
                    </div>
                </div>
                <br/>
                </form>
            <div className="col-sm-6">

            </div>
        </div> */}


        {/* getAllowanceForSpender */}
        {/* <div className="row">
            <form onSubmit={e => getAllowanceForSpender(e)}>
            <h4>Spender Allowance</h4>
            <div className="row">

                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="spenderAddress">Spender Address</label>
                        <input type="text" className="form-control text-center" id="spenderAddress" />
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="accountAddress">Account Address</label>
                        <input type="text" className="form-control text-center" id="accountAddress" />
                    </div>
                </div>

                <div className="col-sm-1">
                    <div className="form-group">
                        <label htmlFor="tokenAl">Token</label>
                        <input type="text" className="form-control text-center" id="tokenAl" />
                    </div>
                </div>

                <div className="col-sm-2"><br/><label>Allowance: {spender.spenderAllowance}</label></div>

                <div className="col-sm-3">
                        <div className="form-group">
                            <br/>
                            <button type="submit" className="btn btn-primary">Get Allowance for Spender</button>
                        </div>
                </div>

            </div>
            </form>
        </div>
        <br/> */}


        {/* transferFrom */}
        {/* <div className="row">
            <form onSubmit={e => transferFrom(e)}>
            <h4>Transfer From</h4>
            <div className="row">

                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="senderAddress">Sender Address</label>
                        <input type="text" className="form-control text-center" id="senderAddress" />
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="recipientAddress">Recipient Address</label>
                        <input type="text" className="form-control text-center" id="recipientAddress" />
                    </div>
                </div>

                <div className="col-sm-1">
                    <div className="form-group">
                        <label htmlFor="tokenToTransfer">Token</label>
                        <input type="text" className="form-control text-center" id="tokenToTransfer" />
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input type="text" className="form-control text-center" id="amount" />
                    </div>
                </div>

                <div className="col-sm-3">
                        <div className="form-group">
                            <br/>
                            <button type="submit" className="btn btn-primary">Transfer From Sender</button>
                        </div>
                </div>

            </div>
            </form>
        </div>
        <br/> */}



        {/* scheduler */}
        {/* <div className="row">
            <form onSubmit={e => dex_getLiquidity(e)}>
            <h4>Scheduler</h4>
            <div className="row">

                <div className="col-sm-1">
                    <div className="form-group">
                        <label htmlFor="tokenA">Token A</label>
                        <input type="text" className="form-control text-center" id="tokenA" />
                    </div>
                </div>

                <div className="col-sm-1">
                    <div className="form-group">
                        <label htmlFor="tokenB">Token B</label>
                        <input type="text" className="form-control text-center" id="tokenB" />
                    </div>
                </div>

                <div className="col-sm-3">
                    <label>Token A Liquidity</label>
                    <label>{dexLiquidity.tokenA}</label>
                </div>
                <div className="col-sm-3">
                    <label>Token B Liquidity</label>
                    <label>{dexLiquidity.tokenB}</label>
                </div>

                <div className="col-sm-3">
                        <div className="form-group">
                            <br/>
                            <button type="submit" className="btn btn-primary">Get DEX Liquidity</button>
                        </div>
                </div>

            </div>
            </form>
        </div>
        <br/> */}



        {/* dex_getLiquidity */}
        {/* <div className="row">
            <form onSubmit={e => dex_getLiquidity(e)}>
            <h4>Get DEX Liquidity</h4>
            <div className="row">

                <div className="col-sm-1">
                    <div className="form-group">
                        <label htmlFor="tokenA">Token A</label>
                        <input type="text" className="form-control text-center" id="tokenA" />
                    </div>
                </div>

                <div className="col-sm-1">
                    <div className="form-group">
                        <label htmlFor="tokenB">Token B</label>
                        <input type="text" className="form-control text-center" id="tokenB" />
                    </div>
                </div>

                <div className="col-sm-3">
                    <label>Token A Liquidity</label>
                    <label>{dexLiquidity.tokenA}</label>
                </div>
                <div className="col-sm-3">
                    <label>Token B Liquidity</label>
                    <label>{dexLiquidity.tokenB}</label>
                </div>

                <div className="col-sm-3">
                        <div className="form-group">
                            <br/>
                            <button type="submit" className="btn btn-primary">Get DEX Liquidity</button>
                        </div>
                </div>

            </div>
            </form>
        </div> */}

     

      {/* <button type="button" id="findAllowance" onClick={(e) => btnReadAllowance(e)}>Find</button> */}

//   </div>

    // );
 

// };



// export default Predeployed;

export {
    EVM_Setup,
    get_EVM_OraclePrices,
    oracle_EVM_Prices,
    oracle_EVM_PricesHuman,
    oracle_EVM_Icons,
    oracle_EVM_Description,
    TokenBindings,
    LP_TokenBindings,
    get_EVM_Balance,
    get_EVM_PortfolioHoldings,
    handleGetBalance_EVM,
};
