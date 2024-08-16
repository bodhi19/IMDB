import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Dropdown from './Dropdown';
import axios from './Axios';
import Cards from './Cards';
import Loader2 from '../Loader2';
import InfiniteScroll from 'react-infinite-scroll-component';

function TVShows() {
  const [tvShows, setTVShows] = useState([]);
  const [category, setCategory] = useState('airing_today');
  const [duration, setDuration] = useState('day');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const GetTVShows = async (page = 1) => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      setTVShows((prevState) => [...prevState, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTVShows([]); // Clear the TV Shows data when category or duration changes
    setPage(1); // Reset the page to 1 when category or duration changes
    GetTVShows(1);
  }, [category, duration]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    GetTVShows(page + 1);
  };

  return tvShows.length>0?(
    <>
      <div className='w-screen h-screen max-h-fit'>
        <div className='container mx-auto mt-3 flex items-center'>
          <h1 className='hover:text-[#6556CD] ml-6 text-white font-semibold text-4xl'>
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>TV Shows
          </h1>
          <div className='w-[45%] ml-7'>
            <TopNav />
          </div>
          <div className='gap-4 flex'>
            <Dropdown 
              title="Category" 
              options={['airing_today', 'on_the_air', 'popular', 'top_rated']} 
              func={(e) => setCategory(e.target.value)} 
            />
            <Dropdown 
              title="Duration" 
              options={['week', 'day']} 
              func={(e) => setDuration(e.target.value)} 
            />
          </div>
        </div> 
        <InfiniteScroll 
          className='bg-[#1f1e24]'
          dataLength={tvShows.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Loader2 />}
        >
          <div className='w-full overflow-x-hidden'>
            <Cards data={tvShows} title="tvshow" />
          </div>
        </InfiniteScroll>
      </div>
    </>
   ) : (
    <Loader2 />
  );
}

export default TVShows;
