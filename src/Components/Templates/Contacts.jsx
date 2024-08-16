import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from './Axios';
import Loader2 from '../Loader2';

function Contact() {
    useEffect(() => {
        document.title = "Contact Us";
    }, []);

    const [wallpaper, setWallpaper] = useState(null);
    const [submitted, setSubmitted] = useState(false);

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

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Form data submitted:', data);
        setSubmitted(true);
    };

    return wallpaper ? (
        <>
            <div className="w-full h-[130vh]">
                <div 
                    className="relative  h-[130vh] bg-cover bg-center" 
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path})` }}
                ><div className=''>
                    <div className="bg-black  bg-opacity-50 p-8 rounded-lg text-white text-center">
                        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                        <p className="text-lg">
                            Have any questions or feedback? Fill out the form below, and we’ll get back to you as soon as possible.
                        </p>
                    </div>
                    </div>

                <div className="p-8 bg-opacity-50">
                    {submitted ? (
                        <div className="text-center text-green-500 text-lg font-semibold">
                            Thank you for your message! We’ll get back to you shortly.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-opacity-50 bg-white p-8 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email', { 
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    {...register('message', { required: 'Message is required' })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                    rows="5"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
            </div>
        </>
    ) : (
        <Loader2 />
    );
}

export default Contact;
