import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight,FaStar, FaAngleLeft } from "react-icons/fa6";
import './BannerHome.css'; 
import { Link } from 'react-router-dom';

const BannerHome = () => {
    const bannerData = useSelector(state => state.AOSmoviesData.bannerData);
    const imageURL = useSelector(state => state.AOSmoviesData.imageURL);
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage < bannerData.length - 1) {
                handleNext();
            } else {
                setCurrentImage(0);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [currentImage, bannerData,currentImage]);

    return (
        <section className="banner-container">
            <div className="banner-slider">
                {
                bannerData.map((data, index) => (
                    
                    <div 
                        key={index.id+"BannerHome"+index} 
                        className="banner-slide"
                        style={{ transform: `translateX(-${currentImage * 100}%)` }}
                    >
                        <img
                            src={imageURL + data.backdrop_path}
                            className="banner-image"
                            alt={data.title || "Movie"}
                        />
                        
                        <div className="nav-buttons">
                            <button onClick={handlePrevious} className="nav-button">
                                <FaAngleLeft/>
                            </button>
                            <button onClick={handleNext} className="nav-button">
                                <FaAngleRight/>
                            </button>
                        </div>

                        <div className="banner-overlay"></div>

                        <div className="banner-content">
                            <h2 className="banner-title">
                                {data?.title || data?.name || "Untitled Movie"}
                            </h2>
                            
                            <p className="banner-overview">
                                {data.overview}
                            </p>
                            
                            <div className="banner-meta">
                                <div className='banner-meta2'><p>Rating:  {Number(data.vote_average).toFixed(1)} </p>
                                <FaStar />
                                </div>
                                <span>|</span>
                                <p>Views: {Number(data.popularity).toFixed(0)}</p>
                            </div>
                            
                            <Link to={'/'+data?.media_type+"/"+data?.id} className="play-button">
                                Play Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BannerHome;