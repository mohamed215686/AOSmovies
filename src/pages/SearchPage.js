import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SearchPage.css'
import axios from 'axios'
import Card from '../components/Card'
const SearchPage = () => {
  const location =useLocation()
  const navigate=useNavigate()
  const [data,setData]=useState([])
  const [page,setpage]=useState(1)
  const query=location?.search?.slice(3)
  const fetchData = async () => {
      try {
        const response = await axios.get(`/search/multi`, {
          params: {
            query: location?.search?.slice(3),
            page: page
          },
        })
        setData((preve) => [...preve, ...response.data.results])
        
      } catch (error) {
        console.log("error", error)
      }
    }
  useEffect(()=>{
    if(query){setpage(1)
    setData([])
    fetchData()}
    
  },[location?.search])

  const HandleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setpage((preve) => preve + 1)
    }
  }

  useEffect(() => {
      if(query)
      {fetchData()}
    }, [page])

    useEffect(() => {
        window.addEventListener('scroll', HandleScroll)
      }, [])


  console.log("Location",)
  return (
    <div className='Search-container '>
      <div className='search_form1 '>
        <input 
        type='text'
        placeholder='Search here...' 
        onChange={(e)=>navigate(`/search?q=${e.target.value}`)}
        value={query.split("%20").join(" ")}
        className='search_barr'
        />
      </div>

      <div className='Container'>
        <h3 className="Search-heading ">Search Results</h3>
        <div className="search-grid  lg:justify-start">
          {data.map((searchData,index) => {
            return(
            <Card data={searchData} key={searchData.id + "Search"} media_type={searchData.media_type} />
        )})}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
