import React from 'react';
import { Link } from 'react-router-dom';

import noimage from '/noimage.png'

function Cards({ data, title }) {
//  console.log(data);
//  console.log(title);
  return (
    <div className='border-spacing-5 mt-9  flex flex-wrap w-full'>
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type||title}/details/${c.id}`}
          className='w-[30vh] ml-[5%] relative mr-[5%] mb-[5%]'
          key={i}
        >
        
          <img
            className='h-[50vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.9)] object-cover'
            src={
              c.backdrop_path || c.poster_path || c.profile_path?
              `https://image.tmdb.org/t/p/original/${c.backdrop_path || c.poster_path || c.profile_path}`:noimage}
            alt={c.title || c.name}
          />
          <h1 className='text-2xl text-zinc-500 font-semibold'>
            {c.title || c.name || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="absolute right-[0%] bottom-[40%] rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;

