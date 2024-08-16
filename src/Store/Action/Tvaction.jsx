export { removeTv } from '../Reducers/TvSlice';
import { loadTv } from '../Reducers/TvSlice';
import axios from '../Axios';

export const asyncloadTv = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const cast = await axios.get(`/tv/${id}/credits`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchprovider = await axios.get(`/tv/${id}/watch/providers`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        
        let alldetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            cast: cast.data,
            similar: similar.data.results,
            videos: videos.data.results.find((n) => n.type === "Trailer"),
            watchprovider: watchprovider.data.results.IN,
        };
        
        dispatch(loadTv(alldetails));
        // console.log(alldetails);
    } catch (error) {
        console.log(error);
    }
};
