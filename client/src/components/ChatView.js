/* global BigInt */
import React, { useState, useRef, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import { ChatContext } from "../context/chatContext";
import { auth } from "../firebase";
import Thinking from "./Thinking";
import { useWalletConnection } from "../context/walletProvider";
import useContract from "../hooks/useContract";
import useErc20 from "../hooks/erc20";
import { Toaster } from "react-hot-toast";
import { IconButton } from "@chakra-ui/react";
import { IoWalletSharp as WalletOpenIcon } from "react-icons/io5";
import { FaWallet as WalletClosedIcon } from "react-icons/fa";
import { contractAddress, usdtAddress } from "../utils";
import { BigNumber } from "ethers";

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
	const { connectWallet, disconnectWallet, isConnected, progress, signer } =
		useWalletConnection();
	const { getBalance, deposit, withdraw } = useContract();
	const { approve, getRetrieveTokenDecimal } = useErc20(usdtAddress, signer);
	const [userBalance, setUserBalance] = useState(0);
	const [decimals, setDecimals] = useState(0);
	const messagesEndRef = useRef();
	const inputRef = useRef();
	const [formValue, setFormValue] = useState("");
	const [thinking, setThinking] = useState(false);
	const options = ["ChatGPT", "DALL·E"];
	const [selected, setSelected] = useState(options[0]);
	const [depositBalance, setDepositBalance] = useState(0);
	const [withdrawBalance, setWithdrawBalance] = useState(0);
	const [pressedEnter, setPressedEnter] = useState(false);
	const [showPrompt, setShowPrompt] = useState(false)
	const [messages, addMessage, , , setLimit] = useContext(ChatContext);
	const navigate = useNavigate();
	const user = auth.currentUser.uid;
	const picUrl =
		auth.currentUser.photoURL ||
		"https://api.adorable.io/avatars/23/abott@adorable.png";

	const handleGetDecimal = async () => {
		setDecimals(await getRetrieveTokenDecimal());
	};

	const handleGetBalance = async () => {
		if (decimals === 0) return;
		let balance =
			(await getBalance()).div(10 ** (decimals - 3)).toNumber() / 1000;
		console.log(balance);
		setUserBalance(balance);
	};

	const handleDeposit = async () => {
		if (depositBalance <= 0) return;
		await approve(
			contractAddress,
			BigInt(depositBalance * 10 ** decimals),
		).then(async (res) => {
			await deposit(BigInt(depositBalance * 10 ** decimals));
		});
	};

	const handleWithdraw = async () => {
		if (withdrawBalance <= 0) return;
		await withdraw(withdrawBalance);
	};
	/**
	 * Scrolls the chat area to the bottom.
	 */
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	/**
	 * Adds a new message to the chat.
	 *
	 * @param {string} newValue - The text of the new message.
	 * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
	 */
	const updateMessage = (newValue, ai = false, selected) => {
		const id = Date.now() + Math.floor(Math.random() * 1000000);
		const newMsg = {
			id: id,
			createdAt: Date.now(),
			text: newValue,
			ai: ai,
			selected: `${selected}`,
		};

		addMessage(newMsg);
	};

	/**
	 * Sends our prompt to our API and get response to our request from openai.
	 *
	 * @param {Event} e - The submit event of the form.
	 */
	const sendMessage = async (e) => {
		if (depositBalance <= 0){
			setShowPrompt(!showPrompt)
		} else {
			setShowPrompt(false)
		}
		e.preventDefault();
		console.log("decimals", decimals)
		if (decimals === 0) return;
		let balance =
			(await getBalance()).div(10 ** (decimals - 3)).toNumber() / 1000;
		setUserBalance(balance);

		if (balance <= 0) {
			alert("Low Balance");
			return;
		}

		const newMsg = formValue;
		const aiModel = selected;

		const API_URL = process.env.REACT_APP_API_URL;
		const resource = aiModel === options[0] ? "davinci" : "dalle";
		const POST_URL = API_URL + resource;
		console.log(POST_URL);
		setThinking(true);
		setFormValue("");
		updateMessage(newMsg, false, aiModel);

		const response = await fetch(POST_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				address: await signer.getAddress(),
				prompt: newMsg,
				user: user,
			}),
		});

		const data = await response.json();
		setLimit(data.limit);

		console.log(response.status);
		if (response.ok) {
			// The request was successful
			data.bot && updateMessage(data.bot, true, aiModel);
		} else if (response.status === 429) {
			setThinking(false);
		} else {
			// The request failed
			window.alert(`openAI is returning an error: ${
				response.status + response.statusText
			} 
      please try again later`);
			console.log(`Request failed with status code ${response.status}`);
			setThinking(false);
		}

		setThinking(false);

		if (decimals === 0) return;
		balance = (await getBalance()).div(10 ** (decimals - 3)).toNumber() / 1000;
		setUserBalance(balance);
	};

	/**
	 * Scrolls the chat area to the bottom when the messages array is updated.
	 */
	useEffect(() => {
		scrollToBottom();
	}, [messages, thinking]);

	/**
	 * Focuses the TextArea input to when the component is first rendered.
	 */
	useEffect(() => {
		inputRef.current.focus();
		handleGetDecimal();
		handleGetBalance();
	}, [decimals]);

	const manageAccount = () => {
		navigate('/deposits-and-withdrawals')
	}
	if (isConnected)
		return (
			<div className="chatview">
				<main className='chatview__chatarea'>
					<div className='connect-wallet'>
					<button className="connect-w" onClick={manageAccount}>
							<span>
								<WalletOpenIcon size="20" />
							</span>
							Wallet
						</button>
						<input
							className="connect-w"
							style={{ backgroundColor: "black", width: "100px" }}
							value={depositBalance}
							type='number'
							onChange={(e) => setDepositBalance(e.target.value)}
						/>
						<button className="connect-w" onClick={handleDeposit}>
							<span>
								<WalletOpenIcon size="20" />
							</span>
							Deposit
						</button>
						<input
							className="connect-w"
							style={{ backgroundColor: "black", width: "100px" }}
							value={withdrawBalance}
							type='number'
							onChange={(e) => setWithdrawBalance(e.target.value)}
						/>
						<button className="connect-w" onClick={handleWithdraw}>
							<span>
								<WalletClosedIcon size="20" />
							</span>
							Withdraw
						</button>
						<div className="connect-w" style={{ backgroundColor: "black" }}>
							{userBalance}
						</div>
					</div>

					{messages.map((message, index) => (
						<ChatMessage
							key={`key_${index}`}
							message={{ ...message, picUrl }}
						/>
					))}

					{thinking && <Thinking />}

					<span ref={messagesEndRef} />
				</main>
				<form className='form' onSubmit={sendMessage}>
					<select
						value={selected}
						onChange={(e) => setSelected(e.target.value)}
						className="dropdown"
					>
						<option>{options[0]}</option>
						<option>{options[1]}</option>
					</select>
					<textarea
						ref={inputRef}
						className='chatview__textarea-message'
						value={formValue}
						onChange={(e) => setFormValue(e.target.value)}
					/>
					<button
						type="submit"
						className='relative chatview__btn-send'
						disabled={!formValue}
					>
						Send
					</button>
					{showPrompt?(
					<div className="absolute bottom-[20px] right-[64px] h-[200px]">
						<img src="images/prompt.png" className="w-[200px] h-full" />
					</div>
					):null}
				</form>
			</div>
		);
	else
		return (
			<>
				<div className='connect-wallet h-[100px]' >
					<button
						className=""
						onClick={isConnected ? disconnectWallet : connectWallet}
					>
						<span>
							{isConnected ? (
								// <WalletOpenIcon size="20" />
								<div className="">
									<img src="/images/wallet-connected.png" className="w-full h-[100px]" />
									<img src="/images/main-deposit.png" className="w-full h-[100px]" />
								</div>
							) : (
								// <WalletClosedIcon size="20" />
								<img src="/images/connect-wallet.png" className="w-full h-[100px]" />
							)}
						</span>
						{/* Connect Wallet */}
						
					</button>
				</div>
				<text
					ref={inputRef}
					className='chatview__textarea-message'
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					style={{ display: "none" }}
				/>
			</>
		);
};

export default ChatView;
