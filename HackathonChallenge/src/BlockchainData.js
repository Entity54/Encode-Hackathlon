import React from 'react';


const BlockchainData = ({setupSpecs, blockChainSpecs, blockHeader, blockTimestamp}) => {

    return (
        <div>
          <table style={{backgroundColor: "#34495E", color:"white", width:"100%"}}>
                <thead>
                    <tr><th>Status</th><th>Wallet Address</th><th>NetworkName</th><th>ChainID</th><th>BlockNumber</th><th>GasPrice</th><th>Block Number</th><th>Block Hash</th><th>Block Size</th><th>Block Timestamp</th></tr>
                </thead>
                <tbody>
                    <tr><td>{setupSpecs.connected? setupSpecs.connected : null}</td><td>{setupSpecs.walletAddress? setupSpecs.walletAddress : null}</td><td>{blockChainSpecs.networkName? blockChainSpecs.networkName : null}</td><td>{blockChainSpecs.chainID? blockChainSpecs.chainID : null}</td><td>{blockChainSpecs.blockNumber? blockChainSpecs.blockNumber : null}</td><td>{blockChainSpecs.gasPrice? blockChainSpecs.gasPrice : null}</td><td style={{color:"#F1C40F"}}>{blockHeader.number? blockHeader.number : 'waiting'}</td><td style={{color:"#F1C40F"}}>{blockHeader.hash? blockHeader.hash : 'waiting'}</td><td style={{color:"#F1C40F"}}>{blockHeader.size? blockHeader.size : 'waiting'}</td><td style={{color:"#F1C40F"}}>{blockTimestamp? `${new Date(blockTimestamp)}` : 'waiting'}</td></tr>
                </tbody>
          </table>
        </div>
    );


};



export default BlockchainData;