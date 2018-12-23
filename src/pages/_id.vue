<template>
  <div>
    <div class="loading-page">
      <p>Redirecting...</p>
      <Loader />
    </div>
  </div>
</template>


<script>
  import { ethers } from 'ethers';
  import EthUrlABI from '../store/EthUrlABI'
  import Loader from '~/components/Loader.vue'
  const address = '0xa40d4c7fb56635a8a2a4d47ab7975bdcda57ac2a' // insert deployed EIP20 token address here

  let provider = ethers.getDefaultProvider('kovan');
  let wallet = ethers.Wallet.createRandom();
  wallet = wallet.connect(provider);
  let contract = new ethers.Contract(address, EthUrlABI, wallet);
  export default {
    head: {
      title: 'Url Redirect Page'
    },
    components: {
		  Loader
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
</style>