import React from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import './Home.css'

const Home = () => {
    const trendingData = useSelector(state => state.AOSmoviesData.bannerData);
  return (
    <div>
      <BannerHome/>
      
      <div className='Trendingshow '> 
        <h2 className='T1'>Trending Shows</h2>
        <div className='T2'>
          {
        trendingData.map((data,index)=>{
          return(
            <Card key={data.id} data={data} index={index+1} trending={true}/>
          )})}
        </div>
      </div>
    </div>
  )
}

export default Home
