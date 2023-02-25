import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import Filter from "bad-words";
// import { rateLimitMiddleware } from './middlewares/rateLimitMiddleware.js'
import { exec } from "child_process";

import Web3 from "web3";
var BN = Web3.utils.BN;

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const privateKey =
	"df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account);
const contractAbi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "_from",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "NewDeposit",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "_to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "Withdrawal",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_user",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
		],
		name: "deduct",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
		],
		name: "deposit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_address",
				type: "address",
			},
		],
		name: "getBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address",
			},
		],
		name: "setToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "token",
		outputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
		],
		name: "withdraw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "withdrawOwner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
const contractAddress = "0x20292749BF77521D720D8ed8d6441Cbb7f9064D5";
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// const allowedOrigins = ['http://eyucoder.com', 'https://chatgpt.eyucoder.com', 'http://chatblock.ai']

const filter = new Filter();
const counter = new Map();

// Load environment variables from .env file
try {
	dotenv.config();
} catch (error) {
	console.error("Error loading environment variables:", error);
	process.exit(1);
}

// Create OpenAI configuration
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

// Create OpenAI API client
const openai = new OpenAIApi(configuration);

// Create Express app
const app = express();

// Parse JSON in request body
app.use(express.json());

// Enable CORS
app.use(cors());

// ratelimiter middleware function
// app.use('/davinci', rateLimitMiddleware)
// app.use('/dalle', rateLimitMiddleware)

/**
 * GET /
 * Returns a simple message.
 */
app.get("/", (req, res) => {
	res.status(200).send({
		message: "Hello World!",
	});
});

app.post("/webhook", (req, res) => {
	const scriptEvent = exec(
		`echo "${process.env.PASSWORD}" | sudo /usr/bin/bash "${process.env.DEPLOY}"`,
		{timeout: 5000},
		(error, stdout, stderr) => {
			console.log("req", req);
			console.log("**");
			console.log("**");
			console.log("**");
			if (error !== null) {
				console.error(`webhook: ${error}`);
			}

			console.log("stdout", stdout);
			console.log("stderr", stderr);
		},
	);

	scriptEvent.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	  });
	  
	  scriptEvent.on('close', (code) => {
		console.log(`child process close all stdio with code ${code}`);
	  });
	  
	  scriptEvent.on('exit', (code) => {
		console.log(`child process exited with code ${code}`);
	  });
	res.status(200).send({
		message: "done successfuly!",
	});
});

/**
 * POST /davinci
 * Returns a response from OpenAI's text completion model.
 */
app.post("/davinci", async (req, res) => {
	// Validate request body
	if (!req.body.prompt) {
		return res.status(400).send({
			error: 'Missing required field "prompt" in request body',
		});
	}

	try {
		let count = counter.get(req.body.address);
		if (count === undefined) count = 0;

		count = (count + 1) % 3;
		counter.set(req.body.address, count);

		if (count === 0) {
			const txObject = {
				from: account.address,
				to: contractAddress,
				gas: web3.utils.toHex(500000),
				gasPrice: web3.utils.toHex(10e9), // 10 Gwei
				data: contract.methods
					.deduct(req.body.address, new BN("150000000000000000"))
					.encodeABI(),
			};
			const signedTx = await account.signTransaction(txObject);
			const txReceipt = await web3.eth.sendSignedTransaction(
				signedTx.rawTransaction,
			);
			console.log("deducted {} from {}", 0.15, req.body.address);
		}

		return res.status(200).send({
			bot: "This is response from Backend",
			limit: -1,
		});

		/*
    // Call OpenAI API
    const { prompt, user } = req.body
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
                I want you to reply to all my questions in markdown format. 
                Q: ${cleanPrompt}?.
                A: `,
      user: user,
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    console.log(response.data.choices[0].text)
    console.log(user)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      limit: res.body.limit
    })
	*/
	} catch (error) {
		// Log error and return a generic error message
		console.error(error);
		res.status(500).send({
			error: "Something went wrong",
		});
	}
});

/**
 * POST /dalle
 * Returns a response from OpenAI's image generation model.
 */
app.post("/dalle", async (req, res) => {
	const { prompt, user } = req.body;

	try {
		const response = await openai.createImage({
			prompt: `${prompt}`,
			user: user,
			n: 1,
			size: "256x256",
		});

		console.log(response.data.data[0].url);
		res.status(200).send({
			bot: response.data.data[0].url,
			limit: res.body.limit,
		});
	} catch (error) {
		// Log error and return a generic error message
		console.error(error);
		res.status(500).send({
			error: "Something went wrong",
		});
	}
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
