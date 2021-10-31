# Encode-Hackathlon


# 1. Introduction
We have created this project to participate in the Encode Hackathlon for Polkadot and Acala Karura Challenges

With the new substrate technology that Polkadot and Kusama offer and blue chip parachains such as Acala and Karura and a layer of numerous innovative financile products, we believe there is the opportunity to design and develop unique financial engineering products to facilitate both the end user but also other protocols


# 2. Dapp Overview
The Dapp connects to the Acala Mandala TC6 testnet

The user can see coin prices provided by the Acala Api and the Acala EVM, along with the outstanding loans, total supply

Further more the user can choose his own account and see an analysis of his holdings in tokens, stablecoins, loans, and vaults (not deployed currently)

It is possible to use the DEX from Acala Api to swap a coin for another and to transfer coins to another account

An EVM equivalent version both for predeployed tokens and our own token T54u exists but not deployed here yet

Furthermore the user can see his account loans, manage these by depositing or withdrawing collateral, repaying or borrowing more AUSD, authorise or unauhorise his loan to another account and let it transfer it


# 3. Prerequisites
The user must use Chrome browser and have the Polkadot.JS Chrome extension installed when opening the Dapp locally ($npm start) or at https://hackathon-challenge-sungirl0401yt-gmailcom.vercel.app/react/demo/dashboard-dark
Either one or more prefinanced accounts can be imported and be used or the user can  create his own account and finance it via the acala/karura faucet
Here is a list of demo accounts the user can import to experience the Dapp

1. <p>REACT_APP_seed_Gillian             = 'hidden chicken pause divert strategy shift boss cross giraffe focus garment foot'</p>
   <p>REACT_APP_evmAddress_Gillian       = 0xda186b64108b4e117a1bbec33098d6cd99f85b63</p>
   <p> REACT_APP_substrateAddress_Gillian = 5CfNjYygrfiaAfGWaGRVgGdkTuDfykZsgSXfuxTkekqq7JBh </p>
2. <p>REACT_APP_seed_Emma                = 'smooth library soup dismiss dial shop cabin perfect blind fault slow cereal'</p>
   <p>REACT_APP_evmAddress_Emma          = 0x5444d6aeb3760a87b2521f619d7ca9689b07e3bd</p>
   <p>REACT_APP_substrateAddress_Emma    = 5F1hqrYBhnhhkvYd1q9QzfXy8BYJJXtL3EKfYBkcBtpHRnHx</p>
3. <p>REACT_APP_seed_Helen               = 'animal online sugar lizard slim biology tongue thrive quiz spawn other virus'</p>
   <p>REACT_APP_evmAddress_Helen         = 0x20518975941a280ec37b1285613b34446fb9f1d3</p>
   <p>REACT_APP_substrateAddress_Helen   = 5FNZdmuPipRa8fz5ab12Y8P2dKx9zFbMgNyDwoWQMLynbPg8 </p>
4. <p>REACT_APP_rawSeed_Olivia           = 0xeac01b96503ef67730c06471686bc92d85458c011323afbd71370863e74b1b9c</p>
   <p>REACT_APP_evmAddress_Olivia        = 0xeB0f1c5971CE15E6cfC154e835a111536917E36D</p>
   <p>REACT_APP_substrateAddress_Olivia  = 5G9KtfNMn6mqFq5BJueXZWqvEppagLRQiK7Hkd5Ng9aTRdKC</p>
5. <p>REACT_APP_seed_Martha              = 'pulp basket ketchup reward special word emotion bridge exercise polar cushion hotel'</p>
   <p>REACT_APP_substrateAddress_Martha  = 5QTpTQHHvisMv9unNSRDEqYR8wqAdHHBZe4NjyfFMZuKjtMG</p>
6. <p>REACT_APP_seed_Jenny               = 'section replace butter century shrug lab raw pulp drip duty magic drift'</p>
   <p>REACT_APP_substrateAddress_Jenny   = 5SzoyC8ADM7geLiaVAS4NFMscwuvHorcasBj5NjHKheXoW8a</p>

