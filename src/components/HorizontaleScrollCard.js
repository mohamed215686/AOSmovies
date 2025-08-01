import React, { useRef } from 'react'
import './HorizontaleScrollCard.css'
import Card from './Card'
import { FaAngleRight,FaStar, FaAngleLeft } from "react-icons/fa6";

const HorizontaleScrollCard = ({data=[],heading,trending,media_type}) => {
    console.log(`HorizontaleScrollCard [${heading}] data length:`, data?.length);
    const containerRef=useRef()
    const handNext=()=>{
        containerRef.current.scrollLeft +=300
    }
    const handPrev=()=>{
        containerRef.current.scrollLeft -=300
    }
  return (
    <div>
      <div className='Trendingshow '> 
        <h2 className='title capitalize'>{heading}</h2>
        
        <div className='slide scrolbar-none'>
            <div ref={containerRef} className='shows scrollbar-none '>
                {
                (data.slice(0, 20)).map((data,index)=>{
                return(
                    <Card key={data.id+"heading"+index} data={data} index={index+1} trending={trending} media_type={media_type}/>
                )})}
            </div>
            <div className='btns lg:flex'>
                <button onClick={handPrev} className='btn'>
                    <FaAngleLeft/>
                </button>
                <button onClick={handNext} className='btn'>
                    <FaAngleRight/>
                </button>
            </div>
        </div>

      </div>
    </div>
  )
}

export default HorizontaleScrollCard
