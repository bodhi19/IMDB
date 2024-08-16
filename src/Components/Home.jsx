 import React, { useEffect, useState } from 'react'
import SideNav from './Templates/SideNav'
 import TopNav from './Templates/TopNav';
 import Header from './Templates/Header';
 import axios from '../Store/Axios';
 import HorizontalCard from './Templates/HorizontalCard';

 import Loader2 from './Loader2';
import Dropdown from './Templates/Dropdown';
 function Home() {
  document.title="Homepage"
  const [wallpaper, setWallpaper] = useState(null);  // Initialize with null
const [trending,setTrending]=useState(null);
const[Category,setCategory]=useState('all')
  

const Getwallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomIndex = Math.floor(Math.random() * data.results.length);  // Generate a random index
     
      setWallpaper(data.results[randomIndex]); 

      // console.log(data);
      // console.log(randomIndex);
      // Set the wallpaper to a random item
    } catch (error) {
      console.log(error);
    }
  };
  
  const GetTrending= async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day`);
     
      setTrending(data.results);  // Set the wallpaper to a random item
    } catch (error) {
      console.log(error);
    }}


  useEffect(() => {
    GetTrending();
    !wallpaper&& Getwallpaper();
  
  }, [Category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className='w-[80%] max-h-fit '>
       <div className='mt-2'> <TopNav  /></div>
        <Header data={wallpaper} />

        <div className='ml-3 mb-3 flex justify-between '>
    <h1 className='text-3xl mt-2 font-semibold text-zinc-400'>Trending</h1>
  <div className='mt-2'>  <Dropdown title="Filter" func={(e)=>setCategory(e.target.value)} options={['tv','movie','all']}/></div> 
</div>

      <HorizontalCard data={trending}  />
      </div>
    </>
  ) : (
  <Loader2/>
 )}
 
 export default Home