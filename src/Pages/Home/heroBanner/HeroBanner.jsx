import React, { useState, useEffect } from 'react';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from "../../../Components/lazyLoadingimg/Img";
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  const [background,setBackground] = useState("");
  const [query,setQuery] = useState("");
  const {url} = useSelector((state) => state.home);
  // when user hit enter then navigate to the path which provided as a params
  const navigate = useNavigate();

 
  const {data, loading} = useFetch('/movie/upcoming');
  // console.log(data,loading);
  useEffect(()=>{
    const bg = url?.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg);
    console.log(bg);
    // eslint-disable-next-line
  },[data])


  const searchQueryHandler = (event) => {
    // console.log(event);
    if(event.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop_img">
          <Img src={background}/>
      </div>}

      <div className="opacity-layer">

      </div>

      <ContentWrapper>

        <div className="heroBannerContent">
          <span className='title'>Welcome</span>
          <span className='subtitle'>
            Millions of movies, Tv shows and people to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input 
            type="text" 
            placeholder='Search for a movie or tv show....'
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
 
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner;