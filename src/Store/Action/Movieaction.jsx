 export {removemovie} from '../Reducers/MovieSlice'
import { loadmovie } from '../Reducers/MovieSlice';
import axios from '../Axios'

export const asyncloadmovie=(id)=>async(dispatch,getstate)=>{
    try{
        const detail= await axios.get(`/movie/${id}`)
        const cast= await axios.get(`/movie/${id}/credits`)
        const externalid= await axios.get(`/movie/${id}/external_ids`)
        const similar=  await axios.get(`/movie/${id}/similar`)
        const videos=  await axios.get(`/movie/${id}/videos`)
        const watchprovider=  await axios.get(`/movie/${id}/watch/providers`)
        const recommendations=  await axios.get(`/movie/${id}/recommendations`)
          let alldetails={
            detail :detail.data,
            externalid:externalid.data,
            recommendations:recommendations.data.results,
            cast:cast.data,
            similar:similar.data.results,
            videos:videos.data.results.find((n)=>n.type==="Trailer"),
            watchprovider:watchprovider.data.results.IN,
               
          };
          dispatch(loadmovie(alldetails));
          // console.log(alldetails);
    }catch(error){
        console.log(error)
    }
 
}