import React, { useEffect, useState } from 'react'
import './Home.css'
import topImage from '../../assets/top.jpg'
import sideImage from '../../assets/images/Background-route-img.jpg'

import carImage from '../../assets/images/-bmw-m5-cs-side-car-removebg-preview.png'
import card1 from '../../assets/images/bmw_m5_cs_84 card (1).jpg'
import card2 from '../../assets/images/bmw_m5_cs_84 card (2).jpg'
import card3 from '../../assets/images/bmw_m5_cs_84 card (3).jpg'
import video1 from '../../assets/images/video.mp4'

import slide1 from '../../assets/images/slide-image (1).jpg'
import slide2 from '../../assets/images/slide-image (2).jpg'
import slide3 from '../../assets/images/slide-image (3).jpg'
import slide4 from '../../assets/images/slide-image (4).jpg'
import slide5 from '../../assets/images/slide-image (5).jpg'

import articleImg1 from '../../assets/images/Article (1).jpg'
import articleImg2 from '../../assets/images/Article (2).jpg'
import articleImg3 from '../../assets/images/Article (3).jpg'

import ScrollReveal from 'scrollreveal'

const Home = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 5;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev)=>(prev+1)%totalSlides);
        }, 5000);
        return () => clearInterval(interval);

        const sr = ScrollReveal({
            origin: "bottom",
            distance: "40px",
            duration: 800,
            delay: 400,
            easing: "ease-in-out"
        });

        sr.reveal(".nav img", { delay: 600, origin: "left" });
        sr.reveal(".top .car-name", { origin: "right" });
        sr.reveal(".skew", { origin: "bottom" });
        sr.reveal(".side-view .car", { delay: 600, origin: "right" });
        sr.reveal(".side-view .M5-F90", { delay: 900, origin: "bottom" });
        sr.reveal(".intro .details h1", { origin: "left" });
        sr.reveal(".intro .details h3", { delay: 600, origin: "left" });
        sr.reveal(".intro .details p", { delay: 800, origin: "left" });
        sr.reveal(".perf", { delay: 400 });
        sr.reveal(".performance .box h1", { delay: 500, });
        sr.reveal(".performance .box img", { delay: 500, });
        sr.reveal(".performance .box p", { delay: 700 });
        sr.reveal(".speed h1", { delay: 400 });
        sr.reveal(".speed p", { delay: 600 });
        sr.reveal(".articles .title", { delay: 400 });
        sr.reveal(".articles img", { delay: 500 });
        sr.reveal(".articles h4", { delay: 700, origin: "left" });
        sr.reveal(".articles h2", { delay: 900, origin: "left" });
    }, [])

    return (
        <div>
            <div className='top'>
                <img src={topImage} />
                <h1 className="car-name">The M5 CS</h1>
            </div>
            <div className="side-view">
                <img src={sideImage} className='side-image' />
                <div className="skew"></div>
                <h1 className="M5-F90">M5 F90</h1>
                <img src={carImage} className="car" />
            </div>
            <div className="intro">
                <div className="svg-flag">
                    <div className="blue"></div>
                    <div className="dark-blue"></div>
                    <div className="red"></div>
                </div>
                <div className="details">
                    <h1>The BMW M5 CS F90</h1>
                    <h3>Even sportier, even more luxurious, even more exclusive: The BMW M5 CS is the new top model from BMW M.</h3>
                    <p>Get ready for the most powerful BMW M production model there has ever been: With the BMW M5 CS, BMW M expands its model programme of the BMW M5 sedan for the first time in its history with an exclusive CS model. CS stands for Competition Sport: The BMW M5 CS delivers ground-breaking performance and motor sport genetics right down to the smallest detail. With exclusive suspension, lightweight-construction and design components, only available for this model, it achieves a unique character in terms of performance and premium sports aspirations</p>
                </div>
            </div>
            {/* Elevating-Performance-start  */}
            <div className="performance">
                <div>
                    <div className="box">
                        <div className="img"><img src={card1} /></div>
                        <div className="info">
                            <h1>Unique Performance</h1>
                            <p>Exclusive design highlights like carbon elements and accents in Gold Bronze underline the pre-eminence of the BMW M5 CS both aerodynamically and optically.</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="info1">
                            <h1>LightWeight Technologies</h1>
                            <p>The intelligent material mix with carbon fibre-reinforced plastic (CFRP) along with special lightweight construction measures reduce the weight of the BMW M5 CS – while at the same time increasing its agility and performance. This is particularly visible through the exclusive carbon bonnet with exposed carbon fibre air ducts.</p>
                        </div>
                        <div className="img"><img src={card2} /></div>
                    </div>
                    <div className="box">
                        <div className="img"><img src={card3} /></div>
                        <div className="info">
                            <h1>M Power - Refined </h1>
                            <p>Under the carbon bonnet, everything points to motor racing: With 467 kW (635 hp) and 750 Nm of torque, the M TwinPower Turbo 8-cylinder petrol engine accelerates the vehicle from 0 to 100 km/h in 3.0 seconds. Thanks to two TwinScroll turbochargers, High-Precision Injection and Valvetronic fully variable valve control, the 4.4-litre engine delivers energetic thrust even from low rpms, direct responsiveness and tremendous power.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Elevating-Performance-end */}
            <div className="speed">
                <video autoPlay muted loop playsInline controls><source src={video1} /></video>
                <div></div>
                <h1><span>3.0</span> Sec</h1>
                <p>The time it takes the BMW M5 CS for accelerating from 0 to 100 km/h.</p>
            </div>
            {/* slider-container-start */}
            <div className="slider-container">
                <div className="slide">
                    <img src={slide1} />
                    <div className="info">
                        <h1>BMW M xDrive with Active M Diffrential</h1>
                        <p>The BMW M xDrive with Active M differential guarantees maximum traction and driving dynamics in both everyday driving and on the racetrack. The M specific technology combines the typical agility of a rear-wheel drive with the superior control of a all-wheel drive. The driver can choose between 4WD, 4WD Sport and – in DSC-off mode – 2WD.</p>
                    </div>
                </div>
                <div className="slide fade">
                    <img src={slide2} />
                    <div className="info">
                        <h1>8-SPEED M Steptronic SPORT TRANSMISSION.</h1>
                        <p>The 8-speed M Steptronic sport transmission with Drivelogic features extremely short shift times and numerous gear-change options: from very athletic and dynamic to comfortable and fuel-efficient. The gears can also be shifted manually with the gearshift lever, or via gearshift paddles on the steering wheel.</p>
                    </div>
                </div>
                <div className="slide fade">
                    <img src={slide3} />
                    <div className="info">
                        <h1>M Carbon CERAMIC BRAKES.</h1>
                        <p>With the M Carbon ceramic brakes fitted as standard, the braking power is even more direct. The system is corrosion-free, extremely heatproof, has greatly reduced wear and contributes to the weight reduction. This in turn has a positive effect on agility, dynamics and acceleration. Brake calipers in high-gloss Red with the M logo are a visual indication of the BMW M5 CS’ special technical features.</p>
                    </div>
                </div>
                <div className="slide fade">
                    <img src={slide4} />
                    <div className="info">
                        <h1>M Sport EXHAUST SYSTEM.</h1>
                        <p>The M Sport exhaust system with puristic double stainless steel endpipes delivers a sound which can be adjusted to taste thanks to the integrated exhaust valve mechanism. The SPORT and SPORT+ programmes, which can be selected via the driving dynamics buttons, provide a still more intense acoustic experience.</p>
                    </div>
                </div>
                <div className="slide fade">
                    <img src={slide5} />
                    <div className="info">
                        <h1>BMW M xDrive with Active M Diffrential</h1>
                        <p>The M Servotronic offers the right steering torque for every driving situation by adjusting to suit the current driving speed. In addition, it provides direct, precise steering at any speed. The system is M specifically tuned and has two different settings which can be selected at the push of a button.</p>
                    </div>
                </div>
                <a className="prev" onClick="plusSlides(-1)">&#10094;</a>
                <a className="next" onClick="plusSlides(1)">&#10095;</a>
            </div>
            {/* slider-container-end */}

            <div className="articles">
                <h1 className="title">More Articles</h1>
                <div className="box">
                    <div className="info">
                        <img src={articleImg1} />
                        <div>
                            <h2>BMW M Magazine</h2>
                            <h4>Back To Overview.</h4>
                        </div>
                    </div>
                    <div className="info">
                        <img src={articleImg2} />
                        <div>
                            <h2>Duality Untamed</h2>
                            <h4>Style icon and designer Justin O'Shea in the new BMW M5.</h4>
                        </div>
                    </div>
                    <div className="info">
                        <img src={articleImg3} />
                        <div>
                            <h2>Ultimate Winner's Car.</h2>
                            <h4>The BMW M5 is the main prize at the 2024 M Award.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
