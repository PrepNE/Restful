import Web3 from 'web3';
import VotingABI from '../../../contracts/build/contracts/Voting.json';

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545"); 
const web3 = new Web3(provider);

const contractAddress = process.env.CONTRACT_ADDRESS!;
const privateKey = process.env.PRIVATE_KEY!;

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const votingContract = new web3.eth.Contract(
  VotingABI.abi,
  contractAddress
);

web3.eth.getCode(contractAddress).then(code => {
  if (code === '0x') {
    console.error("❌ No contract deployed at this address!");
  } else {
    console.log("✅ Contract found at address.");
  }
});



export { web3, votingContract, account };
