const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

//test network address http://127.0.0.1:7545

async function main() {
	const provider = new ethers.providers.JsonRpcBatchProvider(
		process.env.RPC_URL,
	);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
	const abi = fs.readFileSync(
		"./SimpleStorage_SimpleStorage_sol_SimpleStorage.abi",
		"utf-8",
	);
	const binary = fs.readFileSync(
		"./SimpleStorage_SimpleStorage_sol_SimpleStorage.bin",
		"utf-8",
	);
	const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
	console.log("Deploying, please wait ....");
	const contract = await contractFactory.deploy();
	const transactionReceipt = await contract.deployTransaction.wait(1); //number of confirmation to wait = 1

	//call function from contract
	const currentFavoriteNumber1 = await contract.retrieve();
	console.log(`favorite number : ${currentFavoriteNumber1.toString()}`);
	const transactionResponse = await contract.store("1998");
	console.log(transactionResponse);
	const currentFavoriteNumber2 = await contract.retrieve();
	console.log(`favorite number : ${currentFavoriteNumber2.toString()}`);
}

main()
	.then(() => ProcessingInstruction.exit(0))
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
