import React from 'react'
import './VideoPlay.css'
import { IoMdCloseCircle } from "react-icons/io";
import useFetchDetails from '../hooks/useFetchDetails';
const VideoPlay = ({data,close,media_type}) => {
  const { data: videoData } = useFetchDetails(`/${media_type}/${data}/videos`);
  return (
    <section className='VideoPlayer  '>
      <div className='Play '>
        <button onClick={close} className='closebtn '><IoMdCloseCircle /></button>
        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          className='video'/>
      </div>
    </section>
  )
}

export default VideoPlay
