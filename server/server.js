import express from "express";
import cors from "cors";
import crypto from "crypto";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
// import Filter from "bad-words";
import bodyParser from "body-parser";
// import { rateLimitMiddleware } from './middlewares/rateLimitMiddleware.js'
import { exec } from "child_process";
import helmet from "helmet";
import Web3 from "web3";
const BN = Web3.utils.BN;

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const privateKey =
	"562fe359510311a13a65de99e89b311d21f38f569585b3e4a13f70db88dab8cb";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log("tttt", account);
import { contractAbi } from "./assets/contractAbi.js";
const contractAddress = "0xe8d84dff7a27b1dbc9fb795fab224a9178148d1c";
const busdAddress = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
const usdtAddress = "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd";
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const allowedOrigins = ["https://chatblock.ai","https://dev.chatblock.ai", "http://localhost:3001"];

// const filter = new Filter();
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

app.use(helmet());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ origin: allowedOrigins }));

// ratelimiter middleware function
// app.use('/davinci', rateLimitMiddleware)
// app.use('/dalle', rateLimitMiddleware)

app.post("/webhook", (req, res) => {
	const payload = req.body;
	if (
		!(
			payload.ref.endsWith(process.env.MAIN_DEPLOY_BRANCH) ||
			payload.ref.endsWith(process.env.DEV_DEPLOY_BRANCH)
		)
	) {
		res
			.status(200)
			.send(
				`do not deploy: is not ${process.env.MAIN_DEPLOY_BRANCH}/${process.env.DEV_DEPLOY_BRANCH} branch ${payload.ref}`,
			);
		return;
	}

	const signature = req.headers["x-hub-signature-256"];
	console.log("signature", signature);
	const secret = Buffer.from(process.env.SECRET_TOKEN, "utf8");

	if (!verifySignature(payload, signature, secret)) {
		res.status(401).send("Signatures didn't match");
		return;
	}

	const deployScript = payload.ref.endsWith(process.env.MAIN_DEPLOY_BRANCH)
		? process.env.MAIN_DEPLOY_SCRIPT
		: process.env.DEV_DEPLOY_SCRIPT;
	exec(`/usr/bin/bash -x ${deployScript}`, (error, stdout, stderr) => {
		console.log("**");
		console.log("**");
		console.log("**");
		if (error !== null) {
			console.error(`webhook: ${error}`);
		}

		console.log("stdout", stdout);
		console.log("stderr", stderr);
		res.status(200).send({
			message: "done successfuly!",
		});
	});
});

function verifySignature(payload, signature, secret) {
	// Compute the expected signature
	const hmac = crypto.createHmac("sha256", secret);
	hmac.update(JSON.stringify(payload));
	const expectedSignature = `sha256=${hmac.digest("hex")}`;

	// Compare the expected signature with the actual signature
	return crypto.timingSafeEqual(
		Buffer.from(signature),
		Buffer.from(expectedSignature),
	);
}

/**
 * POST /davinci
 * Returns a response from OpenAI's text completion model.
 */
app.post("/davinci", async (req, res) => {
	console.log("tatata", req.body);
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
		console.log(count);
		if (count === 0) {
			let native = true;
			let tokenAddress = busdAddress;
			if (req.body.type === "USDT") {
				tokenAddress = usdtAddress;
				native = false;
			}
			if (req.body.type === "BUSD") {
				tokenAddress = busdAddress;
				native = false;
			}
			console.log(native);
			const txObject = {
				from: account.address,
				to: contractAddress,
				gas: web3.utils.toHex(500000),
				gasPrice: web3.utils.toHex(10e9),
				data: contract.methods
					.deduct(
						req.body.address,
						tokenAddress,
						native ? new BN("500000000000000") : new BN("150000000000000000"),
						native,
					)
					.encodeABI(),
			};
			const signedTx = await account.signTransaction(txObject);
			const txReceipt = await web3.eth.sendSignedTransaction(
				signedTx.rawTransaction,
			);
			console.log("txReceipt", txReceipt);
			console.log("deducted {} from {}", 0.15, req.body.address);
		}

		return res.status(200).send({
			bot: "This is response from Backend",
			limit: -1,
			count: count,
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
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
