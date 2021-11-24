import React, { Component } from 'react';
import Link from 'next/link';

export default function Bond() {  
    
    return (
        <section className="activity-area load-more">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 offset-col-md-3 apy-rebase-common">
                        <div>
                            <div>Bond Price</div>
                            <div className="stake-bond-info">$1300.3423</div>
                        </div>
                        <div >
                            <div>Market Price</div>
                            <div className="stake-bond-info">$1310.5423</div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 offset-col-md-3">
                        {/* Netstorm Tab */}
                        <ul className="netstorm-tab nav nav-tabs nav-tab-common" id="nav-tab">
                            <li>
                                <Link href="/bond">
                                    <a className="active" id="nav-home-tab" data-toggle="pill">
                                        <h5 className="m-0">Bond</h5>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/redeem">
                                    <a id="nav-profile-tab" data-toggle="pill">
                                        <h5 className="m-0">Redeem</h5>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                        {/* Tab Content */}
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-bond">
                                <ul className="list-unstyled">
                                    <form className="item-form card no-hover stake-bond-form">
                                        <div className="row ">
                                            
                                            <div className="col-12">
                                                <div className="stake-bond-amount-box">
                                                    <input type="text" className="stake-bond-input" name="price" placeholder="0" required="required"/>
                                                    <button className="btn w-30" type="button" >Max</button>
                                                </div>
                                                Balance 0
                                            </div>
                                        </div>
                                    </form>
                                    <form className="item-form card no-hover stake-bond-form">
                                        <div className="row ">
                                            
                                            <div className="col-12">
                                                <div className="stake-bond-amount-box">
                                                    <input type="text" className="stake-bond-input" name="price" placeholder="0" required="required"/>
                                                    <button className="btn w-30" type="button" >Max</button>
                                                </div>
                                                Balance 0
                                            </div>
                                        </div>
                                    </form>

                                    <div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>Balance</div>
                                            <div>0 LP</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>What You'll Get</div>
                                            <div>0.000 sINF</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>Max Can Purchase</div>
                                            <div>37.8837 INF</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>Discount</div>
                                            <div>0.357%</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-amount-box stake-bond-info">
                                            <div>Vesting Tern</div>
                                            <div>5 Days</div>
                                        </div>
                                        <div className="col-md-12 stake-bond-btn-box stake-bond-info">
                                            <button className="btn btn-stake-bond" type="button" >Approve INF</button>
                                            <button className="btn btn-stake-bond" type="button" >ApproveUSDT</button>
                                        </div>
                                        <div className="col-md-12 stake-bond-btn-box stake-bond-info">
                                            <button className="btn w-100" type="button" >Approve</button>
                                        </div>
                                        
                                    </div>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-redeem">
                                <ul className="list-unstyled">
                                    <h1>Recent</h1>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-contact">
                                <ul className="list-unstyled">
                                    <h1>Purchase</h1>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
