import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiUsersThreeFill } from "react-icons/pi";
import { Link, Outlet } from 'react-router-dom';
import { baseUrl } from '../../BaseUrl';
import { ImBlog } from 'react-icons/im';
import { GrServices } from 'react-icons/gr';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    members: '0',
    blogs: '0',
    services: '0',
  });

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Fetch dashboard summary data (subscribers, blogs, services)
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/admin/dashboard-summary`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDashboardData(response.data);
        console.log(response.data.members)
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-transparent text-white">
      {/* Sidebar */}
      <div className={`text-white max-w-[250px] shadow-md p-6 bg-[#030303cc] 
          ${sidebarOpen ? 'fixed left-0 top-0 h-full z-20' : 'hidden'} md:block transition-transform duration-300`}>
        <h2 className="text-2xl font-bold text-start mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/admin/members" className="text-white hover:text-indigo-600">Members</Link>
            </li>
            <li className="mb-4">
            <Link to="/admin/blogs" className="text-white hover:text-indigo-600">Blogs</Link>
            </li>
            <li className="mb-4">
            <Link to="/admin/services" className="text-white hover:text-indigo-600">Services</Link>
            </li>
            <li className="mb-4">
            <Link to="/admin/class" className="text-white hover:text-indigo-600">Classes</Link>
            </li>
          </ul>
        </nav>
        <h2 className='cursor-pointer hover:bg-red-500  flex border w-fit p-2 rounded-lg items-end' onClick={()=>{
          localStorage.removeItem('token');
          window.location.href = '/';
        }}>Logout</h2>
      </div>

      {/* Main Content */}
      <main className="flex-grow md:p-8 p-4">
        {/* Dashboard Overview */}
        <div className="flex justify-between">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">Admin Dashboard</h2>
          {
            sidebarOpen ? (
              <FaLongArrowAltLeft className="md:hidden text-3xl text-[#5de964]" onClick={() => setSidebarOpen(false)} />
            ) : (
              <FaLongArrowAltRight className="md:hidden text-3xl text-[red] animate-pulse" onClick={() => setSidebarOpen(true)} />
            )
          }
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#030303e0] w-full p-6 rounded-lg shadow-md text-center flex flex-col items-center text-white">
            <PiUsersThreeFill className="text-4xl" />
            <p className="text-white text-2xl">Members</p>
            <h3 className="text-2xl font-bold text-white">{dashboardData.members}</h3>
          </div>
          <div className="bg-[#030303e0] w-full p-6 rounded-lg shadow-md text-center flex flex-col items-center text-white">
            <ImBlog className="text-4xl" />
            <p className="text-white text-2xl">Blogs</p>
            <h3 className="text-2xl font-bold text-white">{dashboardData.blogs}</h3>
          </div>
          <div className="bg-[#030303e0] w-full p-6 rounded-lg shadow-md text-center flex flex-col items-center text-white">
            <GrServices className="text-4xl" />
            <p className="text-white text-2xl">Services</p>
            <h3 className="text-2xl font-bold text-white">{dashboardData.services}</h3>
          </div>
        </div>
        {/* Render other routes/components */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
