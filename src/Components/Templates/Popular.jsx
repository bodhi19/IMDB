import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Dropdown from './Dropdown';
import axios from './Axios';
import Cards from './Cards';
import Loader2 from '../Loader2';
import InfiniteScroll from 'react-infinite-scroll-component';

function Popular() {
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState('movie');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [duration, setDuration] = useState('day');
  const GetPopular = async (page = 1) => {
    try {
      const { data } = await axios.get( `${category}/popular?page=${page}`);
      setPopular((prevState) => [...prevState, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPopular([]); // Clear the Popular data when category changes
    setPage(1); // Reset the page to 1 when category changes
    GetPopular(1);
  }, [category]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    GetPopular(page + 1);
  };

  return category.length > 0 ? (
    <>
      <div className='w-screen   h-screen '>
        <div className='w-screen  mt-3  flex items-center'>
          <h1 className='hover:text-[#6556CD] ml-6 text-white font-semibold text-4xl'>
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>Popular
          </h1>
          <div className='w-[55%] ml-7'>
            <TopNav />
          </div>
          <div className='gap-4 flex'>
            <Dropdown 
              title="Category" 
              options={['movie', 'tv']} 
              func={(e) => setCategory(e.target.value)} 
            />
             {/* <Dropdown 
              title="Duration" 
              options={['week', 'day']} 
              func={(e) => setDuration(e.target.value)} 
            /> */}
          </div>
        </div> 
        <InfiniteScroll 
          className='bg-[#1f1e24]'
          dataLength={popular.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Loader2 />}
        >
          <div className='w-full ml-6 overflow-x-hidden'>
            <Cards data={popular} title={category} />
          </div>
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loader2 />
  );
}

export default Popular;

// /