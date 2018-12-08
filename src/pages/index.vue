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
         Full URL:
					<input 
						v-model="fullURL"
						title="fullURL"
						@change="validURL"
					/>
					<h1 v-if="urlValid">Yes</h1>
        </div>
				<button @click="validURL" v-bind:class="{'disabled': !urlValid }" >Send</button>
      </div>
			</div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import { ethers } from 'ethers';
export default {
	components: {
		AppLogo
	},
	data() {
		return {
			tokenName: '',
			recipentAddress: '',
			transferReceipt: '',
			fullURL: '',
			urlValid: false,
			amount: 0
		}
	},
	methods: {
		async validURL() {
			var re =/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
			if(this.fullURL !== '') {
				this.urlValid = re.test(this.fullURL)
			}
			console.log(re.test(this.fullURL))
			return re.test(this.fullURL)
		},
		async addLink() {

		}
		/** 
		async getTokenName() {
			this.tokenName = await this.$store.dispatch('eip20/getName')
		},
		async transfer() {
			this.transferReceipt = await this.$store.dispatch('eip20/transfer', {
				to: this.recipentAddress,
				value: this.amount
			})
		}
		*/
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
</style>
