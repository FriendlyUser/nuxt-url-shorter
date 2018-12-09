import { ethers } from 'ethers';
import EthUrlABI from './EthUrlABI'
const address = '0x345ca3e014aaf5dca488057592ee47305d9b3e10' // insert deployed EIP20 token address here

let provider = ethers.getDefaultProvider('kovan');
let wallet = ethers.Wallet.createRandom();
wallet = wallet.connect(provider);
let contract = new ethers.Contract(address, EthUrlABI, wallet);
export const state = () => ({})

export const mutations = {}

export const actions = {
    async redirect(){
        var id = window.location.href.split('?id=')[1]
        if(!id){
            return
        }
        try{
            $('body').hide();
            var url = await contract.getLink(id);
            window.location.href = url[1];
        }catch(err){
            return window.alert("INVALID ID VALUE"); 
        }
    }
}

export const getters = {}
