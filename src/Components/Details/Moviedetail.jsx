import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie, removemovie } from '../../Store/Action/Movieaction';
import Loader2 from '../Loader2';
import HorizontalCard from '../Templates/HorizontalCard'
import trailer from '../Templates/Trailer'
function Moviedetail() {
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
const {pathname}=useLocation();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  if (!info || !info.detail) {
    return <Loader2 />;
  }
// console.log(info);
  const imageUrl = `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`;
// console.log(pathname);
  return (
    <div
  style={{
    background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    boxSizing: 'border-box', // Ensures padding is included in height
  }}
  className=' relative  w-screen h-[150vh] px-[10%]'
>
  <nav className='w-full h-[10vh] py-5 text-zinc-200 flex gap-10 text-2xl items-center'>
    <Link>
      <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
    </Link>
    <a className='hover:text-[#6556CD]' target='_blank' rel="noreferrer" href={info.detail.homepage}>
      <i className="ri-external-link-fill"></i>
    </a>
    <a className='hover:text-[#6556CD]' target='_blank' rel="noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
      <i className="ri-earth-fill"></i>
    </a>
    <a className='hover:text-[#6556CD]' target='_blank' rel="noreferrer" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>IMDB
    </a>
  </nav>

  <div className='w-full flex'>
    <div>
      <img
        className='h-[50vh] mt-6 w-[30vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.9)] object-cover'
        src={`https://image.tmdb.org/t/p/original/${ info.detail.poster_path}`}
        alt={info.title || info.name}
      />
    </div>
    {/* for movie details */}
    <div className='mt-6 ml-11'>
      <h1 className='text-5xl font-bold text-white hover:text-[#6556CD] '>{info.detail.title || info.detail.name || info.detail.original_name || info.detail.original_title}
        <small className='text-2xl font-bold '>({info.detail.release_date.split("-")[0]})</small>
      </h1>
      <div className='flex items-center mt-4'>
        <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex items-center justify-center">
          {(info.detail.vote_average * 10).toFixed()}<sup>%</sup>
        </span>
        <h1 className='ml-2 text-xl font-bold text-white  '>User Rating</h1>
        <h1 className='ml-2 text-xl font-bold text-white  '>{info.detail.release_date}</h1>
        <h1 className='ml-2 text-xl font-bold text-white  '>{info.detail.genres.map((g) => g.name).join(",")}</h1>
        <h1 className='ml-2 text-xl font-bold text-white  '>{info.detail.runtime}min</h1>
      </div>
      <h1 className='ml-2 text-xl font-bold italic text-white  '>{info.detail.tagline}</h1>
      <h1 className='ml-2 text-xl font-bold text-white  '>Overview</h1>
      <p className='ml-2 text-l w-[96vh] h-auto text-white  '>{info.detail.overview}</p>
     
        <Link className='w-[ %] h-16 mt-4 rounded-md text-white text-xl bg-purple-500 py-2 px-4 inline-flex items-center justify-center' to={`${pathname}/trailer`}>
          <i className="ri-play-large-fill mr-2"></i> Play Trailer
        </Link>
      
    </div>
  </div>
{/* part3 recommendations */}

<div className='mt-8'>
<h1 className='hover:text-[#6556CD]  text-white mb-7 text-2xl '>Recommendations</h1>
  <HorizontalCard data=
{info.recommendations.length>0?info.recommendations:info.similar}
/>
</div>
<Outlet/>
</div>
  )
}

export default Moviedetail;
