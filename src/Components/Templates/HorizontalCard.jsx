import React from 'react';
import { Link } from 'react-router-dom';
import noimage from '/noimage.png'
function HorizontalCard({ data }) {
  // console.log(data);
  return (
    <div className='w-full h-[57vh] overflow-hidden overflow-x-auto'>
      <div className='ml-2 w-[100%] h-[50vh] flex'>
        {data.length>0 ? data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}      //`/${c.media_type}/details/${c.id}`
            key={i}
            className='min-w-[15%] bg-zinc-700 h-full mr-5 flex flex-col'
          >
            <img
              src={ 
                d.backdrop_path || d.poster_path?
                `https://image.tmdb.org/t/p/w500/${d.poster_path||d.backdrop_path}`:noimage}
              alt='movie'
              className='w-full object-cover shadow-white h-[25vh]'
            />
            <div className='ml-3 flex-grow flex flex-col'>
              <h1 className='text-xl font-semibold text-white'>{d.title || d.name}</h1>
              <p className='mt-2 text-white text-sm overflow-hidden'>
                {d.overview.slice(0, 40)} ...<span className='text-zinc-900'>more</span>
              </p>
            </div>
          </Link>
        )):<h1 className='text-3xl mt-5 text-purple-600 font-bold'>Nothing to show</h1>}
      </div>
    </div>
  );
}

export default HorizontalCard;





