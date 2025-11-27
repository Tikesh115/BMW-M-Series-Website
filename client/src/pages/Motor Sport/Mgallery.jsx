import React from 'react'
import img1 from '../../assets/imgg/1.jpg'
import img2 from '../../assets/imgg/2.jpg'
import img3 from '../../assets/imgg/3.jpg'
import img4 from '../../assets/imgg/4.jpg'
import img5 from '../../assets/imgg/5.jpg'
import img6 from '../../assets/imgg/6.jpg'
import img7 from '../../assets/imgg/7.jpg'
import img8 from '../../assets/imgg/8.jpg'
import img9 from '../../assets/imgg/9.jpg'
import img10 from '../../assets/imgg/10.jpg'
import img11 from '../../assets/imgg/11.jpg'
import img12 from '../../assets/imgg/12.jpg'
import img13 from '../../assets/imgg/13.jpg'
import img14 from '../../assets/imgg/14.jpg'
import img15 from '../../assets/imgg/15.jpg'
import img16 from '../../assets/imgg/16.jpg'
import img17 from '../../assets/imgg/17.jpg'
import img18 from '../../assets/imgg/18.jpg'
import img19 from '../../assets/imgg/19.jpg'
import img20 from '../../assets/imgg/20.jpg'
import img21 from '../../assets/imgg/21.jpg'
import img22 from '../../assets/imgg/22.jpg'
import img23 from '../../assets/imgg/23.jpg'
import img24 from '../../assets/imgg/24.jpg'
import './Mgallery.css'

const Mgallery = () => {
  return (
    <div>
        <div className='h-65 pt-20 flex flex-col items-center justify-center gap-9 text-center bg-[#0f0f17]'><h1 className='text-9xl text-light font-extrabold'>WORLD GALLERY</h1></div>
        {/* <!-- Images Start --> */}
        <div className="image-grid">
            <img src={img1} alt="Image 1" className="item1"/>
            <img src={img2} alt="Image 2" className="item2"/>
            <img src={img3} alt="Image 3" className="item3"/>
            <img src={img4} alt="Image 4" className="item4"/>
            <img src={img5} alt="Image 5" className="item5"/>
            <img src={img6} alt="Image 6" className="item6"/>
            <img src={img7} alt="Image 7" className="item7"/>
            <img src={img8} alt="Image 8" className="item8"/>
            <img src={img9} alt="Image 9" className="item9"/>
            <img src={img10} alt="Image 10" className="item10"/>
            <img src={img11} alt="Image 11" className="item11"/>
            <img src={img12} alt="Image 11" className="item12"/>
            <img src={img13} alt="Image 11" className="item13"/>
            <img src={img14} alt="Image 11" className="item14"/>
            <img src={img15} alt="Image 11" className="item15"/>
            <img src={img16} alt="Image 11" className="item16"/>
            <img src={img17} alt="Image 11" className="item17"/>
            <img src={img18} alt="Image 11" className="item18"/>
            <img src={img19} alt="Image 11" className="item19"/>
            <img src={img20} alt="Image 11" className="item20"/>
            <img src={img21} alt="Image 11" className="item21"/>
            <img src={img22} alt="Image 11" className="item22"/>  
            <img src={img23} alt="Image 11" className="item23"/>
            <img src={img24} alt="Image 11" className="item24"/>
        </div>
    </div>
  )
}

export default Mgallery
