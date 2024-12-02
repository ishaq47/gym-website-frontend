import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../BaseUrl';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/admin/blogs`);
                
                // Ensure response.data is an array
                if (Array.isArray(response.data)) {
                    setBlogs(response.data); // Assuming the API returns an array of blog posts
                } else {
                    throw new Error('Expected an array of blogs');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []); // Runs only once when the component mounts

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="md:mx-auto md:p-8 bg-transparent min-h-screen">
            <h1 className='text-4xl font-bold mb-10 text-white text-center'>Blogs</h1>
            {blogs.length === 0 ? (
                <p>No blog posts available.</p>
            ) : (
                <ul className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                    {blogs.map((blog) => (
                        <li key={blog.id} className="mb-4 min-w-[280px] p-4 transition-all duration-200 hover:scale-105 bg-[#2523239d] rounded-xl md:shadow-lg text-white">
                             {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="my-2 w-fit h-auto rounded" />}
                            <h3 className="text-xl text-red-400 font-semibold">{blog.title}</h3>
                            <p className="text-gray-300">{blog.description}</p>
                           
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Blog;
