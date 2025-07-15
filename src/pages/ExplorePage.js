import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import './ExplorePage.css'

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNO, setTotalPageNO] = useState(0)

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      })
      setData((preve) => [...preve, ...response.data.results])
      setTotalPageNO(response.data.total_pages)
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo((preve) => preve + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(()=>{
        setPageNo(1)
        setData([])
        fetchData()
  },[params.explore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="explore-container">
      <div className="explore-inner">
        <h3 className="explore-heading">Popular {params.explore} Show</h3>
        <div className="explore-grid">
          {data.map((exploreData) => (
            <Card data={exploreData} key={exploreData.id + "exploreSEction"} media_type={params.explore} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
