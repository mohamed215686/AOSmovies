import React from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import './Home.css'
import HorizontaleScrollCard from '../components/HorizontaleScrollCard'

const Home = () => {
    const trendingData = useSelector(state => state.AOSmoviesData.bannerData);
  return (
    <div>
      <BannerHome/>
      <HorizontaleScrollCard data={trendingData} heading={"Trending Shows"}/>
      
    </div>
  )
}

export default Home
