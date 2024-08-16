export {removeperson} from '../Reducers/PersonSlice'
import { loadperson } from '../Reducers/PersonSlice';
import axios from '../Axios'

export const asyncloadperson=(id)=>async(dispatch,getstate)=>{
    try{
        const detail= await axios.get(`/person/${id}`)
        const CombineCredits= await axios.get(`/person/${id}/combined_credits`)
        const MovieCredits= await axios.get(`/person/${id}/movie_credits`)
        const externalid= await axios.get(`/person/${id}/external_ids`)
        const tvCredits= await axios.get(`/person/${id}/tv_credits`)
          let alldetails={
            detail :detail.data,
            externalid:externalid.data,
            CombineCredits:CombineCredits.data,
            MovieCredits:MovieCredits.data,
            tvCredits:tvCredits.data,
               
          };
          dispatch(loadperson(alldetails));
          // console.log(alldetails);
    }catch(error){
        console.log(error)
    }
 
}