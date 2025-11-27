import React from 'react'
import Img1 from '../../assets/img/bmw_m4_gt3_evo__bmw_m4_gt4_evo_2024-7680x4320.jpg'
import './Overview.css'
import Img2 from '../../assets/img/M Hybrid V8.jpg'
import Img3 from '../../assets/img/bmw-m4-gt4-evo-8k-2732x2732-169812.jpg'
import Img4 from '../../assets/img/BMW (6) GT3 Evo.jpg'
import Img5 from '../../assets/img/BMW M2 CS Racing Makes North American Debut, 444 HP Upgrade In The Pipeline _ Carscoops.jpg'

import Img6 from '../../assets/img/download (1).jpg'
import Img7 from '../../assets/img/BMW M Hybrid V8.jpg'

const Overview = () => {
  return (
    <div>
        <div className='img1'>
            <img src={Img1} alt="ERROR IMAGE NOT FOUND"/>
            <div className="text-overlay">EVERY <br/>SECOND COUNTS</div>
        </div>
        <div className="intro">
            <div className="svg-flag">
                <div className="blue"></div>
                <div className="dark-blue"></div>
                <div className="red"></div>
            </div>
            <div className="details">
                <h1>BMW M Motorsport</h1>
                <h3>Striving For Success in Motorsport is intrinsic to the DNA of BMW M.</h3>
                <p>The world of motor sports is an exciting one, characterized by pure action, pulsing adrenaline and unconditional passion. The BMW M Motorsport racing programme and numerous outings in worldwide motorsport teams around the new BMW M Hybrid V8, the new BMW M4 GT3, the BMW M4 GT4 and the BMW M2 CS Racing embody the essence of BMW M: maximum dynamics and the highest level of engineering from Munich. Every day, here in the home of BMW M Motorsport, the engineers work on the continuation of that success story.</p>
            </div>
        </div>
        <div className='boss'>
            <div className="subhead2">The BMW M<br/><span className='text-lg text-gray-400'>Motorsport Race Cars</span></div><br/><br/>
            <div className="img2">
                <img src={Img2} alt=""/>
                <div className="text-overlay2">The BMW M Hybrid V8<br/><span className="spefont">DAWN OF NEW ERA</span></div>
            </div>
            <br/><br/><br/><br/>
            <div class="img3">
                <img src={Img3} alt=""/>
                <div className="text-overlay3">The BMW M4 GT4 EVO<br/><span className="spefont">THE PERFECT CUSTOMER RACE CAR</span>
                </div>
            </div>
            <br/><br/><br/><br/>
            <div className="img4">
                <img src={Img4} alt=""/>
                <div className="text-overlay4">The BMW M4 GT3 EVO<br/><span className="spefont">THE GT FLAGSHIP</span></div>
            </div>
            <br/><br/><br/><br/>
            <div className="img5">
                <img src={Img5} alt=""/>
                <div className="text-overlay5">The BMW M2 Racing<br/><span className="spefont">FROM THE ROAD TO THE RACE TRACK</span>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="left">
                <div className="h1">
                    <h1>WE ARE ONE TEAM</h1>
                </div>
                <div class="p">
                    <p><b>BMW M Motorsport: </b>High performance and excellent service. Are you a motorsport
                        enthusiast or already active in motorsport? Then you too can become part of the
                        <b>BMW M Motorsport</b>! With the automobiles from <b>BMW M Motorsport</b>, both
                        beginners and competitive drivers can successfully compete in races all over the world.
                        The teams and drivers additionally benefit from the excellent customer service,
                        which ranges from parts supply to on-site support at the race track.
                    </p>
                </div><br/>
            </div>
            <div className="right">
                <img src={Img6} alt=""/>
                <img src={Img7} alt=""/>
            </div>
        </div>
    </div>
  )
}

export default Overview

