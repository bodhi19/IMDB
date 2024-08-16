import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Trending from './Components/Templates/Trending';
import Popular from './Components/Templates/Popular';
import Movies from './Components/Templates/Movies';
import People from './Components/Templates/People';
import TVshows from './Components/Templates/TVshows';
import Moviedetail from './Components/Details/Moviedetail';
import Tvdetail from './Components/Details/Tvdetail';
import Persondetail from './Components/Details/Persondetail';
import Trailer from './Components/Templates/Trailer';
import ErrorTr from './Components/Templates/ErrorTr';
import About from './Components/Templates/About'
import Contact from './Components/Templates/Contacts'
function App() {
  return (
    <div className='w-screen flex max-h-fit bg-[#1F1E24]'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/details/:id' element={<Moviedetail />} >
<Route path='/movie/details/:id/trailer' element={<Trailer/>}  />

       </Route>
        <Route path='/tvshows' element={<TVshows />} />
        <Route path='/tvshow/details/:id' element={<Tvdetail />} >
        <Route path='/tvshow/details/:id/trailer' element={<Trailer/>}  />

       </Route>
        <Route path='/tv/details/:id' element={<Tvdetail />} >
        <Route path='/tv/details/:id/trailer' element={<Trailer/>}  />

       </Route> 
        <Route path='/people' element={<People />} />
        <Route path='/people/details/:id' element={<Persondetail />} />
        <Route path='/about' element={<About/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='*' element={<ErrorTr/>}/>
      </Routes>
    </div>
  );
}

export default App;


 
