import React, { Component } from 'react';
import Link from 'next/link'

export default function Dashboard() {  
    
    return (
        <section className="activity-area load-more">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 offset-col-md-3 dashboard-common">
                        <div>
                            <div>INF Price</div>
                            <div className="stake-bond-info">$0.0000</div>
                        </div>
                        <div >
                            <div>APY</div>
                            <div className="stake-bond-info">0.0000%</div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 offset-col-md-3 dashboard-common">
                        <div>
                            <div>TVL</div>
                            <div className="stake-bond-info">$2066</div>
                        </div>
                        <div >
                            <div>INF Staked</div>
                            <div className="stake-bond-info">90.00%</div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 offset-col-md-3 dashboard-common">
                        <div>
                            <div>Market Cap</div>
                            <div className="stake-bond-info">$60,870,517.9007</div>
                        </div>
                        <div >
                            <div>Circulating Supply</div>
                            <div className="stake-bond-info">37,896.5100 INF</div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 offset-col-md-3 dashboard-common">
                        <div>
                            <div>Treasury Balance</div>
                            <div className="stake-bond-info">$192,283,661.3101</div>
                        </div>
                        <div >
                            <div>Runway</div>
                            <div className="stake-bond-info">317.0892 Days</div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-lg-5 offset-col-md-3">
                        <div className="dashboard-wallet">
                            Wallet Balance
                        </div>
                        <div className="mytokens">
                            <div>
                                INF
                                <i className="fa fa-plus"></i>
                            </div>
                            <div>
                                0.000
                            </div>
                        </div>
                        
                    </div>
                </div>


            </div>
        </section>
    );
}
