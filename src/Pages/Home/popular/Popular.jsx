import React, { useState } from 'react';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from "../../../Hooks/useFetch";

import Carousel from '../../../Components/carousel/Carousel';

import "../style.scss"
const Popular = () => {
    const [endPoint,setEndPoint] = useState('movie');

    const {data, loading} = useFetch(`/${endPoint}/popular`);

    const onTabChange = (tab) => {
        tab === "Movies" ? setEndPoint("movie") : setEndPoint("tv")  ;
        // console.log(endPoint);
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>What's Popular</span>
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

export default Popular;