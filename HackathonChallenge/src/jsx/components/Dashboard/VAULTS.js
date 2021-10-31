import React from 'react';
import CoinDetailTab from '../Boltz/VAULTS/CoinDetailTab';

const CoinDetails = ({ setupSpecs, blockChainSpecs, blockHeader, blockTimestamp, extension, accountList, message }) => {
	return(
		<>
			<CoinDetailTab setupSpecs={setupSpecs} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} blockTimestamp={blockTimestamp} extension={extension} accountList={accountList} message={message} />
		</>
	)
}
export default CoinDetails; 