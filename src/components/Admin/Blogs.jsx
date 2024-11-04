import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../BaseUrl';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', description: '', imageUrl: '' });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/admin/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const addBlog = async () => {
    try {
      await axios.post(`${baseUrl}/api/admin/blogs`, newBlog);
      setNewBlog({ title: '', description: '', imageUrl: '' });
      alert('Blog added successfully');
      const response = await axios.get(`${baseUrl}/api/admin/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error adding blog', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/admin/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 8 ? words.slice(0, 8).join(' ') + '...' : description;
  };

  return (
    <div className='md:w-full p-4'>
      <h2 className="text-2xl sm:text-4xl font-bold text-center mb-6 text-white">Manage Blogs</h2>

      {/* Add New Blog */}
      <div className="mb-6">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          className="w-full p-2 mb-2 bg-[#030303a8] text-white text-sm sm:text-base"
          value={newBlog.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Blog Description"
          className="w-full p-2 mb-2 bg-[#030303a8] text-white text-sm sm:text-base"
          value={newBlog.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="w-full p-2 mb-2 bg-[#030303a8] text-white text-sm sm:text-base"
          value={newBlog.imageUrl}
          onChange={handleInputChange}
        />
        <button onClick={addBlog} className="w-fit sm:w-auto bg-indigo-600 text-white p-2 rounded">
          Add Blog
        </button>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto md:w-auto rounded-lg shadow-lg p-4 bg-[#030303a8] Width">
        <table className="min-w-full text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-white">Title</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-white">Description</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-white">Image</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="px-4 py-2 whitespace-nowrap text-white">{blog.title}</td>
                <td className="px-4 py-2 whitespace-nowrap text-white">{truncateDescription(blog.description)}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <img src={blog.imageUrl} alt={blog.title} className="w-8 h-8 object-cover sm:w-10 sm:h-10" />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Blogs;
