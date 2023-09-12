//https://github.com/iris112/php_web3/blob/master/ethereum_utils.php
//php код
$transaction = new Transaction([
    'nonce' => '0x'.$web3 -> utils -> toHex($nonce),
    'from' => $fromAddress,
    'to' => $toAddress,
    'gasLimit' => '0x'.$web3 -> utils -> toHex(100000),
    'gasPrice' => '0x'.$web3 -> utils -> toHex(10000000000),
    'value' => '0x'.$web3 -> utils -> toHex($web3 -> utils -> toWei($amount, 'ether')),
    'chainId' => 3,
    'data' => ''
]);

$transaction -> sign($privateKey);

//https://github.com/theRsk007/Binance-GetBalance-and-SendTransaction-Using-Nodejs-Web3Js-And-Metamask-And-Smart-Chain-Testnet/blob/master/api/routes/transactions.js
//код из множества js файлов
// Build the Transaction
const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: receiver,
    value: web3.utils.toHex(web3.utils.toWei(value, 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
}

//https://github.com/kerematam/send-ethereum-tx/blob/main/send-tx.js
//
const txData = {
    gasLimit: web3.utils.toHex(25000),
    gasPrice: web3.utils.toHex(10e9), // 10 Gwei
    to: addressTo,
    from: addressFrom,
    value: web3.utils.toHex(web3.utils.toWei(amount, "wei")), // thanks @abel30567
    // if you want to send raw data (e.g. contract execution) rather than sending tokens,
    // use 'data' instead of 'value' (thanks @AlecZadikian9001)
    // e.g. myContract.methods.myMethod(123).encodeABI() (thanks @NguyenHoangSon96)


    //https://github.com/theblock-dev/SendWeb3tx_NodeJS/blob/main/sendWeb3.js
    const tx = myContract.methods.setData(1);
    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: myContract.options.address,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: networkId
        },
        privateKey
    );