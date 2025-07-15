import React from 'react'
import { useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import './Card.css'
import moment from 'moment'
import { Link } from 'react-router-dom';
const Card = ({data,trending,index,media_type}) => {
      const imageURL = useSelector(state => state.AOSmoviesData.imageURL);

      const mediaType = data.media_type ?? media_type

  return (
    <Link to={"/"+mediaType+"/"+data.id} className='Slide '>
      <img
      src={imageURL+data?.poster_path}
      />
      <div className='trend'>
        {
        trending &&(
          <div className='trend_ordre'> 
            # {index} Trending
          </div>
        )
      }
        </div>
        <div className='movie_info'>
          <h2 className='movie_name '>{data?.title || data?.name}</h2>
          <div className='date_and_rate text-neutral-400'>
            <p>{moment(data?.release_date).format("MMM Do YYYY")}</p>
            <span></span>
            <div className='A'>
              <p>{Number(data.vote_average).toFixed(1)}</p>
              <div><FaStar /></div>
            </div>
            
          </div>
        </div>
    </Link>
  )
}

export default Card
