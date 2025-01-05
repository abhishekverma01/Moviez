import React from 'react';
import { useSelector } from 'react-redux';

import "./style.scss";
const Genres = ({ ids }) => {
    const { genre } = useSelector((state) => state.home);
  return (
    <div className='genres'>
        {
            ids?.map((id) => {
                if(!genre[id]?.name)  return "";
                return (
                    <div key={id} className="genre">
                            {genre[id]?.name}
                    </div>
                )
            })
        }
    </div>
  )
}

export default Genres;