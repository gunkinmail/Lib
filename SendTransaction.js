const Web3 = require('web3');

const web3 = new Web3("https://ropsten.infura.io/v3/<API>");

const Private_Key = '<Private Key>';
const from_address = '<Public Address>';
const to_address = '<Receiver Public Address>';

async function eth_transaction() {
    var SingedTransaction = await web3.eth.accounts.signTransaction({
        to: to_address,
        value: '1000000000',
        gas: 2000000
    }, Private_Key);

    web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receipt) => {
        console.log(receipt);
    });
}

eth_transaction();