import React, { useState } from 'react';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from "../../../Hooks/useFetch";

import Carousel from '../../../Components/carousel/Carousel';

import "../style.scss"
const Trending = () => {
    const [endPoint,setEndPoint] = useState('day');

    const {data, loading} = useFetch(`/trending/all/${endPoint}`);

    const onTabChange = (tab) => {
        setEndPoint(tab);
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={['day','week']}  onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel 
        data={data?.results}
        loading={loading}
        />
    </div>
  )
}

export default Trending;