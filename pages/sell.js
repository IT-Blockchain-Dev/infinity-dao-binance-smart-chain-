import React, { Component } from 'react';
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import Image from 'next/image'
import axios from "axios";

import { infinitydaoaddress, busdaddress } from '../config';
import InfinityDAO from '../artifacts/contracts/InfinityDAO.sol/InfinityDAO.json'
import BEP20Token from '../artifacts/contracts/BEP20Token.sol/BEP20Token.json'
// import BUSD from '../BUSD.json'

export default function stake() {

    
    const [minting, setMinting] = useState(false)
    const [formInput, updateFormInput] = useState({ price: '', address: '' })
  
    async function createNFTItem() {
        
        if (!formInput.price || !formInput.address)
        {
            alert("please input the address and amount of INF value.")
            return;
        }
        const web3Modal = new Web3Modal()
        
        const connection = await web3Modal.connect()
        console.log("connect")
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()
        console.log(InfinityDAO.abi)
        let infinityDaoContract = new ethers.Contract(infinitydaoaddress, InfinityDAO.abi, signer)

        
        console.log(formInput.price)
        let price = formInput.price*50;
        
        const priceApprove = ethers.utils.parseUnits(price.toString(), 'ether')
        console.log(priceApprove)
        // console.log(BUSD)
        // const contractBUSD = new ethers.Contract(busdaddress, BUSD, signer)
        const contractBUSD = new ethers.Contract(busdaddress, BEP20Token.abi, signer)
        await contractBUSD.approve(infinitydaoaddress, priceApprove)
        // await contractBUSD.approve(formInput.address, priceApprove)

        console.log("ss");
        try {
            const transaction = await infinityDaoContract.tax(signer.getAddress(), formInput.address, formInput.price,  busdaddress)  
            let tx = await transaction.wait()
        } catch (error) {
            console.log("hhhh")
            console.log(error)
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
    
    useEffect(async () => {
        
        
    }, [])

    
    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-center">
                    
                    <div className="col-12 col-md-6 col-lg-4 col-sm-8 offset-col-md-3">
                        
                        {/* Item Form */}
                        <form className="item-form card no-hover">
                            <div className="row ">
                                
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="address" placeholder=" To address" required="required" onChange={e => updateFormInput({ ...formInput, address: e.target.value })} />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="price" placeholder="INF amount" required="required" onChange={e => updateFormInput({ ...formInput, price: e.target.value })} />
                                    </div>
                                </div>
                                
                                <div className="col-12">
                                    {!minting && (
                                        <button className="btn w-100 mt-3 mt-sm-4" type="button" onClick={createNFTItem}>Sell INF</button>
                                    )}
                                    {minting && (
                                        <span className="btn w-100 mt-3 mt-sm-4 disabled" >{minting}</span>
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

