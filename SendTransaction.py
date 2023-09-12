#pip install web3

#Initialise Variables
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('https://ropsten.infura.io/v3/<API>'))
Private_Key  =  '<Sender Private Key>'
from_address  =  '<Sender Public Address>'
to_address  =  '<Receiver Public Address>'

#Transaction Object
nonce = web3.eth.getTransactionCount(from_address)
gasPrice = web3.toWei('50', 'gwei')
value = web3.toWei(0.1, 'ether')

tx = {
    'nonce': nonce,
    'to': to_address,
    'value': value,
    'gas': 2000000,
    'gasPrice': gasPrice
}

#sign the transaction
signed_tx = web3.eth.account.sign_transaction(tx, Private_Key)

#send transaction
tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

#Print transaction hash in hex
print(web3.toHex(tx_hash))