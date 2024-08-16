import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ErrorTr from './ErrorTr';

function Trailer() {
  const navigate=useNavigate();
 const {pathname}= useLocation();
 const category=pathname.includes('movie')? "movie":"tv";
  const playvideo = useSelector((state)=>state[category].info.videos);
  
  return   ( 

    <div className='absolute w-screen top-0 left-0 z-[100] bg-[rgba(0,0,0,0.7)] h-screen flex items-center justify-center ' >
    <Link>
      <i onClick={() => navigate(-1)} className=" absolute  hover:text-[#6556CD] text-3xl text-white right-[5%] ri-close-fill"></i>
    </Link>
   
   
     {playvideo?
     <ReactPlayer
     controls
     height={500}
     width={1000}
     url={`https://www.youtube.com/watch?v=${playvideo.key}`}/> :<ErrorTr/>
    } 
      
    
      </div>
  ) 
}

export default Trailer