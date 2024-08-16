import React, { useEffect, useState } from 'react';
import axios from './Axios';


import Loader2 from '../Loader2'

function About() {
    // document.title = "About Us";

    const [wallpaper, setWallpaper] = useState(null);

    const GetWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            const randomIndex = Math.floor(Math.random() * data.results.length);
            setWallpaper(data.results[randomIndex]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetWallpaper();
    }, []);

    return wallpaper ? (
        <>
        
            <div className="w-full h-[110vh]">
              

                <div 
                    className="relative flex items-center justify-center h-[110vh] bg-cover bg-center" 
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path})` }}
                >
                    <div className="bg-black bg-opacity-50 p-8 rounded-lg text-white text-center">
                        <h1 className="text-4xl font-bold mb-4">About Our App</h1>
                        <p className="text-lg">
                            This web application is designed to provide users with up-to-date recommendations on trending movies and TV shows. 
                            Utilizing the powerful TMDB API, our platform offers detailed information about various actors and actresses, 
                            including their biographies and social media handles. Developed as a portfolio project, this application 
                            demonstrates expertise in React, API integration, and UI/UX design.
                        </p>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <Loader2 />
    );
}

export default About;

