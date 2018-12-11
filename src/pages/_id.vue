<template>
  <div>
    <div class="loading-page">
      <p>Loading...</p>
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
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
      title: 'Url Redirect Page'
    },
    mounted () {
        this.initContract()
        this.redirect()
    },
    methods: {
        initContract() {
          let address = "0xa40d4c7fb56635a8a2a4d47ab7975bdcda57ac2a";
          let abi = EthUrlABI
          wallet = ethers.Wallet.createRandom();
          wallet = wallet.connect(provider);
        },
        redirect(){
          var id =this.$route.params.id 
          if(!id){
              return
          }
          contract.getLink(id).then(url => {
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
<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: rgb(43, 223, 58) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>