<p>Polkadot Extension Wallet password    = ntt54ntt54</p>
<p>Hellen and Gillian accounts have open loans in DOT, XBTC</p>


# 4. Dashboard
Account balance overview sums up and shows account balances per category

A market overview with Last Price and Total Supply for each coin

Note that in AMTC6 we could find live price feeding for ACAUSD (from EVM), DOT, XBTC,RENBTC, POLKABTC from Acala Api

All other coins have fictional prices.


# 5. Account>Portfolio
Shows the portfolio of the account. Exact coin holdings and value in USD for each coin

Summary statistics for the sectors Stablecoins, Tokens, Vaults(not deployed), Loans


# 6. DEX
Ability to SWAP one coin for another. (Note that only ACA/AUSD is currently available).  

Supply field is prefilled with current account token holdings

Abitly for a Quick transfer of a coin to another address. Click any of the demo-account contacts to prefill the address field
EVM versions exist but are not currently deployed (see source code)


# 7. LOANS
Active Loan Portfolio of the account with collateral and debit and health per coin

Manage an existing loan by depositing/withdrawing collateral, borrowing or repaying debt (AUSD)

Authorize Loan to another account so it can manage it or transfer it on your behalf

Unauthorize an existing loan that was preciously authorised to another account

Unauthorize all loans for all external accounts

Transfer a loan of another account to your account as long as your account has been authorised by original account owner of the loan 

Overview of all market loans (Collateral, Debit, Loan Parameters)


# 8. Vaults
Only a front end representation has been provided aiming at instigating ideas

A Vault for example ACA/DOT MC is an instrument that follows a mandate

For example for MC vaults the market cap of participated tokens e.g. ACA and DOT dictate the weightings

The user deposits the underlying(s) to the vault according to those weights, or alternatively provides any coin e.g. AUSD and the protocol swaps it to ACA and DOT accoridingly

Vault provides a LP token to the user

Vaults holdings are deposited in Acala and Karura to collect yield.

On top of that a liquidity incentive coin of the platform, the T54 ERC20 that lives currently in Acala Mandala TC6 boosts further the performed yield

With the safe, fast and very low fees of Acala and Karura, the Vaults can rebalance extremely frequently achieving:

a) The vault mandate is followed as closely as possible i.e. adjust Vault weights in token allocation based on latest market prices and total supply of ACA and DOT

b) Maximize APY by reinvesting collected Acala and Karura yield and T54 yield by also swapping those to Vault holdings (ACA/DOT)
This is futher enhanced by the native Acala/Karura predeployed Scheduler


The user of a Vault like the above (ACA/DOT MC) is happy with hodling ACA and DOT but according to their Market Cap, maximize yields and is indifferent to actual delta and volatility of the underlying instruments


# 9. Goals
Only a front end repsentation has been provided

When collecting yield in any of the Vaults the user has the option to predetermine or adjust how the yield proceeds are used

If no goals are defined the Vault will by defaut reinvest all profits into the Vaults increasing user's portfolio

Alternatively if the user defines a financial goal e.g. a car, a trip or a laptop or a LazyApe NFT or a Pension/Student plan  then the defined percentage of the yield
generated from his Vault holdings and by using the Acala/Karura EVM scheduler is deposited on a separate goal account.

The user owns that goals account. Those account holdings are also staked at Acala Karura for further yield generation 

A bonus T54 token yield is released.  

All goal account tokens are locked until the target is reached and then automatically are released

If the user wants to unlock those tokens earlier then he will receive all tokens deposited from Vault yield produce, but there is a 50% penanlty of the extra staking and T54 bonus tokens allocated to the goals account

Try creating on the platform a +New Task and type the Goal and the Vault which will contribute to the achievement of this goal


# 10. Social (Not deployed)
It is good to profit but it is better to profit with company

Set up with friends and family an Acala / Karura mutlisig account and participate in Vaults and Goals

When the time comes hit "distribute vaults' profits on next Scheduler call" to your party members


# 11. NFTs
An NFT market place to:

a) Buy/Sell your NFT (only a front end very basic representation)

b) Mint your own NFT on the spot (in Acala/Karura EVM) to repesent your account in Metaverse (not deployed) 


