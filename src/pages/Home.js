/*import React, { useEffect, useState } from 'react'*/
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
/*import Card from '../components/Card'*/
import './Home.css'
import HorizontaleScrollCard from '../components/HorizontaleScrollCard'
/*import axios from 'axios'*/
import useFetch from '../hooks/useFetch'

const Home = () => {
    const trendingData = useSelector(state => state.AOSmoviesData.bannerData);
    
    const {data : nowPlayingData} = useFetch("/movie/now_playing")
    const {data : topRatedData} = useFetch("/movie/top_rated")
    const {data : popularTvShowsData} = useFetch("/tv/popular")
    const {data : onTheAirShowData} = useFetch("/tv/on_the_air")

  return (
    <div>
      <BannerHome/>
      <HorizontaleScrollCard data={trendingData} heading={"Trending Shows"} trending={true}/>
      <HorizontaleScrollCard data={nowPlayingData} heading={"Now playing"}/>
      <HorizontaleScrollCard data={topRatedData} heading={"Top Rated Movies"}/>
      <HorizontaleScrollCard data={popularTvShowsData} heading={"Popular TV Shows"}/>
      <HorizontaleScrollCard data={onTheAirShowData} heading={"On The Air"}/>
    </div>
  )
}

export default Home
