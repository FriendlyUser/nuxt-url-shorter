<template>
  <section class="container">
      Prepare to get redirected {{ this.$route.params.id }}
  </section>
</template>

<script>
import { ethers } from 'ethers';
import EthUrlABI from '../../store/EthUrlABI'
const address = '0x345ca3e014aaf5dca488057592ee47305d9b3e10' // insert deployed EIP20 token address here

let provider = ethers.getDefaultProvider('kovan');
let wallet = ethers.Wallet.createRandom();
wallet = wallet.connect(provider);
let contract = new ethers.Contract(address, EthUrlABI, wallet);
export default {
    mounted () {
        this.initContract()
        this.redirect()
    },
	methods: {
        initContract() {
            let address = "0x22559cb4b23daaccfad5715a976310f8f7dbc09b";
            let abi = 
            provider = ethers.getDefaultProvider('kovan');
            wallet = ethers.Wallet.createRandom();
            wallet = wallet.connect(provider);
            contract = new ethers.Contract(address, abi, wallet);
            console.log(contract);
        },
        redirect(){
            var id = this.$route.params.id
            if(!id){
                return
            }
            contract.getLink(id).then(url => {
                window.location.href = url[1];
            })
            .catch(error => {
                return window.alert("INVALID ID VALUE"); 
            })
        }
	}
}
</script>
