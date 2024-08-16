import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Dropdown from './Dropdown';
import axios from './Axios';
import Cards from './Cards';
import Loader2 from '../Loader2';
import InfiniteScroll from 'react-infinite-scroll-component';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('now_playing');
  const [duration, setDuration] = useState('day');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const GetMovies = async (page = 1) => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      setMovies((prevState) => [...prevState, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMovies([]); // Clear the Movies data when category or duration changes
    setPage(1); // Reset the page to 1 when category or duration changes
    GetMovies(1);
  }, [category, duration]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    GetMovies(page + 1);
  };

  return movies.length>0?(
    <>
      <div className='w-screen h-screen relative max-h-fit'>
        <div className='container mx-auto mt-3 flex items-center'>
          <h1 className='hover:text-[#6556CD] ml-6 text-white font-semibold text-4xl'>
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>Movies
          </h1>
          <div className='w-[45%] ml-7'>
            <TopNav />
          </div>
          <div className='gap-4 flex'>
            <Dropdown 
              title="Category" 
              options={['movie']} 
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
          dataLength={movies.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Loader2 />}
        >
          <div className='w-full overflow-x-hidden'>
            <Cards data={movies} title="movie" />
          </div>
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loader2 />
  );
}

export default Movies;
