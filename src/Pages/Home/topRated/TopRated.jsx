import React, { useState } from 'react';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from "../../../Hooks/useFetch";

import Carousel from '../../../Components/carousel/Carousel';

import "../style.scss"
const TopRated = () => {
    const [endPoint,setEndPoint] = useState('movie');

    const {data, loading} = useFetch(`/${endPoint}/top_rated`);

    const onTabChange = (tab) => {
        tab === "Movies" ? setEndPoint("movie") : setEndPoint("tv")  ;
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTabs data={['Movies','TV Shows']}  onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel 
        data={data?.results}
        loading={loading}
        media_type={endPoint}
        />
    </div>
  )
}

export default TopRated;