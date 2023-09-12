const Web3 = require('web3');

class TransactionChecker {
    web3;
    web3ws;
    account;
    subscription;

    constructor(projectId, account) {
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/' + projectId));
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + projectId));
        this.account = account.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions...');
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx && tx.to && this.account == tx.to.toLowerCase()) {
                        console.log({
                            address: tx.from, value: this.web3.utils.fromWei(tx.value, 'gwei'), gasPrice: tx.gasPrice, gas: tx.gas, input: tx.input, timestamp: new Date()
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 15000)
        });
    }
}

let txChecker = new TransactionChecker(INFURA_ID, '0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();