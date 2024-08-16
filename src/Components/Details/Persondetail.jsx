import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadperson, removeperson } from '../../Store/Action/Personaction';
import Loader2 from '../Loader2';
import HorizontalCard from '../Templates/HorizontalCard'

function Persondetail() {

  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
   
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  
  // console.log(info);

  
  if (!info || !info.detail) {
    return <Loader2 />;
  }

  
  // const imageUrl = `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`;

  return (
    <div className='w-full h-[160vh]'>
      <div className='ml-40'>
       <nav className='w-full h-[10vh] py-5  text-zinc-200 flex gap-10 text-2xl items-center'>
       <Link>
      <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
    </Link>
       </nav>
      
    <div className='flex'>
      <img 
        className='h-[50vh] mt-6 w-[35vh]  shadow-[8px_17px_38px_2px_rgba(0,0,0,.9)] object-cover'
        src={`https://image.tmdb.org/t/p/original/${ info.detail.profile_path}`}
        alt={info.title || info.name}
      />
      <div className='ml-10 '>
      <h1 className='hover:text-[#6556CD]  mt-6 font-bold text-zinc-400 text-4xl'>{info.detail.name}</h1>
      <p className='w-[130vh] text-white'>
  {info.detail.biography.split(' ').length > 200 
    ? info.detail.biography.split(' ').slice(0, 200).join(' ') + '...'
    : info.detail.biography}
</p>
      </div>

    </div>
 
   
    {/* part for social  */}
    
    <hr className='mt-5 mb-1 w-[35vh]  border-none h-[2px] bg-zinc-500'/>
<div className=' flex gap-7'>
<a className='hover:text-[#6556CD]  text-3xl ' target='_blank' rel="noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
<i className="ri-earth-fill"></i>
    </a>
    <a className='hover:text-[#6556CD] text-3xl ' target='_blank' rel="noreferrer" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
<i class="ri-facebook-circle-fill"></i>
    </a>
    <a className='hover:text-[#6556CD] text-3xl ' target='_blank' rel="noreferrer" href={`https://www.instagram.com/${info.externalid.facebook_id}`}>
<i className="ri-instagram-fill"></i>
    </a>
    <a className='hover:text-[#6556CD] text-3xl ' target='_blank' rel="noreferrer" href={`https://www.x.com/${info.externalid.twitter_id}`}>
    <i className="ri-twitter-x-fill"></i>
    </a>
</div>
{/* person info */}
<div className='flex'>
  <div>
<h1 className='text-3xl text-zinc-400 font-bold'>Person Info</h1>
<h3 className='text-xl text-zinc-400 mt-2 mb-0 font-bold'>Known For</h3>
<h3 className=' text-white'>{info.detail.known_for_department}</h3>
<h3 className='text-xl text-zinc-400 mt-2 mb-0 font-bold'>Birthday</h3>
<h3 className=' text-white'>{info.detail.birthday}</h3>
<h3 className='text-xl text-zinc-400 mt-2 mb-0 font-bold'>Gender</h3>
<h3 className=' text-white' >{info.detail.gender === 1 ? 'Female' : info.detail.gender === 2 ? 'Male' : 'Unknown'}</h3>
<h3 className='text-xl text-zinc-400 mt-2 mb-0 font-bold'>Deathday</h3>
<h3 className=' text-white' >{info.detail.deathday?info.detail.deathday:"Still Alive"}</h3>
<h3 className='text-xl text-zinc-400 mt-2 mb-0 font-bold'>Place of Birth</h3>
<h3 className=' text-white'>{info.detail.place_of_birth}</h3>

</div>

<div className='ml-5 mt-0 w-[150vh]' >
<h1 className='font-bold text-xl ml-2' >Known For
</h1>
<HorizontalCard  data={info.CombineCredits.cast}/></div>
</div>


    </div>
    </div>
  );
}

export default Persondetail;

