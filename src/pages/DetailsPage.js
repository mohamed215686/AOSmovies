//import { asyncThunkCreator } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import './DetailsPage.css'
import { FaStar , FaEye } from 'react-icons/fa'
import { BiTimeFive } from "react-icons/bi"
import moment from 'moment'
import Divider from '../components/Divider'
import useFetch from '../hooks/useFetch'
import HorizontaleScrollCard  from '../components/HorizontaleScrollCard'
import VideoPlay from '../components/VideoPlay'
const DetailsPage = () => {
  const params = useParams()
  const imageURL = useSelector(state => state.AOSmoviesData.imageURL)
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const {data:similarData}=useFetch(`/${params?.explore}/${params?.id}/similar`)
  const {data:recommendations}=useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const [playvideo,setplayVideo]=useState(false)
  const [playvideoId,setplayVideoId]=useState("")
  const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ")
  
  const handlePlayvideo=(data)=>{
    setplayVideoId(data?.id)
    setplayVideo(true)
  }
  
  
  const formatRevenue = (value) => {
  if (!value) return 'N/A';
  const num = Number(value);
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
  return `$${num.toLocaleString()}`;
};
  return (
    <div>
      <div className='show_image'>
        <div className='imageA'>
          <img
            src={imageURL + data?.backdrop_path}
            className='image'
            alt="Backdrop"
          />
        </div>
      </div>

      <div className="image-separator"></div>

      <div className='showD'>
        <div className='poster_container'>
          <img
            src={imageURL + data?.poster_path}
            className='poster'
            alt="Poster"
          />
          <button onClick={()=>handlePlayvideo(data)} className='PlayBtn'>Play now</button>
        </div>
        <div>
          <h2 className='titleN'>{data?.title || data?.name}</h2>
          <p className='tagline'>{data?.tagline}</p>
          <Divider />
          <div className='movie-info'>
            <div className='info-item'>
              <span className='info'>Rating: {Number(data?.vote_average).toFixed(1)}</span>
              <span className='icon star-icon'><FaStar /></span>
            </div>
            <div className='info-item'>
              <span className='info'>Views: {Number(data?.vote_count).toFixed(0)}</span>
              <span className='icon eye-icon'><FaEye /></span>
            </div>
            <div className='info-item'>
              <span className='info'>Duration: {Number(data?.runtime).toFixed(0)} min</span>
              <span className='icon time-icon'><BiTimeFive /></span>
            </div>
            <Divider />
            <div>
              <h3 className='overview-item'>overview :</h3>
              <p>{data?.overview}</p>
              <Divider />
              <div>
                <p><span className='info'>Status: </span>{data?.status}</p>
                <p><span className='info'>Release Date: </span>{moment(data?.release_date).format("MMMM Do YY")}</p>
                <p><span className="info">Revenue: </span>{formatRevenue(data?.revenue)}</p>
              </div>
              <Divider />
            </div>
            <div>
              <p><span className='info'>Director:</span> {castData?.crew[0]?.name}</p>
              <Divider />
              <p><span className='info'>Writer:</span> {writer ? writer : 'Unknown'}</p>
            </div>
          </div>
          <Divider />
          <h2 className='font-bold text-lg'>Cast:</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
            {castData?.cast?.filter(el => el?.profile_path).map((starCast, index) => (
              <div key={index}>
                <div>
                  <img
                    src={imageURL + starCast.profile_path}
                    className='w-24 h-24 object-cover rounded-full'
                    alt={starCast.name}
                  />
                </div>
                <p className='font-bold text-center text-sm text-neutral-400'>{starCast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <HorizontaleScrollCard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore}/>
        <HorizontaleScrollCard data={recommendations} heading={"recommendation " + params?.explore} media_type={params?.explore}/>
        </div>
        {
          playvideo &&(
            <VideoPlay data={playvideoId} close={()=>setplayVideo(false)} media_type={params?.explore}/>
          )
        }
        
        
    </div>
  )
}

export default DetailsPage
