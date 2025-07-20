import { asyncThunkCreator } from '@reduxjs/toolkit'
import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import './DetailsPage.css'
import { FaStar , FaEye} from 'react-icons/fa'
import { BiTimeFive } from "react-icons/bi";
const DetailsPage = () => {
  const params=useParams()
  const imageURL = useSelector(state => state.AOSmoviesData.imageURL);
  const {data}=useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data :castData}=useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  console.log("data",data)
  console.log("dstar",castData)

  return (
    <div>
     
     <div className='show_image '>
      <div className='imageA'>
        <img
       src={imageURL+data?.backdrop_path}
       className='image'
      />
      </div>
      <div className='shadow '></div>
     </div>

     <div className='showD '>
        <div className='poster_container  '>
              <img
              src={imageURL+data?.poster_path}
              className='poster '
              />
        </div>
        <div>
          <h2 className='titleN '>{data?.title || data?.name}</h2>
          <p className='tagline'>{data?.tagline}</p>
          <div className='movie-info'>
            <div className='info-item'>
              <span>Rating: {Number(data?.vote_average).toFixed(1)}</span>
              <span className='icon star-icon'><FaStar /></span>
            </div>
            <div className='info-item'>
              <span>Views:     {Number(data?.vote_count).toFixed(0)}</span>
              <span className='icon eye-icon'><FaEye /></span>
            </div>
            <div className='info-item'>
              <span>Duration:   {Number(data?.runtime).toFixed(0)} min</span>
              <span className='icon time-icon'><BiTimeFive /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage
