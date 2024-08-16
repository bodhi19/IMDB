import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function SideNav() {


  return (
    <div className='w-[20%] text-2xl h-full border-r-2 border-zinc-400 p-3 flex flex-col justify-between max-h-fit'>
      <h1>
        <i className="text-[#6556CD] ri-tv-fill mr-5"></i>
        <span className='font-bold text-white'>IMDB</span>
      </h1>
      <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New feeds</h1>
        <Link to="/trending" className='hover:bg-[#6556CD] mr-2 hover:text-white duration-300 rounded-lg p-5'>
        <i className="ri-fire-fill"></i>Trending</Link>
        <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
        <i className="ri-magic-fill mr-2"></i>Popular</Link>
        <Link to="/movies" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
        <i className="ri-movie-2-line mr-2"></i>Movies</Link>
        <Link to="/tvshows" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
        <i className="ri-tv-2-fill mr-2"></i>TV Shows</Link>
        <Link to="/People" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
        <i className="ri-team-fill mr-2"></i>People</Link>
      </nav>
      <hr className='h-[1px] border-none bg-zinc-400'></hr>
      <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-10 mb-5'>Website Information</h1>
        <Link to="/about" className='hover:bg-[#6556CD] mr-2 hover:text-white duration-300 rounded-lg p-5'>
        <i className="ri-pencil-fill"></i>About</Link>
        <Link to="/Contact" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
        <i className="ri-contacts-fill mr-2"></i>Contacts</Link>
      
      </nav>
    </div>
  );
}

export default SideNav;

