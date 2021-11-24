import React, { Component } from 'react';
import Link from 'next/link'

export default function Stake() {  
    
    return (
        <section className="activity-area load-more">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 offset-col-md-3 apy-rebase-common">
                        <div>
                            <div>APY</div>
                            <div className="stake-bond-info">5464.5364%</div>
                        </div>
                        <div >
                            <div>Time until rebase</div>
                            <div className="stake-bond-info">5 hrs 19mins</div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 offset-col-md-3">
                        {/* Netstorm Tab */}
                        <ul className="netstorm-tab nav nav-tabs nav-tab-common" id="nav-tab">
                            <li>
                                <Link href="/stake">
                                    <a id="nav-home-tab" data-toggle="pill" href="#nav-stake">
                                        <h5 className="m-0">Stake</h5>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/unstake">
                                    <a className="active" id="nav-profile-tab" data-toggle="pill" href="#nav-unstake">
                                        <h5 className="m-0">Unstake</h5>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                        {/* Tab Content */}
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-unstake">
                                <ul className="list-unstyled">
                                    <form className="item-form card no-hover unstake-form">
                                        <div className="row ">
                                            
                                            <div className="col-12">
                                                Amount
                                                <div className="stake-bond-amount-box">
                                                    <input type="text" className="stake-bond-input" name="price" placeholder="0" required="required"/>
                                                    <button className="btn w-30" type="button" >Max</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>Balance</div>
                                            <div>0.000 INF</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>Staked</div>
                                            <div>0.000 sINF</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>Next reward amount</div>
                                            <div>0 INF</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>Next rebase yield</div>
                                            <div>0.357%</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>ROI (5-day rate)</div>
                                            <div>5.51 %</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-btn-box stake-bond-info">
                                            <button className="btn btn-stake-bond" type="button" >Approve</button>
                                            <button className="btn btn-stake-bond" type="button" >Stake</button>
                                        </div>
                                        
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
