import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../Store/Axios';
import noimage from '/noimage.png'
function TopNav() {
const[query,setquery]=useState("");


const [search,setsearch]=useState([]);
const GetSearch=async()=>{
try{
const {data}=await axios.get(`/search/multi?query=${query}`)

setsearch(data.results)

}
catch(error)
{
console.log(error)
}

}



useEffect(()=>{
GetSearch();
},[query])


  return (
    <div className=' h-[10vh]  flex justify-center relative items-center '>
        <i className="  text-zinc-400 text-3xl ri-search-2-fill"></i>
<input
 onChange={(e)=>setquery(e.target.value)}
 value={query}
className="w-[70%] rounded-lg outline-none border-none bg-indigo-800 text-zinc-300 p-5 text-xl mx-10" type='text' placeholder='Search Shows,Movies... '/>

{query.length>0&&(
    <i onClick={()=>setquery("")}   className="  text-zinc-400 text-3xl ri-close-circle-fill"></i>
)}

<div className='overflow-auto mt-2 rounded-md absolute z-20 w-[60%]  max-h-[50vh] bg-zinc-300 top-[90%]'>
{search.map((s ,i)=>(
 <Link 
 to={`/${s.media_type}/details/${s.id}`}
 key={i} className=' hover:text-black hover:bg-slate-400 border-b-2 font-semibold items-center border-zinc-200 text-zinc-700 flex justify-start  p-8 w-[100%]'>
 <img className='rounded shadow-amber-100 w-[10vh] h-[10vh] object-cover mr-5' 
 src={s.backdrop_path||s.profile_path?`http://image.tmdb.org/t/p/original/${s.backdrop_path||s.profile_path}`:noimage}  />
<span>{s.name||s.title||s.original_name||s.original_title }</span>
 </Link> 
)
)}




</div>
    </div>
  )
}

export default TopNav