// Initialize provider
import Web3 from "web3";
const HDWalletProvider = require("@truffle/hdwallet-provider");

const fromAddress = "0xb159752065EA68Ef0B22249Df25864E624fec45D";
const toAddress1 = "0x34a1E2E6b781763001ef7187Ba26ACb383BAed91";
const toAddress2 = "0x5d447Fc0F8965cED158BAB42414Af10139Edf0AF";
const toAddress3 = "0x4b53e317C5Fed469D9da4Ea1E7ac9694def4e82f";

// Zmok.io RPC provider mainnet endpoint
const provider = new HDWalletProvider(
  process.env.FROM_ADDRESS_PRIVATE_KEY,
  "https://api.zmok.io/mainnet/" + process.env.ZMOK_IO_APP_ID)
const web3 = new Web3(provider);

const sendValue = web3.toWei(1, "ether"); // Convert 1 ether to wei
const gasPrice = web3.utils.toHex(web3.utils.toWei("10", "gwei"));

// Create batch
const batch = web3.createBatch();

// Add send transaction1 to batch
batch.add(web3.eth.sendTransaction.request({from: fromAddress, to: toAddress1, value: sendValue, gas: gasPrice}, (error, txnHash) => {
  if (error) throw error;
  console.log(txnHash);
}));
// Add send transaction2 to batch
batch.add(web3.eth.sendTransaction.request({from: fromAddress, to: toAddress2, value: sendValue, gas: gasPrice}, (error, txnHash) => {
  if (error) throw error;
  console.log(txnHash);
}));
// Add send transaction3 to batch
batch.add(web3.eth.sendTransaction.request({from: fromAddress, to: toAddress3, value: sendValue, gas: gasPrice}, (error, txnHash) => {
  if (error) throw error;
  console.log(txnHash);
}));

// Send batch to provider
batch.execute();