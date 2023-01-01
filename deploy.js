const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

//test network address http://127.0.0.1:7545

async function main() {
	const provider = new ethers.providers.JsonRpcBatchProvider(
		process.env.RPC_URL,
	);
	const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
	// let wallet = new ethers.Wallet.fromEncryptedJsonSync(
	// 	encryptedJson,
	// 	process.env.PRIVATE_KEY_PASSWORD,
	// );
	wallet = await wallet.connect(provider);
	console.log("Wallet --> ", wallet);
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
	// console.log(transactionReceipt);
	// const nonce = await wallet.getTransactionCount();
	// const tx = {
	// 	nonce,
	// 	gasPrice: 20000000000,
	// 	gasLimit: 1000000,
	// 	to: null,
	// 	value: 0,
	// 	data: "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea26469706673582212203fed89f05b7e0235b425e03b3f112d1f6eb2f1a5f27f5eb489d757467959250064736f6c63430008110033",
	// 	chainId: 1337,
	// };
	// const signedTxResponse = await wallet.signTransaction(tx);
	// const sentTxResponse = await wallet.sendTransaction(tx);
	// await sentTxResponse.wait(1);
	// console.log(sentTxResponse);

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
