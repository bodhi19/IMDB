
import { Link } from 'react-router-dom';
import React from 'react'
function Header({ data }) {
    const imageUrl = `https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}`;
  
    return (
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          height: '55vh',
          boxSizing: 'border-box' // Ensures padding is included in height
        }}
        className='w-full flex flex-col mt-2 justify-end'
      >
      <h1 className='w-[70%] font-bold ml-5 text-5xl text-white'>
  {data.title || data.name || data.original_name || data.original_title}
</h1>
<p className='w-[70%] mt-3 ml-5 mb-10 text-white'>
  {data.overview.slice(0, 200)} ...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-600'>more</Link>
</p>
<span className='ml-7 mb-2 text-white text-m font-semibold'>
  <i className='text-yellow-400 ri-album-fill mr-2'></i>{data.media_type.toUpperCase()}
</span>

        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='mt-1 w-32 mb-9 ml-7 bg-[#6556CD] p-4 rounded-md text-black'>
        {""} Watch Trailer
        </Link>
      </div>
    );
  }
  
  export default Header;
  