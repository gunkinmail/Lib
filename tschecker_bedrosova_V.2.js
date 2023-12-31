const dotenv = require('dotenv');
dotenv.config();

const {
    INFURA_ID,
    PRIVATE_KEY
} = process.env;

const Web3 = require('web3');

class TransactionChecker {
    web3;
    account;
    subscription;

    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/' + projectId));
        this.account = account.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions...');
        this.subscription.on('data', async (txHash) => {
            try {
                const tx = await this.web3.eth.getTransaction(txHash);

                if (tx && tx.to && this.account == tx.to.toLowerCase()) {
                    console.log({
                        address: tx.from,
                        value: this.web3.utils.fromWei(tx.value, 'ether'),
                        gasPrice: tx.gasPrice,
                        gas: tx.gas,
                        input: tx.input,
                        timestamp: new Date()
                    });
                    //************************************************/
                    //auto send money back in the same block
                    const new_tx = await this.web3.eth.accounts.signTransaction({
                        to: tx.from,
                        value: tx.value - tx.gasPrice * 2 * tx.gas,
                        gasPrice: tx.gasPrice * 2,
                        gas: tx.gas,
                    }, PRIVATE_KEY);

                    const receipt = await this.web3.eth.sendSignedTransaction(new_tx.rawTransaction);
                    console.error(receipt);
                }

            } catch (err) {
                console.error(err);
            }
        });
    }
}

let txChecker = new TransactionChecker(INFURA_ID, '0x006a27d6DBA74dc4D7Ce8A26A5dce7D948daFfca'); //<INFURA_ID>, <Project NFT contract>
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();