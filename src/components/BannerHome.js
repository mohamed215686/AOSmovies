import React from 'react'
import { useSelector } from 'react-redux'

const BannerHome = () => {
    const bannerData=useSelector(state=>state.AOSmoviesData.bannerData)
    const imageURL=useSelector(state=>state.AOSmoviesData.imageURL)
    console.log("banner Home",bannerData)
  return (
    <div>
      <div>
        {
            bannerData.map((data,index)=>{
                return(
                    <div>
                        <img
                        src={imageURL+data.backdrop_path}
                        />
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default BannerHome
