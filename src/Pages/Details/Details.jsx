import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from "../../Hooks/useFetch";

import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recomendations';

import "./style.scss";


const Details = () => {
  const {media_type, id}  = useParams();
  const {data, loading} = useFetch(`/${media_type}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(`/${media_type}/${id}/credits`);
  // console.log(data,credits);

  return (
    <div>
      <DetailsBanner 
        video = {data?.results?.[0]}
        crew = {credits?.crew}
      />
      <Cast 
          data={credits?.cast}
          loading={creditsLoading}
      />
      <VideosSection 
          data={data}
          loading={loading}
      />
      <Similar 
        id={id}
        media_type={media_type}
      />
      <Recommendation 
        id={id}
        media_type={media_type}
      />
    </div>
  )
}

export default Details;