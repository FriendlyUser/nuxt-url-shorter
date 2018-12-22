<template>
  <section class="container">
    <div>
      <app-logo />
      <h1 class="title">nuxt-shortener</h1>
      <h2 class="subtitle">Shorten your Urls here</h2>
	<div class="card">
      <h3 class="paragraph-title">Shorten URL</h3>
		<div class="row">
        <div>
            URL:
			<input
				class="url-field" 
				v-model="fullURL"
				title="fullURL"
				@change="validURL"
			/>
			<button class="addlink" @click="shorten" :disabled="txnPending">Send</button>
			<Loader v-show="txnPending" />
			<!-- Link to etherscan based on network, do later, for now hardcode etherscan.-->
			<p v-show="txnPending"> Transaction being made</p>
			<a v-show="txnPending"  v-bind:href="txnHashURL">{{this.txHashURL}} {{txHashURL}}</a>	
        </div>
			<!---
			<button
				type="button"
				class="btn"
				@click="showModal"
			>
				Open Modal!
			</button>
			-->
			<modal
				v-show="isModalVisible"
				@close="closeModal"
				v-bind:title="modalTitle"
				v-bind:content="this.modalContent"
			/>
     	 </div>
		</div>
    </div>
  </section>
</template>

<script>
// add check web3 and other features to make that the application can be loaded, could use my old 
// logic to check for network ids
import AppLogo from '~/components/AppLogo.vue'
import Loader from '~/components/Loader.vue'
import modal from '~/components/modal.vue'
import EthUrlABI from '~/store/EthUrlABI'
import {ethers} from 'ethers'
//import { Web3Provider } from 'ethers/providers';

