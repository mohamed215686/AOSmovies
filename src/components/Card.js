import React from 'react'
import { useSelector } from 'react-redux';
import './Card.css'
const Card = ({data,trending,index}) => {
      const imageURL = useSelector(state => state.AOSmoviesData.imageURL);

  return (
    <div className='Slide relative'>
      <img
      src={imageURL+data?.poster_path}
      />
      <div className='trend'>
        {
        trending &&(
          <div className='A '> 
            # {index} Trending
          </div>
        )
      }
        </div>
    </div>
  )
}

export default Card
