import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Dropdown from './Dropdown';
import axios from './Axios';
import Cards from './Cards';
import Loader2 from '../Loader2';
import InfiniteScroll from 'react-infinite-scroll-component';

function People() {
  const [people, setPeople] = useState([]);
  const [category, setCategory] = useState('popular');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const GetPeople = async (page = 1) => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      setPeople((prevState) => [...prevState, ...data.results]);
      if (page >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPeople([]); // Clear the People data when category changes
    setPage(1); // Reset the page to 1 when category changes
    setHasMore(true); // Reset hasMore when category changes
    GetPeople(1);
  }, [category]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    GetPeople(nextPage);
  };

  return people.length > 0 ? (
    <>
      <div className='w-screen h-screen max-h-fit'>
        <div className='container mx-auto mt-3 flex items-center'>
          <h1 className='hover:text-[#6556CD] ml-6 text-white font-semibold text-4xl'>
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>People
          </h1>
          <div className='w-[45%] ml-7'>
            <TopNav />
          </div>
          <div className='gap-4 flex'>
            <Dropdown 
              title="Category" 
              options={['popular']} 
              func={(e) => setCategory(e.target.value)} 
            />
          </div>
        </div> 
        <InfiniteScroll 
          className='bg-[#1f1e24]'
          dataLength={people.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <div className='w-full overflow-x-hidden'>
            <Cards data={people} title="People" />
          </div>
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loader2 />
  );
}

export default People;


