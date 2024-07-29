import React from 'react'
// import './SlideShow.css'
import { Slide } from 'react-slideshow-image'
import img1 from '../assets/slide1.jpg'
import img2 from '../assets/slide2.jpg'
import img3 from '../assets/slide3.jpg'
import img4 from '../assets/slide4.jpg'
import 'react-slideshow-image/dist/styles.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const buttonStyleLeft = {
    // fontSize: "3rem",
    border: "5px solid white",
    background: "rgb(219,234,254)",
    color: "rgb(234, 88, 12)",
    borderRadius: "100%",
    padding: "0.8rem",
    left: "-25px"
    
};
const buttonStyleRight = {
    // fontSize: "3rem",
    border: "5px solid white",
    background: "rgb(219,234,254)",
    color: "rgb(234, 88, 12)",
    borderRadius: "100%",
    padding: "0.8rem",
    right: "-25px"
    
};

const proprietes = {
    duration: 2000,
    transitionDuration: 300,
    infinite: true,
    indicators: true,
    arrows: true,
    prevArrow: <button style={{ ...buttonStyleLeft }}><MdOutlineKeyboardArrowLeft className='sm:text-xl  md:text-2xl lg:text-3xl'/></button>,
    nextArrow: <button style={{ ...buttonStyleRight }}><MdOutlineKeyboardArrowRight className='sm:text-xl  md:text-2xl lg:text-3xl'/></button>
}




const Slideshow = () => {
    return (
        <div className="containerSlide w-[95%] px-2 mx-auto rounded-xl my-5">
            <Slide {...proprietes}>
                <div className="each-slide rounded-2xl overflow-hidden">
                    <div>
                        <img src={img1} alt="img1"/>
                    </div>
                </div>
                <div className="each-slide rounded-2xl overflow-hidden">
                    <div>
                        <img src={img2} alt="img2" />
                    </div>
                </div>
                <div className="each-slide rounded-2xl overflow-hidden">
                    <div>
                        <img src={img3} alt="img3" />
                    </div>
                </div>
                <div className="each-slide rounded-2xl overflow-hidden">
                    <div>
                        <img src={img4} alt="img4" />
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Slideshow;