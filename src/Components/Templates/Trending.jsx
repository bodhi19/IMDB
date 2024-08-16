import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Dropdown from './Dropdown';
import axios from '../../Store/Axios';
import Cards from './Cards';
import Loader2 from '../Loader2';
import InfiniteScroll from 'react-infinite-scroll-component';

 function Trending() {
  const [trending, setTrending] = useState([]);
  const [duration, setDuration] = useState('day');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const GetTrending = async (page = 1) => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      setTrending((prevState) => [...prevState, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTrending([]); // Clear the trending data when category or duration changes
    setPage(1); // Reset the page to 1 when category or duration changes
    GetTrending(1);
  }, [category, duration]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    GetTrending(page + 1);
  };

  return trending.length > 0 ? (
    <>
      <div className='w-screen h-screen max-h-fit '>
        <div className='w-full ml-2 mt-3 flex items-center'>
          <h1 className='hover:text-[#6556CD]  text-white font-semibold text-4xl'>
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>Trending
          </h1>
          <div className='w-[45%] '>
            <TopNav />
          </div>
          <div className='gap-4 flex'>
            <Dropdown 
              title="Category" 
              options={['movie', 'tv', 'all']} 
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
          dataLength={trending.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h1>Loading...</h1>}
        >
          <div className='w-full ml-6  overflow-x-hidden'>
            <Cards data={trending} title={category} />
          </div>
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loader2 />
  );
}

export default Trending;