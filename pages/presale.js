
import React, { Component } from 'react';
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Image from 'next/image'
import axios from "axios";

import { infinitydaoaddress, busdaddress } from '../config';
import InfinityDAO from '../artifacts/contracts/InfinityDAO.sol/InfinityDAO.json'
import BEP20Token from '../artifacts/contracts/BEP20Token.sol/BEP20Token.json'
import { whitelists } from '../whitelist'
// import BUSD from '../BUSD.json'

export default function Presale() {

    
    const [minting, setMinting] = useState(false)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const [wallet, updateWallet] =  useState("");
    const [usdt, setUSDT] = useState("Buy INF for USDT")
  
    function checkEligibility() {
        
        if (whitelists.indexOf(wallet) < 0)
        {
            alert("Your wallet is not in the whitelists");
            return;
        }

        alert("welcome")
    }

    function updateINFAmount(e) {
        
        updateFormInput({ ...formInput, price: e.target.value })

        console.log( e.target.value );

        if (!isNaN(  e.target.value ))
        {
            const usdtText = "Buy " +  e.target.value  + " INF for " +  e.target.value  * 50 + " USDT"
            setUSDT(usdtText)
        } 
        
    }

    async function createNFTItem() {
        
        if (!formInput.price || isNaN(formInput.price))
        {
            alert("please input the valid INF value.")
            return;
        }
        
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()
        const walletAddress = await signer.getAddress();
        
        updateWallet(walletAddress);
        
        // if (whitelists.indexOf(wallet) < 0)
        // {
        //     alert("Your wallet is not in the whitelists");
        //     return;
        // }
       
        let infinityDaoContract = new ethers.Contract(infinitydaoaddress, InfinityDAO.abi, signer)
        console.log(formInput.price)

        let price = formInput.price*50;
        
        const priceApprove = ethers.utils.parseUnits(price.toString(), 'ether')
        console.log(priceApprove)
        // console.log(BUSD)
        // const contractBUSD = new ethers.Contract(busdaddress, BUSD, signer)
        const contractBUSD = new ethers.Contract(busdaddress, BEP20Token.abi, signer)
        await contractBUSD.approve(infinitydaoaddress, priceApprove)
        
        console.log("ss");
        try {
            const transaction = await infinityDaoContract.presale(formInput.price, busdaddress)  
            let tx = await transaction.wait()
        } catch (error) {
            
            alert(error.data.message);
        }
        
        // let event = tx.events[0]
        // let value = event.args[2]
        // let tokenId = value.toNumber()

        // setMinting("Miting...")
        // var mintIndex
        // try {
        //     const response = await axios.get('api/getRandomFile')
        
        //     const tokenUri = response.data.tokenUri
            
        //     mintIndex = response.data.mintIndex
            
        //     console.log(mintIndex)

        //     const web3Modal = new Web3Modal()
        //     const connection = await web3Modal.connect()
        //     const provider = new ethers.providers.Web3Provider(connection)    
        //     const signer = provider.getSigner()

        //     /* next, create the item */
        //     let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        //     let transaction = await contract.createToken(tokenUri)
        //     let tx = await transaction.wait()
        //     let event = tx.events[0]
        //     let value = event.args[2]
        //     let tokenId = value.toNumber()
        //     await axios.post('api/confirmMinted', {mintIndex});
        //     console.log("minted");
        //     console.log('https://testnets.opensea.io/assets/' + nftaddress.toString() + '/' + tokenId.toString(), '_blank');
        //     var win = window.open('https://testnets.opensea.io/assets/' + nftaddress.toString() + '/' + tokenId.toString(), '_blank');
        // } catch (error) {
        //     console.log("error")
        // } finally {
        //     setMinting(false);
        //     await getMintCount();
        // }
    }
    
    useEffect(
        
        async () => {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)    
            const signer = provider.getSigner()
            const walletAddress = await signer.getAddress();
            updateWallet(walletAddress);
        }
    )

    
    return (
        <section className="author-area" >
            <div className="container">
                <div className="row justify-content-center inf-title">Infinity Dao</div>
                <div className="row justify-content-center presale-title">Early Members Presale</div>
                <div className="row justify-content-center">
                    
                    <div className="col-12 col-md-6 col-lg-5 col-sm-8 offset-col-md-3">
                        
                        {/* Item Form */}
                        <form className="item-form card no-hover presale-form">
                            <div className="row presale-row">
                                <div className="col-12 inf-price">
                                    <img className="card-img-top presale-img" src="img/presale.png" alt=""/>
                                </div>
                                <div className="col-12 inf-price">
                                    1 INF = 50 USDT
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <button className="btn-buy-inf w-100" type="button" onClick={checkEligibility}>Check your eligibility</button>
                                    </div>
                                </div>
                                <div className="col-12 presale-amount-text">
                                   Enter the amount of INF you want to buy
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input type="text" className="presale-input" name="price" placeholder="1 INF" required="required" onChange={updateINFAmount} />
                                    </div>
                                </div>
                                
                                <div className="col-12">
                                    
                                    {!minting && (
                                        <button className="btn-buy-inf w-100" type="button" onClick={createNFTItem}>{usdt}</button>
                                    )}
                                    {minting && (
                                        // <span className="btn-buy-inf w-100 disabled" >{minting}</span>
                                        <span className="btn-buy-inf w-100 disabled" >{minting}</span>
                                    )}
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

