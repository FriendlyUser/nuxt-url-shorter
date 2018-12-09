<template>
  <div>
    <h2>Generate</h2>
    {{ this.$route.params.id }}
  </div>
</template>

<script>
  import { ethers } from 'ethers';
  import EthUrlABI from '../store/EthUrlABI'
  const address = '0xa40d4c7fb56635a8a2a4d47ab7975bdcda57ac2a' // insert deployed EIP20 token address here

  let provider = ethers.getDefaultProvider('kovan');
  let wallet = ethers.Wallet.createRandom();
  wallet = wallet.connect(provider);
  let contract = new ethers.Contract(address, EthUrlABI, wallet);
  export default {
    head: {
      title: 'Id Page'
    },
    mounted () {
        this.initContract()
        this.redirect()
    },
    methods: {
        initContract() {
          let address = "0xa40d4c7fb56635a8a2a4d47ab7975bdcda57ac2a";
          let abi = EthUrlABI
          console.log(abi)
          wallet = ethers.Wallet.createRandom();
          wallet = wallet.connect(provider);
          console.log(contract);
        },
        redirect(){
          var id =this.$route.params.id 
          if(!id){
              return
          }
          contract.getLink(id).then(url => {
              window.alert('Get Redirected')
              window.location.href = url[1];
          })
          .catch(error => {
              console.log(error)
              return window.alert("INVALID ID VALUE",error); 
          }) 
        }
      }
	  }
</script>