let provider = ''  //= new ethers.providers.Web3Provider(web3.currentProvider);
let address = "0xa40d4c7fb56635a8a2a4d47ab7975bdcda57ac2a";
let contract //= new ethers.Contract(address, EthUrlABI, provider.getSigner());
export default {
	components: {
		AppLogo,
		modal,
		Loader
	},
	data() {
		return {
			tokenName: '',
			recipentAddress: '',
			transferReceipt: '',
			fullURL: '',
			urlValid: false,
			amount: 0,
			txnPending: false,
			txnHashURL: '',
			isModalVisible: false,
			modalTitle: null,
			modalContent: null
		}
	},
	mounted() {
		this.detectWeb3()
		this.initContract()
		this.checkNetwork()
		this.batchEvents(EthUrlABI, address)
	},
	methods: {
		validURL() {
			var re =/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
			if(this.fullURL !== '') {
				this.urlValid = re.test(this.fullURL)
			}
			console.log(re.test(this.fullURL))
			return re.test(this.fullURL)
		},
		checkNetwork() {
			console.log('CHECKING NETWORK');
			contract.getLink(1)
			.then((output) => {
				console.log('OUTPUT',output);
			})
			.catch((err) => {
				console.log('ERROR',err);
				console.log('Not logged into metamask, please relog and refresh.')
				this.modalTitle = 'Metamask Locked.'
				this.modalContent = 'Please login into metamask and refresh.'
				this.showModal()
			}); 
		},
		async detectWeb3() {
			console.log('stupid')
			if (window.ethereum) {
				window.web3 = new Web3(ethereum);
				try {
					// Request account access if needed
					await ethereum.enable();
					// Acccounts now exposed
					web3.eth.sendTransaction({/* ... */})
				} catch (error) {
					// User denied account access...
					// could be that metamask is already open
					console.log(error)
					// this.modalTitle = 'Access Denied.'
					// this.modalContent = 'Please login into metamask and refresh, otherwise you can just enjoy using urls, but cannot make new ones.'
					// this.showModal()
				}
			} else if (window.web3) {
				window.web3 = new Web3(web3.currentProvider);
				// Acccounts always exposed
				web3.eth.sendTransaction({/* ... */})
			}
			// Non-dapp browsers...
			else {
				this.modalTitle = 'Non Dapp Browser Detected.'
				this.modalContent = 'Oops, looks like you need to install metamask. See https://metamask.io/.'
				this.showModal()
				console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
			}
		},
		initContract() {
			provider = new ethers.providers.Web3Provider(web3.currentProvider);
			contract = new ethers.Contract(address, EthUrlABI, provider.getSigner());
    		console.log('e0x Contract Initiated');
		},
		batchEvents(abi, address) {
			//batch listening of events
			const MyContract = web3.eth.contract(EthUrlABI);
			const myContractInstance = MyContract.at(address);
			const events = myContractInstance.allEvents({event: 'LinkAdded', fromBlock: 0, toBlock: 'latest'});
			
			events.watch(function(error, result){
				console.log(result);
				//console.log(result.args.url, result.args.linkId.toNumber(), result.blockNumber, result.transactionHash);
				console.log(error,result)
				/*
				var shortUrl = '{0}/s?id={1}'.f(window.location.origin, result.args.linkId.toNumber());
				var shorterUrl = shortUrl.replace('https://','');
				var shorterUrl = shorterUrl.replace('http://','');
				var row = "\
					<tr>\
						<td><p class='smaller'>{0}</p></td>\
						<td style='min-width:133px'><a class='small' target='_blank' href='{1}'><strong>{2}</strong></a></td>\
						<td><a target='_blank' href='https://ropsten.etherscan.io/block/{3}'><code>{3}</code></a></td>\
						<td><a target='_blank' href='https://ropsten.etherscan.io/tx/{4}'>link</a></td>\
					</tr>".f(result.args.url,shortUrl,shorterUrl,result.blockNumber,result.transactionHash);
					**/
					// console.log(row);
					// $("#tx-table").prepend(row);
			})
		},
		async shorten() {
			this.detectWeb3();
			// url = document.getElementById("url").value;
			if(this.fullURL === ''){
				this.modalTitle = 'Url Empty'
				this.modalContent = 'Please enter in an url.'
				this.showModal()
				return 
			}
			if(!this.validURL()){
				this.modalTitle = 'Url Invalid'
				this.modalContent = 'Please enter in a valid url.'
				this.showModal()
				return 
			}
			// $("#info").html(""); 
			// $("#spinner").show();
			// $('#generate').prop('disabled', true);
			contract.createNewLink(this.fullURL)
			.then(tx => {
				console.log(tx.hash);
				this.txnPending = true
				this.txnHashURL = 'https://kovan.etherscan.io/' + tx.hash
				// $("#info").prepend( "<p>waiting for transaction to be mined</p><br>" );
			})
			.catch(error => {
				this.modalTitle = 'Rejected Transaction'
				this.modalContent = 'Darn, did I mention making links is free.'
				this.showModal()
				console.log(error)
			})

			// add this functionality to vue dapp and ipfs dapp
			contract.on("LinkAdded", (linkId, linkUrl) => {
				if(linkUrl !== this.fullURL){
					console.log('NOT MY EVENT');
					return
				}
				// $("#info").html( "<p>transaction confirmed</p> <a target='_blank' href='https://ropsten.etherscan.io/tx/{0}'>view tx on blockchain</a><br>".f(tx.hash) );
				var shortUrl = linkId.toNumber()
				// $("#info").prepend( "Short URL: <a target='_blank' href='{0}'>{0}</a><br>".f(shortUrl) );
				console.log("EVENT LISTENER", shortUrl, linkId.toNumber(), linkUrl);
				this.modalTitle = 'Link Added!'
				const url = window.location.href + linkId
				this.modalContent = 'Congrats, your link is available at ' + url
				this.showModal()
				//$("#spinner").hide();
				//$('#generate').prop('disabled', false);
				this.txnPending = false
    		})
		},
		// modal related 
		showModal() {
        	this.isModalVisible = true;
      	},
		closeModal() {
			this.isModalVisible = false;
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color:greenyellow;
}

.title {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.paragraph-title {
	font-weight: 300;
	font-size: 20px;
	color: #35495e;
	word-spacing: 5px;
	/* padding: 15px 0; */
}

.receipt-box {
	padding-top: 15px;
	width: 900px;
	word-break: break-all;
}

.row {
	padding: 10px;
}

input.url-field {
	width: 75%;
	padding: 12px 20px;
	margin: 8px 0;
	box-sizing: border-box;
}
input:focus {
	background-color: lightblue;
}

.card {
  	/* Add shadows to create the "card" effect */
	background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
	box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.card.container {
	padding: 2px 16px;
}

button.addlink {
 border:1px solid #8bcf54; -webkit-border-radius: 3px; -moz-border-radius: 3px;border-radius: 3px;font-size:12px;font-family:arial, helvetica, sans-serif; padding: 10px 10px 10px 10px; text-decoration:none; display:inline-block;text-shadow: -1px -1px 0 rgba(0,0,0,0.3);font-weight:bold; color: #FFFFFF;
 background-color: #a9db80; 
 background-image: -webkit-gradient(linear, left top, left bottom, from(#a9db80), to(#96c56f));
 background-image: -webkit-linear-gradient(top, #a9db80, #96c56f);
 background-image: -moz-linear-gradient(top, #a9db80, #96c56f);
 background-image: -ms-linear-gradient(top, #a9db80, #96c56f);
 background-image: -o-linear-gradient(top, #a9db80, #96c56f);
 background-image: linear-gradient(to bottom, #a9db80, #96c56f);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#a9db80, endColorstr=#96c56f);
}

button.addlink:hover{
 border:1px solid #74bf36;
 background-color: #8ed058; 
 background-image: -webkit-gradient(linear, left top, left bottom, from(#8ed058), to(#7bb64b));
 background-image: -webkit-linear-gradient(top, #8ed058, #7bb64b);
 background-image: -moz-linear-gradient(top, #8ed058, #7bb64b);
 background-image: -ms-linear-gradient(top, #8ed058, #7bb64b);
 background-image: -o-linear-gradient(top, #8ed058, #7bb64b);
 background-image: linear-gradient(to bottom, #8ed058, #7bb64b);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#8ed058, endColorstr=#7bb64b);
}
</style>
